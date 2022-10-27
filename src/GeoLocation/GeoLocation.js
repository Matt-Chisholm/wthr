import React, { useEffect, useState } from "react";

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

  return (
    <div>
      GeoLocation
      <div>Latitude: {lat}</div>
      <div>Longitude: {lon}</div>
      <div>{error ? error : null}</div>
    </div>
  );
}
