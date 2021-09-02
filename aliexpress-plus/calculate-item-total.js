try {
  const productPriceElement = document.querySelector('.product-price')
  const priceElement = productPriceElement.querySelector('.product-price-current .product-price-value')
  const quantityElement = document.querySelector('.product-quantity input')
  const shippingElement = document.querySelector('.product-shipping')

  const discountedElement = document.querySelector('.product-info ._1kyL5')
  const discountedValueElement = discountedElement && discountedElement.querySelector('._3Jqm6')

  const updateTotal = () => {
    try {
      const shippingPriceElement = shippingElement.querySelector('.product-shipping-price span')
      if (shippingPriceElement) {
        console.log(shippingPriceElement.innerHTML)
        const shipping = parseShipping(shippingPriceElement.innerHTML)

        const quantity = quantityElement.value

        updateTotalPrice(shipping, quantity);

        if (discountedValueElement) {
          updateDiscountedPrice(shipping, quantity);
        }
      } else {
        clearTotalElements();
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateTotalPrice = (shipping, quantity) => {
    const totalElement = getTotalElement(productPriceElement, 'product-price-total')

    totalElement.textContent = formatTotal(priceElement.innerHTML, quantity, shipping)
  }

  const updateDiscountedPrice = (shipping, quantity) => {
    const totalElement = getTotalElement(discountedElement, 'product-price-total')

    totalElement.textContent = formatTotal(discountedValueElement.innerHTML, quantity, shipping)
  }

  const clearTotalElements = () => {
    tryRemoveTotalElement(productPriceElement);
    if (discountedElement) {
      tryRemoveTotalElement(discountedElement);
    }
  }

  const tryRemoveTotalElement = (parent) => {
    var totalElement = parent.querySelector('.product-price-total')
    if (totalElement) {
      totalElement.remove();
    }
  }

  const observer = new MutationObserver(updateTotal)

  observer.observe(priceElement, observeOptions);
  observer.observe(quantityElement, { attributes: true });
  observer.observe(shippingElement, observeOptions);
  if (discountedValueElement) {
    observer.observe(discountedValueElement, observeOptions);
  }
} catch (e) {
  console.error(e)
}
