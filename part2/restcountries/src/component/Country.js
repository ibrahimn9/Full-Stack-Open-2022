import React from "react";
import { useState, useEffect } from "react";
import { fetchCityCoding } from "../utils/fetchCityCoding";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [cityCode, setCityCode] = useState({});
  const {name, capital, area, flags, languages} = country;

  useEffect(() => {
    // fetch the value of 'lat' and 'lon' correspondent to the name of the capital 
    fetchCityCoding(country).then((data) => {

      setCityCode(data[0]);
      // fetch the weather data of the capital
      axios  
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityCode.lat}&lon=${cityCode.lon}&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
          setWeatherIcon(weather.weather[0].icon);
          setWindSpeed(weather.wind.speed.toString());
        });
        
    });
  }, []);
  return (
    <div>
      <h2>{name.common}</h2>
        <p>capital {capital}</p>
        <p>area {area}</p>
      <strong>Languages:</strong>
        <ul>
           {Object.keys(languages).map((key, i) => (
             <li key={i}>{languages[key]}</li>
            ))}
        </ul>
      <img src={flags.png} alt={name.common} width="200px" />
      <h2>Weather in {capital}</h2>
      <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
      <p>wind {windSpeed} m/s</p>
    </div>
  );
};

export default Country;
