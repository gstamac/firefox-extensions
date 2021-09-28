try {
  const quantityElement = document.querySelector('.product-quantity input')
  const shippingElement = document.querySelector('.product-shipping')

  const priceElements = []

  const registerPrice = (priceSelector, valueSelector) => {
    const priceElement = document.querySelector(priceSelector)
    if (priceElement) {
      const valueElement = priceElement.querySelector(valueSelector)
      if (valueElement) {
        priceElements.push({
          priceElement,
          valueElement
        })

        return true
      }
    }

    return false
  }

  registerPrice('.product-price', '.product-price-current .product-price-value')
  registerPrice('.product-info ._1kyL5', '._3Jqm6')
  if (!registerPrice('.uniform-banner-box ._3YD-o', '._3Jqm6')) {
    registerPrice('.uniform-banner-box div', '.uniform-banner-box-price')
  }

  const updateTotal = () => {
    try {
      const shippingPriceElement = shippingElement.querySelector('.product-shipping-price span')
      if (shippingPriceElement) {
        const shipping = parseShipping(shippingPriceElement.innerHTML)

        const quantity = quantityElement.value

        priceElements.forEach(p => {
          const totalElement = getTotalElement(p.priceElement, 'product-price-total')
          totalElement.textContent = formatTotal(p.valueElement.innerHTML, quantity, shipping)
        })
      } else {
        clearTotalElements();
      }
    } catch (e) {
      console.error(e)
    }
  }

  const clearTotalElements = () => {
    priceElements.forEach(p => {
      const totalElement = p.priceElement.querySelector('.product-price-total')
      if (totalElement) {
        totalElement.remove();
      }
    })
  }

  const observer = new MutationObserver(updateTotal)

  priceElements.forEach(p => {
    observer.observe(p.valueElement, observeOptions);
  })
  observer.observe(quantityElement, {
    attributes: true
  });
  observer.observe(shippingElement, observeOptions);

  updateTotal();
} catch (e) {
  console.error(e)
}
