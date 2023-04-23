import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(true)

  const getCountry = async () => {
    if(name) {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      setCountry(data);
    }
    catch(error) {
      setFound(false)
    }
    }
  };

  useEffect(() => {
    getCountry();
  }, [name]);

  if(!country) {
    return [];
  }

  return {
    country,
    found,
  }
};

export { useField, useCountry };
