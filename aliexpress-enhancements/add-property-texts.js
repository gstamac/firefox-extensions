try {
  document.querySelectorAll('li.sku-property-item')
    .forEach(li => {
      const img = li.querySelector('div.sku-property-image img')
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
