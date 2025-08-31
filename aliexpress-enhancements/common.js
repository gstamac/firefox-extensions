const observeOptions = {
  subtree: true,
  characterData: true,
  childList: true,
  attributes: false
}

const currencyElement = document.querySelector('#switcher-info span.currency')
const currencyLocale = currencyElement && currencyElement.innerHTML.includes('EUR') ? 'de-DE' : 'en-US'

const parseShipping = (shippingText) => {
  if (shippingText.toLowerCase().includes('free shipping')) {
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

const calcTotal = (price, quantity, shipping) => {
  return toNumber(price) * quantity + (shipping == null ? 0 : shipping)
}

const formatTotalNumber = (price, quantity, shipping) => {
  const total = calcTotal(price, quantity, shipping)

  return `${formatNumber(total)}${shipping == null ? "+?" : ""}`
}

const formatTotal = (s, quantity, shipping) => {
  const text = s.replace(/<[^>]+>/g, '')

  return `${text.replaceAll(/[\d\.,]+/g, price => formatTotalNumber(price, quantity, shipping))}`
}

const updateTotalElement = (parent, className, total) => {
  const totalElement = getTotalElement(parent, className)
  if (totalElement.textContent !== total.total) {
    totalElement.textContent = total
  }
}
