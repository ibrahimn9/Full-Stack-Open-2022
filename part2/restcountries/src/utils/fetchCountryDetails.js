import axios from "axios";

export const fetchCountryDetails = async (country) => {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${country}`
  );
  return data;
};
