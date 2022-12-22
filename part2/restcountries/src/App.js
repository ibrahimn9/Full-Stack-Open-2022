import React from "react";
import { useState, useEffect } from "react";
import Country from "./component/Country";
import { fetchCountryDetails } from "./utils/fetchCountryDetails";


function App() {
  const [filter, setFilter] = useState([]);
  const [country, setCountry] = useState("");
  const [showCountry, setShowCountry] = useState([]);
  
  
  

  useEffect(() => {
    //filter the fetching results
    fetchCountryDetails(country).then((data) => {
      setFilter(data);
    });

  }, [country]);


  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={handleCountryChange} />
      </div>

      <div>
        {filter.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filter.map((country) => (
            <>
              <p key={country.area}>
                {filter.length !== 1 && country.name.common}
                {filter.length !== 1 && (
                  <button onClick={() => setShowCountry(country)}>show</button>
                )}
              </p>
            </>
          ))
        )}
      </div>
      {filter.length === 1 && <Country country={filter[0]} />}
      {filter.length !== 1 &&  filter.length !== 0 && showCountry.length !== 0 && <Country country={showCountry} />}
    </div>
  );
}

export default App;
