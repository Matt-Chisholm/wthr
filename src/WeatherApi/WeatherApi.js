import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GeoLocation() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(0);

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
          setTemp(response.data.main.temp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [lat, lon]);

  return (
    <div>
      <div>
        <h1>{city}</h1>
      </div>
      <div>
        <h2>{weather}</h2>
      </div>
      <div>
        <h3>{temp}</h3>
      </div>
    </div>
  );
}
