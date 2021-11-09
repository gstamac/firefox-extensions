try {

  const updateTotals = () => {
    document.querySelectorAll('div.product-container div._1OUGS')
      .forEach(itemElement => {
        const shippingElement = itemElement.querySelector('div.shIx4 span.ZCLbI')
        if (shippingElement && shippingElement.innerHTML.includes('Shipping')) {
          const shipping = parseShipping(shippingElement.innerHTML)

          const priceElement = itemElement.querySelector('._12A8D')

          if (priceElement) {
            updateTotalElement(priceElement.parentElement, 'search-product-price-total', formatTotal(priceElement.innerHTML, 1, shipping));
          }
        }
      })
  }

  updateTotals();

  const itemsElement = document.querySelector('div.product-container div.JIIxO')
  if (itemsElement) {
    new MutationObserver(updateTotals).observe(itemsElement, observeOptions);
  }

} catch (e) {
  console.error(e)
}
