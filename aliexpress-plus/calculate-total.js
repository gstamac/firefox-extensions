try {
  const productPriceElement = document.querySelector('.product-price')
  const priceElement = document.querySelector('.product-price-current .product-price-value')
  const quantityElement = document.querySelector('.product-quantity input')
  const shippingElement = document.querySelector('.product-shipping')

  const currencyElement = document.querySelector('#switcher-info span.currency')
  const currencyLocale = currencyElement && currencyElement.innerHTML.includes('EUR') ? 'de-DE' : 'en-US'

  const toNumber = (s) => {
    return s ? (new Number(s.toString().replace(/[,\.]/g, '')) / 100) : undefined
  }

  const formatNumber = (n) => {
    return new Intl.NumberFormat(currencyLocale, { minimumFractionDigits: 2 }).format(n)
  }

  const updateTotal = () => {
    try {
      console.log('Updating total')

      const priceMatches = new RegExp('(\\D*)([\\d\\.,]+)( - ([\\d\\.,]+))?').exec(priceElement.innerHTML)
      const currency = priceMatches[1]
      const priceFrom = toNumber(priceMatches[2])
      const priceTo = toNumber(priceMatches[4])

      const quantity = quantityElement.value

      const shippingPriceElement = shippingElement.querySelector('.product-shipping-price')
      if (shippingPriceElement) {
        const shippingMatches = new RegExp('Shipping:\\D*([\\d\\.,]+)').exec(shippingPriceElement.innerHTML)
        const shipping = toNumber(shippingMatches[1])

        updateTotalElement(currency, priceFrom, priceTo, quantity, shipping);
      } else {
        clearTotalElement();
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateTotalElement = (currency, priceFrom, priceTo, quantity, shipping) => {
    console.log(`Total "${currency}" "${priceFrom}" - "${priceTo}" x "${quantity}" + "${shipping}"`)

    var totalElement = productPriceElement.querySelector('.product-price-current .product-price-total')
    if (!totalElement) {
      const divElement = document.createElement('div');
      divElement.className = 'product-price-current';
      totalElement = document.createElement('span');
      totalElement.className = 'product-price-total'
      divElement.appendChild(totalElement);
      productPriceElement.appendChild(divElement);
    }
    const totalFrom = formatNumber(priceFrom * quantity + shipping)
    const totalTo = priceTo ? ` - ${formatNumber(priceTo * quantity + shipping)}` : ''
    totalElement.textContent = `[Total: ${currency} ${totalFrom}${totalTo}]`;
  }

  const clearTotalElement = () => {
    console.log(`Total cannot be calculated`);
    const totalElement = productPriceElement.querySelector('.product-price-current .product-price-total')
    if (totalElement) {
      totalElement.remove();
    }
  }

  new MutationObserver(updateTotal).observe(priceElement, { subtree: true, characterData: true, childList: true, attributes: false });
  new MutationObserver(updateTotal).observe(quantityElement, { attributes: true });
  new MutationObserver((c) => {
    console.log('shipping changed')
    console.log(c)
    updateTotal();
  }).observe(shippingElement, { subtree: true, characterData: true, childList: true, attributes: false });
} catch (e) {
  console.error(e)
}
