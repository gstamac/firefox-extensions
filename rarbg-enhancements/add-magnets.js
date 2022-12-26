try {

  const addMagnets = () => {
    console.log('adding magnets')
    document.querySelectorAll('tr.lista2 td.lista')
      .forEach(itemElement => {
        const linkElement = itemElement.querySelector('a[href^="/torrent/"]')
        if (linkElement) {
          console.log(linkElement.outerHTML)
          // <img src=\'https://dyncdn.me/static/over/cf3cec9a5dc68c265c9521fef6abef508349544b.jpg\' border=0>
          const linkMatches = linkElement.outerHTML.match(/https:\/\/dyncdn\.me\/static\/over\/([^\.]+)\.jpg/);
          if (linkMatches) {
            const magnetCode = linkMatches[1]
            console.log(magnetCode)
            console.log(linkElement.innerHTML)

            const iconElement = document.createElement('img');
            iconElement.src = 'https://dyncdn.me/static/20/img/magnet.gif';
            iconElement.className = 'magnet-icon';
            const magnetElement = document.createElement('a');
            magnetElement.href = `magnet:?xt=urn:btih:${magnetCode}&dn=${encodeURIComponent(linkElement.innerHTML)}`;
            magnetElement.className = 'magnet-link';
            magnetElement.onmouseover = linkElement.onmouseover;
            magnetElement.onmouseout = linkElement.onmouseout;
            magnetElement.appendChild(iconElement);
            itemElement.insertBefore(magnetElement, linkElement);
          } else {
            // href="/torrent/gehfrns"
            // https://rarbgmirror.com/download.php?id=gehfrns&h=d40&f=Siesta.Key.S05E08.WEBRip.x264-ION10-[rarbg.to].torrent
            const linkMatches = linkElement.outerHTML.match(/href="\/torrent\/([^"]+)"/);
            if (linkMatches) {
              const torrentCode = linkMatches[1]
              console.log(torrentCode)
              console.log(linkElement.innerHTML)

              const iconElement = document.createElement('img');
              iconElement.src = 'https://dyncdn.me/static/20/img/16x16/download.png';
              iconElement.className = 'magnet-icon';
              const magnetElement = document.createElement('a');
              magnetElement.href = `/download.php?id=${torrentCode}&h=d40&f=${encodeURIComponent(linkElement.innerHTML)}.torrent`;
              magnetElement.className = 'magnet-link';
              magnetElement.onmouseover = linkElement.onmouseover;
              magnetElement.onmouseout = linkElement.onmouseout;
              magnetElement.appendChild(iconElement);
              itemElement.insertBefore(magnetElement, linkElement);
            }
          }
        }
      })
  }

  addMagnets();

  // const itemsElement = document.querySelector('div.product-container div.JIIxO')
  // if (itemsElement) {
  //   new MutationObserver(updateTotals).observe(itemsElement, observeOptions);
  // }

} catch (e) {
  console.error(e)
}
