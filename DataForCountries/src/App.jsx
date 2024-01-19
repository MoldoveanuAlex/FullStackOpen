import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

function App() {
  const [inputText, setInput] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const countriesThatMatch = data.filter((el) =>
    el.name.common.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <>
      <div>
        Find countries:
        <input type="text" onChange={handleChange}></input>
      </div>
      <div>
        <Display data={countriesThatMatch}></Display>
      </div>
    </>
  );
}

export default App;
