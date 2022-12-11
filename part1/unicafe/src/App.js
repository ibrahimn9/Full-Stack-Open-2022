import { useState } from "react";

import React from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Button = ({ text, counter, setter }) => {
  const increaseButton = () => setter(counter + 1);
  return <button onClick={increaseButton}>{text}</button>;
}

const Statistics = ({ statistics }) => {
  const { good, neutral, bad } = statistics;
  let all = good + neutral + bad;
  let avg = (good - bad) / all;
  let pos = good * (100 / all);
  let displayedStatistics;
  if (all > 0) {
    displayedStatistics = (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={pos + " %"} />
          </tbody>
        </table>
      </div>
    );
  } else {
    displayedStatistics = (
      <div>
        <h3>No feedback given</h3>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      {displayedStatistics}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give your feedback</h1>

      <Button text="good" counter={good} setter={setGood} />
      <Button text="neutral" counter={neutral} setter={setNeutral} />
      <Button text="bad" counter={bad} setter={setBad} />

      <Statistics statistics={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
