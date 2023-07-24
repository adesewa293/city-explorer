import { useState } from "react";
import { getLocationData } from "./locationApi";
import "./App.css";

function App() {
  const [location, setLocation] = useState({
    lat: '',
    lon: '',
    display_name: ''
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
        display_name
      });
    } catch (error) {
      
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter a city" name="search" />
        <button>EXPLORE</button>
        <p>{location.lat}</p>
        <p>{location.lon}</p>
        <p>{location.display_name}</p>
      </form>
    </div>
  );
}

export default App;
