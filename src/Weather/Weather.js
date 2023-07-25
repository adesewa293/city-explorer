import React from "react";

function Weather({ forecasts }) {
  return (
    <ul>
      {forecasts.map((forecast, i) => (
        <li key={i}>
          {forecast.date}: {forecast.description}
        </li>
      ))}
    </ul>
  );
}

export default Weather;
