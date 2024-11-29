import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "./context/locationContext";
const weatherUrl =
  "http://api.openweathermap.org/data/2.5/weather?lat=53.55&lon=10&appid=de069a928e6b04d0efc907091fbbae01&units=metric";
const API_KEY = "de069a928e6b04d0efc907091fbbae01&units=metric";
const Info = () => {
  const { weatherData, setWeatherData } = useContext(LocationContext);
  const [forecastData, setForecastData] = useState(null);
  const { locationData } = useContext(LocationContext);
  const [forecast, setForecast] = useState(false);
  const buttonClickHandler = () => {
    setForecast(!forecast);
  };

  useEffect(() => {
    const fetchWeather = async (city) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.geometry.lat}&lon=${locationData.geometry.lng}&appid=${API_KEY}`
      );
      const weather = await response.json();
      setWeatherData(weather);
      const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.geometry.lat}&lon=${locationData.geometry.lng}&appid=${API_KEY}`
      );
      const data = await response2.json();
      setForecastData(data);
    };
    fetchWeather();
  }, [locationData]);
  return (
    <>
      <div className="dark:text-white bg-gray-200 dark:bg-slate-600 my-4 mx-3 rounded-lg  text-center  h-[11vh]">
        {weatherData ? (
          <div className="justify-center">
            {forecast ? (
              <div>
                <button onClick={buttonClickHandler}>
                  {forecast ? "->current" : "forecast"}
                </button>
                <div className="flex mx-[5%] overflow-x-auto gap-5 w-[90%] ">
                  {forecastData.list.map((data, i) => (
                    <h1 key={i}>
                      {data.dt_txt.split(" ")[1].split(":")[0]}:00{" "}
                      {data.main.temp}°C
                    </h1>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-evenly">
                <div className="flex flex-col justify-evenly ">
                  <button className="bg-red-200 text-sm underline rounded" onClick={buttonClickHandler}>
                    {forecast ? "->current" : "forecast"}
                  </button>
                  <h1 className="font-bold">{weatherData.name}</h1>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt=""
                />
                <div className="text-right text-sm flex flex-col self-center">
                  <p>weather : {weatherData.weather[0].description}</p>

                  <p>temperature : {weatherData.main.temp}°C </p>
                  <p>feels like : {weatherData.main.feels_like}°C</p>
                  <p>{weatherData.weather[0].description}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </>
  );
};

export default Info;
