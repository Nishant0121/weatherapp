import React, { useState, useEffect } from "react";
import { ReactComponent as Cloud } from "../img/cloud.svg";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null); // Change to null
  const API_KEY = "930af133f226e01a411ceb8ff83e24b8";

  // Function to fetch weather data based on coordinates
  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch weather data for current location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array to run effect only once

  const search = async () => {
    if (city === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  }

  return (
    <div className=" h-svh">
      <div>
        <input
          type="text"
          className="city border rounded-full p-2 m-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="p-2 m-2 rounded-full " onClick={search}>
          Search
        </button>
      </div>

      {/* Conditionally render weather data */}
      {weatherData && (
        <div className=" sm:block md:block justify-center items-center">
          <div className=" flex justify-center items-center">
            <Cloud className="p-3 m-2" />
            <div className=" block">
              <div className="block border-b-2 border-white">
                <p>Clouds</p>
                <p>{weatherData.clouds.all}</p>
              </div>
              <div className="block border-b-2 border-white">
                <p>
                  Wind<span>Speed</span>
                </p>
                <p>{weatherData.wind.speed}m/s</p>
              </div>
              <div className="block border-b-2 border-white">
                <p>
                  Wind<span>Direction</span>
                </p>
                <p>{weatherData.wind.deg}^</p>
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-3 m-3 p-3">
            <div className=" p-3 border-b-2 border-r-2">
              <p>{weatherData.main.temp}</p>
              <p>Temperature</p>
            </div>
            <div className=" p-3 border-b-2 border-r-2">
              <p>{weatherData.weather[0].main}</p>
              <p>Weather</p>
            </div>
            <div className=" p-3 border-b-2">
              <p>{convertUnixTimestamp(weatherData.sys.sunrise)}</p>
              <p>Sunrise</p>
            </div>
            <div className=" p-3 border-r-2">
              <p>{convertUnixTimestamp(weatherData.sys.sunset)}</p>
              <p>Sunset</p>
            </div>
            <div className=" p-3 border-r-2">
              <p>{weatherData.main.humidity}</p>
              <p>Humidity</p>
            </div>
            <div className=" p-3">
              <p>{weatherData.visibility}</p>
              <p>Visibility</p>
            </div>
          </div>

          <div className=" absolute bottom-0">
            <p>
              the data there id taken at {convertUnixTimestamp(weatherData.dt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
