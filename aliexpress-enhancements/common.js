const observeOptions = {
  subtree: true,
  characterData: true,
  childList: true,
  attributes: false
}

const currencyElement = document.querySelector('#switcher-info span.currency')
const currencyLocale = currencyElement && currencyElement.innerHTML.includes('EUR') ? 'de-DE' : 'en-US'

const parseShipping = (shippingText) => shippingText.includes('Free Shipping') ? 0 : toNumber(new RegExp('Shipping:\\D*([\\d\\.,]+)').exec(shippingText)[1])

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

const formatTotalNumber = (price, quantity, shipping, isChina) => {
  const total = toNumber(price) * quantity + shipping
  return `${formatNumber(total)}${isChina ? '|' + formatNumber(total * 1.22 + 2.5) : ''}`
}

const formatTotal = (s, quantity, shipping, isChina) => `${s.replace(/<[^>]+>/g, '').replaceAll(/[\d\.,]+/g, price => formatTotalNumber(price, quantity, shipping, isChina))}`

const updateTotalElement = (parent, className, total) => {
  const totalElement = getTotalElement(parent, className)
  if (totalElement.textContent !== total) {
    totalElement.textContent = total
  }
}

const isChinaShipping = (shippingText) => {
  if (!shippingText) return false

  const text = shippingText.toLowerCase()

  if (text.includes('warehouse')) return false

  return ['china', 'cainiao', 'aliexpress'].some(c => text.includes(c))
}
