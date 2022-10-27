import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApi.css";

export default function GeoLocation() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(function (position) {
              setLat(position.coords.latitude);
              setLon(position.coords.longitude);
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(function (position) {
              setLat(position.coords.latitude);
              setLon(position.coords.longitude);
            });
          } else if (result.state === "denied") {
            setError("Permission to access location was denied");
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          setCity(response.data.name);
          setWeather(response.data.weather[0].main);
          setTemp(Math.round(response.data.main.temp - 273.15));
          setDescription(response.data.weather[0].description);
          setIsLoaded(true);
          setFeelsLike(Math.round(response.data.main.feels_like - 273.15));
          setHumidity(response.data.main.humidity);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [lat, lon]);

  return (
    <div>
      <div className='weather-container'>
        {isLoaded ? (
          <div>
            <div className='city'>
              <h1>You're in : {city}</h1>
            </div>
            <div className='weather-description'>
              <h2>{weather}</h2>{" "}
              <h2>
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </h2>
              {weather === "Clouds" && (
                <img
                  src='https://img.icons8.com/ultraviolet/40/000000/cloud.png'
                  alt='cloud'
                />
              )}
              {weather === "Clear" && (
                <img
                  src='https://img.icons8.com/ultraviolet/40/000000/summer.png'
                  alt='sun'
                />
              )}
              {weather === "Rain" && (
                <img
                  src='https://img.icons8.com/ultraviolet/40/000000/light-rain-2.png'
                  alt='rain'
                />
              )}
              {weather === "Snow" && (
                <img
                  src='https://img.icons8.com/ultraviolet/40/000000/winter.png'
                  alt='snow'
                />
              )}
              {weather === "Thunderstorm" && (
                <img
                  src='https://img.icons8.com/color/48/000000/thunderstorm.png'
                  alt='thunderstorm'
                />
              )}
            </div>
            <div className='temp'>
              <h2>{`${temp} \u00B0  Feels like : ${feelsLike}`} </h2>
              <h2>{`Humidity: ${humidity}`}</h2>
            </div>
          </div>
        ) : (
          <div className='loading'>
            <h1>Loading...</h1>
            {error && <h1>{error}</h1>}
          </div>
        )}
      </div>
    </div>
  );
}
