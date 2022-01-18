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

const calcTotalWithVat = (price, quantity, shipping, isChina, vatIncluded) => ({
  total: toNumber(price) * quantity + shipping,
  vat: isChina & !vatIncluded ? total * 0.22 : 0,
  processing: isChina ? 2.9 : 0,
})

const formatTotalNumber = (price, quantity, shipping, isChina, vatIncluded) => {
  const total = calcTotalWithVat(price, quantity, shipping, isChina, vatIncluded)

  return `${formatNumber(total.total)}${isChina ? '|' + formatNumber(total.total + total.vat + total.processing) : ''}`
}

const formatTotalHint = (price, quantity, shipping, isChina, vatIncluded) => {
  console.log(price)
  const total = calcTotalWithVat(price, quantity, shipping, isChina, vatIncluded)

  return `Total: ${formatNumber(total.total)}\nVAT: ${formatNumber(total.vat)}\nProcessing: ${formatNumber(total.processing)}`
}

const formatTotal = (s, quantity, shipping, isChina, vatIncluded) => {
  const text = s.replace(/<[^>]+>/g, '')

  const hint = formatTotalHint(text.match(/[\d\.,]+/), quantity, shipping, isChina, vatIncluded)

  return {
    total: `${text.replaceAll(/[\d\.,]+/g, price => formatTotalNumber(price, quantity, shipping, isChina, vatIncluded))}`,
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

const isChinaShipping = (shippingText) => {
  if (!shippingText) return false

  const text = shippingText.toLowerCase()

  if (text.includes('warehouse')) return false

  return ['china', 'cainiao', 'aliexpress'].some(c => text.includes(c))
}
