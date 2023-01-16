function modifyResponse(requestDetails, modifier) {
  const filter = browser.webRequest.filterResponseData(requestDetails.requestId);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  const data = [];
  filter.ondata = event => {
    data.push(decoder.decode(event.data, {
      stream: true
    }));
  };

  filter.onstop = event => {
    data.push(decoder.decode());

    const str = data.join("");

    filter.write(encoder.encode(modifier(str)));

    filter.close();
  };
}

function searchInterceptor(requestDetails) {
  modifyResponse(requestDetails, str => modifyShippingOptions(str))

  return {};
}

chrome.webRequest.onBeforeRequest.addListener(
  searchInterceptor, {
    urls: [
      'https://www.aliexpress.com/wholesale*',
      'https://www.aliexpress.com/w/wholesale*',
      'https://www.aliexpress.com/fn/search-pc/index*',
      'https://www.aliexpress.com/glosearch/api/product*'
    ]
  }, [
    'blocking'
  ]
);

function itemInterceptor(requestDetails) {
  modifyResponse(requestDetails, str => str.replace(/"hideShipFrom":true/gi, '"hideShipFrom":false'))

  return {};
}

chrome.webRequest.onBeforeRequest.addListener(
  itemInterceptor, {
    urls: ['https://www.aliexpress.com/item*']
  }, [
    'blocking'
  ]
);

const referrerStore = (() => {
  const data = new Map();
  const MAX_AGE = 10 * 60e3; // 10 minutes
  const cleanup = () => {
    const cutOff = performance.now() - MAX_AGE;
    data.forEach(({
      time
    }, id) => time < cutOff && data.delete(id));
  };

  return {
    set(id, referrer) {
      cleanup();
      data.set(id, {
        referrer,
        time: performance.now()
      });
    },
    pop(id) {
      const {
        referrer
      } = data.get(id) || {};
      data.delete(id);
      return referrer;
    },
  };
})();

function storeReferredShipFromCountry(requestDetails) {
  const referrer = requestDetails.requestHeaders.find(h => h.name === 'Referer')
  if (referrer) {
    console.log(`Referer= ${referrer.value}`)
    referrerStore.set(requestDetails.requestId, referrer.value)
  }

  return {};
}

function updateUrlParameters(url, referrerUrl) {
  var anyUpdated = false;

  [
    'shipFromCountry',
    'SortType',
    'isFreeShip',
    'isFavorite',
    'minPrice',
    'maxPrice'
  ].forEach(p => {
    const referrerParam = referrerUrl.searchParams.get(p)

    if (referrerParam && referrerParam !== url.searchParams.get(p)) {
      url.searchParams.set(p, referrerParam);

      anyUpdated = true;
    }

  })

  return anyUpdated;
}

function redirectWhenDifferentReferredShipFrom(requestDetails) {
  const url = new URL(requestDetails.url)
  const shipFromCountry = url.searchParams.get('shipFromCountry')
  const referrer = referrerStore.pop(requestDetails.requestId)
  if (typeof referrer === 'string') {
    if (updateUrlParameters(url, new URL(referrer))) {
      return {
        redirectUrl: url.href
      }
    }
  }

  filterAndModifyShippingOptions(requestDetails, shipFromCountry)

  return {};
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  storeReferredShipFromCountry, {
    urls: [
      'https://www.aliexpress.com/wholesale*',
      'https://www.aliexpress.com/w/wholesale*'
    ]
  }, [
    'requestHeaders', 'blocking'
  ]);

chrome.webRequest.onHeadersReceived.addListener(
  redirectWhenDifferentReferredShipFrom, {
    urls: [
      'https://www.aliexpress.com/wholesale*',
      'https://www.aliexpress.com/w/wholesale*'
    ]
  }, [
    'blocking'
  ]);
