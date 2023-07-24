import { useState } from "react";
import { getLocationData } from "./locationApi";
import "./App.css";

function App() {
  const [location, setLocation] = useState({
    lat: "",
    lon: "",
    display_name: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const input = e.target.search.value;
      const data = await getLocationData(input);
      const { lat, lon, display_name } = data[0];
      setLocation({
        lat,
        lon,
        display_name,
      });
    } catch (error) {}
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
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter a city" name="search" />
        <button>EXPLORE</button>
        <p>{location.lat}</p>
        <p>{location.lon}</p>
        <p>{location.display_name}</p>
      </form>
      <img src={mapImageUrl} alt="map" />
    </div>
  );
}

export default App;
