try {
  const cartListElement = document.querySelector('.shopping-cart-list')

  const updateProductTotal = (productElement) => {
    const costElement = productElement.querySelector('.cost-main')
    const priceElement = costElement.querySelector('.main-cost-price')
    const shippingElement = productElement.querySelector('.logistics-cost')
    const quantityElement = productElement.querySelector('.product-num input')

    const shipping = parseShipping(shippingElement.innerHTML)

    const quantity = quantityElement.value

    updateTotalElement(costElement, 'cart-product-price-total', formatTotal(priceElement.innerHTML, quantity, shipping));

    const observer = new MutationObserver(() => updateProductTotal(productElement))
    observer.observe(priceElement, observeOptions);
    observer.observe(shippingElement, observeOptions);
    observer.observe(quantityElement, { attributes: true });
  }

  new MutationObserver((mutations) => {
    mutations
      .filter(m => m.type === 'childList' && m.target.className === 'shopping-cart-list')
      .reduce((elements, mutation) => {
        mutation.addedNodes.forEach(n => n.querySelectorAll('.product-container').forEach(p => elements.push(p)))

        return elements
      }, [])
      .forEach(updateProductTotal)
  }).observe(cartListElement, observeOptions);

  cartListElement
    .querySelectorAll('.product-container')
    .forEach(updateProductTotal)

} catch (e) {
  console.error(e)
}
