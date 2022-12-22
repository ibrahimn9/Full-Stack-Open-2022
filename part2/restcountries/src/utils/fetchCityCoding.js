import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

export const fetchCityCoding = async (country) => {
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&appid=${api_key}`
  );
  return data;
};