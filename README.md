# firefox-extensions

## Useful links
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension
https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/

## Build
web-ext build -s aliexpress-enhancements
web-ext build -s aliexpress-search-mods
web-ext build -s rarbg-enhancements

## Lint
web-ext lint -s aliexpress-enhancements
web-ext lint -s aliexpress-search-mods

## Sign
Create `web-ext-config.js` file.

web-ext sign --channel unlisted -s aliexpress-enhancements
web-ext sign --channel unlisted -s aliexpress-search-mods
web-ext sign --channel unlisted -s rarbg-enhancements
