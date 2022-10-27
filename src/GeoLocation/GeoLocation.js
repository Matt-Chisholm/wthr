import React, { Component } from "react";

export default class GeoLocation extends Component {
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log("Geolocation is allowed");
          } else if (result.state === "prompt") {
            console.log("Geolocation is allowed");
          } else if (result.state === "denied") {
            console.log("Geolocation is denied");
          }
          result.onchange = function () {
            console.log("Permission state has changed to ", result.state);
          };
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render() {
    return <div>GeoLocation</div>;
  }
}
