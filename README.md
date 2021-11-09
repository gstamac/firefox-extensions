# firefox-extensions

## Useful links
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension
https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/

## Build
web-ext build -s 'aliexpress-enhancements'
web-ext build -s 'aliexpress-search-mods'

## Lint
web-ext lint -s 'aliexpress-enhancements'
web-ext lint -s 'aliexpress-search-mods'

## Sign
web-ext sign -s 'aliexpress-enhancements'
web-ext sign -s 'aliexpress-search-mods'
web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
web-ext sign --api-key=$env:AMO_JWT_ISSUER --api-secret=$env:AMO_JWT_SECRET
