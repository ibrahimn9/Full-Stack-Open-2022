import React from "react";

const Total = (props) => {
  var nbrTotal = props.ex1 + props.ex2 + props.ex3;
  return (
    <p>
      Number of exercises {nbrTotal}
    </p>
  );
};

export default Total;
