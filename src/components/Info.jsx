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
        `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${API_KEY}`
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
      <div className="w-full h-[15vh] p-4">
        {weatherData && locationData.address ? (
          <div>
            <h1 className="font-bold">
              {locationData.name}, {weatherData.name}
              {", "}
              {locationData.address.city}
              {", "}
              {locationData.address.country}
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
