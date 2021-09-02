const observeOptions = { subtree: true, characterData: true, childList: true, attributes: false }

const currencyElement = document.querySelector('#switcher-info span.currency')
const currencyLocale = currencyElement && currencyElement.innerHTML.includes('EUR') ? 'de-DE' : 'en-US'

const parseShipping = (shippingText) => shippingText.includes('Free Shipping') ? 0 : toNumber(new RegExp('Shipping:\\D*([\\d\\.,]+)').exec(shippingText)[1])

const toNumber = (s) => {
  return s ? (new Number(s.toString().replace(/[,\.]/g, '')) / 100) : undefined
}

const formatNumber = (n) => {
  return new Intl.NumberFormat(currencyLocale, { minimumFractionDigits: 2 }).format(n)
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

const formatTotal = (s, quantity, shipping) => `Total: ${s.replaceAll(/[\d\.,]+/g, price => formatNumber(toNumber(price) * quantity + shipping))}`
