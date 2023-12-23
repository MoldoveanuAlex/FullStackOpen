import { useState } from "react";

const StatiticsLine = (props) => {
  const text = props.text;
  const value = props.value;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statitics = ({
  good,
  neutral,
  bad,
  nrReviews,
  average,
  percentagePositive,
}) => {
  return (
    <>
      <p>Statitics</p>
      <table>
        <tbody>
          <StatiticsLine text={"good"} value={good}></StatiticsLine>
          <StatiticsLine text={"neutral"} value={neutral}></StatiticsLine>
          <StatiticsLine text={"bad"} value={bad}></StatiticsLine>
          <StatiticsLine text={"all"} value={nrReviews}></StatiticsLine>
          <StatiticsLine text={"average"} value={average}></StatiticsLine>
          <StatiticsLine
            text={"positive"}
            value={percentagePositive + " %"}
          ></StatiticsLine>
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const nrReviews = good + neutral + bad;
  const totalPondered = nrReviews - bad;
  const average = totalPondered / nrReviews;
  const percentagePositive = (good / nrReviews) * 100;

  const handleGoodClick = () => {
    setGood(good + 1);
    setFeedbackGiven(true);
  };
  const handleNeutraClick = () => {
    setNeutral(neutral + 1);
    setFeedbackGiven(true);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setFeedbackGiven(true);
  };

  return (
    <>
      <p>Give feedback</p>
      <div>
        <Button handleClick={handleGoodClick} text={"good"}></Button>
        <Button handleClick={handleNeutraClick} text={"neutral"}></Button>
        <Button handleClick={handleBadClick} text={"bad"}></Button>
      </div>

      {feedbackGiven ? (
        <div>
          <Statitics
            good={good}
            neutral={neutral}
            bad={bad}
            nrReviews={nrReviews}
            average={average}
            percentagePositive={percentagePositive}
          ></Statitics>
        </div>
      ) : (
        <p>No feedback given!</p>
      )}
    </>
  );
}

export default App;
