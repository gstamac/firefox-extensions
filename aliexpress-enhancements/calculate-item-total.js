try {
  const quantityElement = document.querySelector('.product-quantity input')
  const shippingElement = document.querySelector('.product-shipping')
  const dynamicShippingElement = document.querySelector('.product-dynamic-shipping')

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

  const getShippingPriceElements = () =>
    [...shippingElement ?
      shippingElement.querySelectorAll('.product-shipping-price span') :
      dynamicShippingElement.querySelectorAll('.dynamic-shipping-line')]
  // dynamicShippingElement.querySelectorAll('.dynamic-shipping-titleLayout span strong')]

  const isShippingFromChina = () => {
    const shippingText = (shippingElement ?
      shippingElement.querySelector('.product-shipping-info') :
      dynamicShippingElement.querySelector('.dynamic-shipping-contentLayout span'))?.innerText

    return isChinaShipping(shippingText)
  }

  const updateTotal = () => {
    try {
      const shippingPriceElements = getShippingPriceElements()
      if (shippingPriceElements.length > 0) {
        const shipping = shippingPriceElements.map(s => parseShipping(s.innerHTML)).filter(s => s !== undefined)[0];
        if (shipping !== undefined) {
          const quantity = quantityElement.value;

          const vatIncluded = document.querySelector('.product-info .product-vat') !== undefined;

          updateTotalElements(quantity, shipping, isShippingFromChina(), vatIncluded);
        } else {
          clearTotalElements();
        }
      } else {
        clearTotalElements();
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateTotalElements = (quantity, shipping, isChina, vatIncluded) => {
    priceElements.forEach(p => {
      updateTotalElement(p.priceElement, 'calc-product-price-total', formatTotal(p.valueElement.innerHTML, quantity, shipping, isChina, vatIncluded));
    })
  }

  const clearTotalElements = () => {
    priceElements.forEach(p => {
      const totalElement = p.priceElement.querySelector('.calc-product-price-total')
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
  if (shippingElement) observer.observe(shippingElement, observeOptions);
  if (dynamicShippingElement) observer.observe(dynamicShippingElement, observeOptions);

  updateTotal();
} catch (e) {
  console.error(e)
}
