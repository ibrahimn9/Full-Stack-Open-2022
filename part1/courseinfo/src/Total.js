import React from "react";

const Total = ({ex}) => {
  var {exercises1, exercises2, exercises3} = ex;
  return (
    <p>
      Number of exercises {exercises1 + exercises2 + exercises3}
    </p>
  );
};

export default Total;
