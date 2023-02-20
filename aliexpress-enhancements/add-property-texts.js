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
  const parent = document.querySelector('div.sku-item--skus--MmsF8fD')
  const button = parent.querySelector('button.sku--imageViewMore--sFqXzWN')
  parent.querySelectorAll('div.sku-item--image--mXsHo3h')
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
} catch (e) {
  console.error(e)
}
