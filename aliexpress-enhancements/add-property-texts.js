setTimeout(() => {
  try {
    document.querySelectorAll('li.sku-property-item')
      .forEach(li => {
        const img = li.querySelector('img')
        if (img) {
          const textElement = document.createElement('div');
          textElement.className = 'calc-property-text';
          textElement.innerText = img.alt;
          li.appendChild(textElement);
        }
      })
  } catch (e) {
    console.error(e)
  }

  try {
    document.querySelectorAll('div[class*="sku-item--skus--"]')
      .forEach(parent => {
        const button = parent.querySelector('button[class*="sku--imageViewMore--"]')
        parent.querySelectorAll('div[class*="sku-item--image--"]')
          .forEach(li => {
            const img = li.querySelector('img')
            if (img) {
              const divElement = document.createElement('div');
              divElement.appendChild(li);
              const textElement = document.createElement('div');
              textElement.className = 'calc-property-text';
              textElement.innerText = img.alt;
              divElement.appendChild(textElement);
              parent.insertBefore(divElement, button);
            }
          })
      })
  } catch (e) {
    console.error(e)
  }
}, 1000)
