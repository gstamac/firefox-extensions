setTimeout(() => {
  try {
    const quantityElement = document.querySelector('.product-quantity input') || document.querySelector('[class*="quantity--picker--"] input')
    const shippingElement = document.querySelector('.product-shipping')
    var dynamicShippingElement = document.querySelector('.dynamic-shipping')
    var actionWrapElement = document.querySelector('[class*="action--wrap--"]')
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

    registerPrice(document, '.product-price', '.product-price-current .product-price-value')
    registerPrice(document, '[class^="price-default--priceWrap--"]', '[class^="price-default--current--"]')
    registerPrice(document, '[class^="price-default--defaultPriceWrap--"]', '[class^="price-default--current--"]')

    const getShippingPriceElements = () =>
      [...shippingElement ?
        shippingElement.querySelectorAll('.product-shipping-price span') :
        dynamicShippingElement ? dynamicShippingElement.querySelectorAll('.dynamic-shipping-line') : []]

    const updateTotal = () => {
      try {
        const shippingPriceElements = getShippingPriceElements()
        if (shippingPriceElements.length > 0) {
          const shipping = shippingPriceElements.map(s => parseShipping(s.innerHTML)).filter(s => s !== undefined)[0];
          if (shipping !== undefined) {
            const quantity = quantityElement.value;

            updateTotalElements(quantity, shipping);
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

    const updateTotalElements = (quantity, shipping) => {
      priceElements.forEach(p => {
        updateTotalElement(p.priceElement, 'calc-product-price-total', formatTotal(p.valueElement.innerHTML, quantity, shipping));
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
        // registerPrice(actionWrapElement, '[class*="price--wrap--"]', '.pdp-comp-price-current')
        updateTotal();
      }).observe(actionWrapElement, observeOptions);
    }

    updateTotal();

  } catch (e) {
    console.error(e)
  }
}, 1000)
