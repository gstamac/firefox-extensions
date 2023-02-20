const observeOptions = {
  subtree: true,
  characterData: true,
  childList: true,
  attributes: false
}

const currencyElement = document.querySelector('#switcher-info span.currency')
const currencyLocale = currencyElement && currencyElement.innerHTML.includes('EUR') ? 'de-DE' : 'en-US'

const parseShipping = (shippingText) => {
  if (shippingText.includes('Free Shipping')) {
    return 0
  }

  const matches = new RegExp('[Ss]hipping\\D*([\\d\\.,]+)').exec(shippingText)
  // const matches = new RegExp('Shipping[^:]*:\\D*([\\d\\.,]+)').exec(shippingText)

  if (matches) {
    return toNumber(matches[1])
  }
}

const toNumber = (s) => {
  return s ? (new Number(s.toString().replace(/[,\.]/g, '')) / 100) : undefined
}

const formatNumber = (n) => {
  return new Intl.NumberFormat(currencyLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n)
}

const getTotalElement = (parent, className) => {
  var totalElement = parent.querySelector(`.${className}`)
  if (!totalElement) {
    totalElement = document.createElement('span');
    totalElement.className = className;
    parent.appendChild(totalElement);
  }

  return totalElement;
}

const calcTotalWithVat = (price, quantity, shipping, vatIncluded) => {
  const total = toNumber(price) * quantity + shipping
  return {
    total,
    vat: !vatIncluded ? total * 0.22 : 0,
    processing: !vatIncluded ? 2.9 : 0,
  }
}

const formatTotalNumber = (price, quantity, shipping, vatIncluded) => {
  const total = calcTotalWithVat(price, quantity, shipping, vatIncluded)

  const totalWithExtra = total.total + total.vat + total.processing

  return `${formatNumber(total.total)}${totalWithExtra > total.total ? '|' + formatNumber(totalWithExtra) : ''}`
}

const formatTotalHint = (price, quantity, shipping, vatIncluded) => {
  const total = calcTotalWithVat(price, quantity, shipping, vatIncluded)

  return `Total: ${formatNumber(total.total)}\nVAT: ${formatNumber(total.vat)}\nProcessing: ${formatNumber(total.processing)}`
}

const formatTotal = (s, quantity, shipping, vatIncluded) => {
  const text = s.replace(/<[^>]+>/g, '')

  const hint = formatTotalHint(text.match(/[\d\.,]+/), quantity, shipping, vatIncluded)

  return {
    total: `${text.replaceAll(/[\d\.,]+/g, price => formatTotalNumber(price, quantity, shipping, vatIncluded))}`,
    hint
  }
}

const updateTotalElement = (parent, className, total) => {
  const totalElement = getTotalElement(parent, className)
  if (totalElement.textContent !== total.total) {
    totalElement.textContent = total.total
    totalElement.title = total.hint
  }
}
