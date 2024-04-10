import React, { useState, useEffect } from "react";
import { ReactComponent as Cloud } from "../img/cloud.svg";

import { FaCloud } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import { FaTemperatureLow } from "react-icons/fa6";
import { BsCloudHazeFill } from "react-icons/bs";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";

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
    <div>
      <div className="">
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
        <div className=" flex justify-center items-center h-dvh w-100">
          {weatherData && (
            <div className=" sm:block md:block justify-center items-center wi-80">
              <div className="flex justify-around items-center w-100">
                <Cloud className="p-3 m-2" />
                <div className=" block">
                  <div className="block p-3 m-2 border-b-2 border-white">
                    <div className=" flex justify-center items-center">
                      <FaCloud size={40} />
                    </div>
                    <p className=" font-bold text-xl">
                      {weatherData.clouds.all}
                    </p>
                  </div>
                  <div className="block p-3 m-2 border-b-2 border-white">
                    <div className=" flex justify-center items-center">
                      <FaWind size={50} />
                    </div>
                    <p>{weatherData.wind.speed}m/s</p>
                  </div>
                  <div className="block p-3 m-2 border-b-2 border-white">
                    <div className=" flex justify-center items-center">
                      <GiWindsock size={50} />
                    </div>
                    <p>{weatherData.wind.deg}^</p>
                  </div>
                </div>
              </div>

              <div className=" grid grid-cols-3 px-2 mt-3">
                <div className=" p-3 border-b-2 border-r-2">
                  <div className=" flex justify-center items-center">
                    <FaTemperatureLow />
                  </div>
                  <p>{weatherData.main.temp}</p>
                </div>
                <div className=" p-3 border-b-2 border-r-2">
                  <div className=" flex justify-center items-center">
                    <BsCloudHazeFill size={20} />
                  </div>
                  <p>{weatherData.weather[0].main}</p>
                </div>
                <div className=" p-3 border-b-2">
                  <div className=" flex justify-center items-center">
                    <WiSunrise size={20} />
                  </div>
                  <p>{convertUnixTimestamp(weatherData.sys.sunrise)}</p>
                </div>
                <div className=" p-3 border-r-2">
                  <div className=" flex justify-center items-center">
                    <TbSunset2 size={20} />
                  </div>
                  <p>{convertUnixTimestamp(weatherData.sys.sunset)}</p>
                </div>
                <div className=" p-3 border-r-2">
                  <div className=" flex justify-center items-center">
                    <WiHumidity size={20} />
                  </div>
                  <p>{weatherData.main.humidity}</p>
                </div>
                <div className=" p-3">
                  <div className=" flex justify-center items-center">
                    <MdOutlineVisibility size={20} />
                  </div>
                  <p>{weatherData.visibility} m</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
