const observeOptions = {
  subtree: true,
  characterData: true,
  childList: true,
  attributes: false
}

const shippingsOverwrites = [{
    countryCode: "CZ",
    countryName: "Czech Republic",
  },
  {
    countryCode: "ES",
    countryName: "Spain",
  },
  {
    countryCode: "FR",
    countryName: "France",
  },
  {
    countryCode: "IT",
    countryName: "Italy",
  },
  {
    countryCode: "PL",
    countryName: "Poland",
  },
  {
    countryCode: "DE",
    countryName: "Germany",
  },
  // {
  //   countryCode: "TR",
  //   countryName: "Turkey",
  // },
  {
    countryCode: "BE",
    countryName: "Belgium",
  },
  {
    countryCode: "UK",
    countryName: "United Kingdom",
  },
  {
    countryCode: "CN",
    countryName: "China"
  }
].map(s => ({
  ...s,
  selected: false
}))

const modifyShippingOptions = (source, shipFromCountry) => source.replace(/"refineShipFromCountries":(\[[^\]]*\])/, (subs, defaultShippings) => {
  const shippings = shippingsOverwrites.map(c => ({
    ...c,
    selected: c.countryCode === shipFromCountry
  }))

  return `"refineShipFromCountries":${JSON.stringify(shippings)}`
})
