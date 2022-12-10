import React from "react";

const Part = ({ part, ex }) => {
  return (
    <div>
      <p>
        {part} {ex}
      </p>
    </div>
  );
};

const Total = ({ ex }) => {
  var { exercises1, exercises2, exercises3 } = ex;
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const Content = ({ part, ex }) => {
  const { part1, part2, part3 } = part;
  const { exercises1, exercises2, exercises3 } = ex;

  return (
    <div>
      <Part part={part1} ex={exercises1} />
      <Part part={part2} ex={exercises2} />
      <Part part={part3} ex={exercises3} />
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part={{ part1, part2, part3 }}
        ex={{ exercises1, exercises2, exercises3 }}
      />
      <Total ex={{ exercises1, exercises2, exercises3 }} />
    </div>
  );
};

export default App;
