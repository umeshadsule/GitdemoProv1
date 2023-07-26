import { countries } from "../data/country";

export function getCountries(country) {
  // Return the country image URL based on the country name
  return countries.get(country);
}

export default getCountries;