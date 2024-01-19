import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";

const ComplexView = ({ countryName }) => {
  const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_SOME_KEY;
  useEffect(() => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      )
      .then((response) => {
        setData(response.data);
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${response.data.capitalInfo.latlng[0]}&lon=${response.data.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`
        );
      })
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      });
  }, []);

  if (data && weatherData) {
    return (
      <>
        <br></br>
        <img className="flag" src={data.flags.svg}></img>
        <img className="coatOfArms" src={data.coatOfArms.svg}></img>
        <div className="countryName">{data.name.common}</div>
        <br></br>
        Capital:<div className="countryCapital">{data.capital}</div>
        <br></br>
        Weather in {data.capital}:
        <div className="temperature">
          Temperature: {weatherData.main.temp} Celcius
        </div>
        <img
          className="weatherIcon"
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        ></img>
      </>
    );
  } else {
    return <>loading...</>;
  }
};
export default ComplexView;
