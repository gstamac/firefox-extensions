setTimeout(() => {
  try {
    const cartListElement = document.querySelector('.cart-list')

    const updateProductTotal = (productElement) => {
      const costElement = productElement.querySelector('.cart-product-price')
      if (costElement === null) return
      const priceElement = costElement.querySelector('span')
      const shippingElement = productElement.querySelector('.cart-product-ship')
      const quantityElement = productElement.querySelector('.comet-input-number-input')

      const shipping = parseShipping(shippingElement.innerHTML)

      const quantity = quantityElement.value

      updateTotalElement(costElement, 'calc-cart-product-price-total', formatTotal(priceElement.innerHTML, quantity, shipping, true));

      const observer = new MutationObserver(() => updateProductTotal(productElement))
      observer.observe(priceElement, observeOptions);
      observer.observe(shippingElement, observeOptions);
      observer.observe(quantityElement, { attributes: true });
    }

    new MutationObserver((mutations) => {
      mutations
        .filter(m => m.type === 'childList' && m.target.className.includes('infinite-scroll-component'))
        .reduce((elements, mutation) => {
          mutation.addedNodes.forEach(n => n.querySelectorAll('.cart-product').forEach(p => elements.push(p)))

          return elements
        }, [])
        .forEach(updateProductTotal)
    }).observe(cartListElement, observeOptions);

    cartListElement
      .querySelectorAll('.cart-product')
      .forEach(updateProductTotal)

  } catch (e) {
    console.error(e)
  }
}, 1000)
