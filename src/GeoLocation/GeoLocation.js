import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GeoLocation() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [error, setError] = useState(null);

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
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [lat, lon]);

  return (
    <div>
      GeoLocation
      <div>Latitude: {lat}</div>
      <div>Longitude: {lon}</div>
      <div>{error ? error : null}</div>
    </div>
  );
}
