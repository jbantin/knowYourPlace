import React, { useContext } from "react";
import { LocationContext } from "./context/locationContext";
const weatherUrl =
  "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=de069a928e6b04d0efc907091fbbae01";
const Search = () => {
  const contextData = useContext(LocationContext);
  console.log(contextData);
  const inputHandler = (e) => {
    e.preventDefault();

    fetchWeather(e.target[0].value);
  };
  const fetchWeather = async (city) => {
    const response = await fetch(`${weatherUrl}&q=${city}&units=metric`);
    const data = await response.json();

    contextData.setLocationData(data);
  };
  return (
    <>
      <div className="text-center">
        <form onSubmit={inputHandler} action="">
          <input type="text" placeholder="location" />
        </form>
      </div>
    </>
  );
};

export default Search;
