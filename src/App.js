import { useState } from "react";
import { getLocationData, getWeatherData } from "./locationApi";
import "./App.css";
import Header from "./Header/Header";
import Weather from "./Weather/Weather";

function App() {
  const [location, setLocation] = useState({
    lat: "",
    lon: "",
    display_name: "",
  });
  const [forecasts, setForecasts] = useState([]);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const input = e.target.search.value;
      const data = await getLocationData(input);
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setLocation({
          lat,
          lon,
          display_name,
        });
        const weatherData = await getWeatherData(lat, lon, input);
        console.log("weatherData", weatherData);
        setForecasts(weatherData);
      }
    } catch (error) {
      if (error.response) {
        console.log('error.response.data', error.response.data);
        setError({
          code: error.response.status,
          message: error.response.data.error,
        });
      } else {
        setError({
          code: 500,
          message: "An error occured, please try again later",
        });
      }
    }
  }

  function getMapImageUrl() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const lat = location.lat || 54;
    const lon = location.lon || -2.0;
    const zoom = location.display_name ? 18 : 7;
    return `https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${lat},${lon}&zoom=${zoom}`;
  }

  const mapImageUrl = getMapImageUrl();

  return (
    <div className="App">
      <Header />
      {error && (
        <div>
          <p>Error code: {error.code}</p>
          <p>{error.message}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a city" name="search" />
        <button>EXPLORE</button>
        <p>Location latitiude: {location.lat}</p>
        <p>Location longitude: {location.lon}</p>
        <p>{location.display_name}</p>
      </form>
      {forecasts.length > 0 && (
        <Weather forecasts={forecasts} />
      )}
      <img src={mapImageUrl} alt="map" />
    </div>
  );
}

export default App;
