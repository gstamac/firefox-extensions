// try {
//   const referredShipFromCountry = new URL(document.referrer).searchParams.get('shipFromCountry')

//   const observer = new MutationObserver(() => {
//     try {
//       const shipFromCountry = new URL(document.URL).searchParams.get('shipFromCountry')

//       const configScript = Array.from(
//         document.querySelectorAll('script[type="text/javascript"]')
//       ).find((n) => n.innerHTML.includes("window.runParams = {};"));

//       if (configScript) {
//         observer.disconnect();
//         configScript.innerHTML = modifyShippingOptions(configScript.innerHTML, shipFromCountry || referredShipFromCountry)
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   });
//   observer.observe(document, observeOptions);

// } catch (e) {
//   console.error(e);
// }

// {
//   "matches": ["https://www.aliexpress.com/glosearch/api/product*"],
//   "js": ["common.js", "add-shipping-options-json.js"],
//   "run_at": "document_start"
// },
