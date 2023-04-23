import React from "react";

const Country = ({ country: { country, found } }) => {
   
  if (!country) {
    return null;
  }

  if (found === false || ! country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country[0].name.common} </h3>
      <div>capital: {country[0].capital[0]} </div>
      <div>population: {country[0].population}</div>
      <br />
      <img
        src={country[0].flags.png}
        height="100"
        alt={`flag of ${country[0].name.common}`}
      />
    </div>
  );
};

export default Country;
