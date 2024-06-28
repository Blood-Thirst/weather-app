import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import humidity_icon from "../assets/humidity.png";
import search_icon from "../assets/search.png";
import wind_icon from "../assets/wind.png";
import "./Weather.css";

const Weather = () => {
  // const city
  const [weatherData, setWeatherData] = useState(false);
  const inputCity = useRef();
  const imgIcons = {
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "13d": "https://openweathermap.org/img/wn/13d@2x.png",
    "50d": "https://openweathermap.org/img/wn/50d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "10n": "https://openweathermap.org/img/wn/10n@2x.png",
    "11n": "https://openweathermap.org/img/wn/11n@2x.png",
    "13n": "https://openweathermap.org/img/wn/13n@2x.png",
    "50n": "https://openweathermap.org/img/wn/50n@2x.png",
  };

  const search = async (cityName) => {
    if (cityName === "") {
      alert("Enter City Name");
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`
      )
      .then((resp) => {
        const data = resp.data;
        const icon = imgIcons[data.weather[0].icon] || imgIcons["01d"];
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      })
      .catch((error) => {
        alert("City not found.");
        setWeatherData(false);
      })
      .finally();
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputCity} />
        <img
          src={search_icon}
          alt=""
          onClick={() => {
            search(inputCity.current.value);
          }}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
