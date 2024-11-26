import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./context/locationContext";
const weatherUrl =
  "http://api.openweathermap.org/data/2.5/weather?lat=53.55&lon=10&appid=de069a928e6b04d0efc907091fbbae01&units=metric";
const API_KEY = "de069a928e6b04d0efc907091fbbae01&units=metric";
const Info = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { locationData } = useContext(LocationContext);

  useEffect(() => {
    const fetchWeather = async (city) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.geometry.lat}&lon=${locationData.geometry.lng}&appid=${API_KEY}`
      );
      const weather = await response.json();
      console.log(weather);
      console.log(locationData);
      setWeatherData(weather);
    };
    fetchWeather();
  }, [locationData]);
  return (
    <>
      <div className="dark:text-white  bg-gray-200 dark:bg-slate-600 my-4 mx-3 rounded-lg  text-center  h-[30vh]">
        <h1>oioioi</h1>
        {weatherData  ? (
          <div>
            <h1 className="font-bold">
               {weatherData.name}
            </h1>

            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt=""
            />
            <p>weather : {weatherData.weather[0].description}</p>

            <p>temperature : {weatherData.main.temp}°C </p>
            <p>feels like : {weatherData.main.feels_like}°C</p>
            <p>{weatherData.weather[0].description}</p>
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </>
  );
};

export default Info;
