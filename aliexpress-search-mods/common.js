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
// {
//   countryCode: "UK",
//   countryName: "United Kingdom",
// },
{
  countryCode: "CN",
  countryName: "China"
}
].map(s => ({
  ...s,
  selected: false
}))

const modifyShippingOptions = (source) => {
  const shipFromCountryMatch = source.match(/"shipFromCountry":"([^"]+)"/)
  const shipFromCountry = shipFromCountryMatch ? shipFromCountryMatch[1] : ""

  return source.replace(/("search_refine_logistics","content":|"Ship From","content":|"refineShipFromCountries":)(\[[^\]]*\])/, (_subs, prefix, _defaultShippings) => {
    const shippings = shippingsOverwrites.map(c => ({
      ...c,
      selected: c.countryCode === shipFromCountry
    }))

    return `${prefix}${JSON.stringify(shippings)}`
  })
}
