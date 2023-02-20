try {
  const quantityElement = document.querySelector('.product-quantity input') || document.querySelector('.quantity--picker--Zeoj1SK input')
  const shippingElement = document.querySelector('.product-shipping')
  const dynamicShippingElement = document.querySelector('.dynamic-shipping')
  const actionWrapElement = document.querySelector('.action--wrap--gC0zTOC')
  const priceElements = []

  const registerPrice = (parent, priceSelector, valueSelector) => {
    const priceElement = parent.querySelector(priceSelector)
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

  registerPrice(document, '.price--wrap--tA4MDk4', '.pdp-comp-price-current')
  registerPrice(document, '.product-price', '.product-price-current .product-price-value')
  registerPrice(document, '.product-info ._1kyL5', '._3Jqm6')
  if (!registerPrice(document, '.uniform-banner-box ._3YD-o', '._3Jqm6')) {
    registerPrice(document, '.uniform-banner-box div', '.uniform-banner-box-price')
  }

  const getShippingPriceElements = () =>
    [...shippingElement ?
      shippingElement.querySelectorAll('.product-shipping-price span') :
      dynamicShippingElement.querySelectorAll('.dynamic-shipping-line')]

  const updateTotal = () => {
    try {
      const shippingPriceElements = getShippingPriceElements()
      if (shippingPriceElements.length > 0) {
        const shipping = shippingPriceElements.map(s => parseShipping(s.innerHTML)).filter(s => s !== undefined)[0];
        if (shipping !== undefined) {
          const quantity = quantityElement.value;

          const vatIncluded = document.querySelector('.price--vat--p2QOSMW') !== undefined;

          updateTotalElements(quantity, shipping, vatIncluded);
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

  const updateTotalElements = (quantity, shipping, vatIncluded) => {
    priceElements.forEach(p => {
      updateTotalElement(p.priceElement, 'calc-product-price-total', formatTotal(p.valueElement.innerHTML, quantity, shipping, vatIncluded));
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
  if (quantityElement) {
    observer.observe(quantityElement, {
      attributes: true
    });
  }
  if (shippingElement) observer.observe(shippingElement, observeOptions);
  if (dynamicShippingElement) observer.observe(dynamicShippingElement, observeOptions);
  if (actionWrapElement) {
    new MutationObserver(() => {
      registerPrice(actionWrapElement, '.price--wrap--tA4MDk4', '.pdp-comp-price-current')
      updateTotal();
    }).observe(actionWrapElement, observeOptions);
  }

  updateTotal();
} catch (e) {
  console.error(e)
}
