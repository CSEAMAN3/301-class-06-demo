import { useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map, setMap] = useState("");

  function handleSearch(event) {
    // console.log("Hey you guys!");
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  }

  async function getLocation(event) {
    try {
      event.preventDefault();
      event.target.input.value = "";
      // console.log("location found");
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      console.log(res.data[0]);
      setLocation(res.data[0]);
      handleMap(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleMap(data) {
    // console.log(data);
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=9`;
    // const res = await axios.get(API);
    setMap(API);
  }

  // 52.6285576
  // 1.2923954

  return (
    <div className="App">
      <form onSubmit={getLocation}>
        <input type="text" placeholder="search for a city" name="input" onChange={handleSearch} />
        <button type="submit">Explore!</button>
      </form>
      <p>{location.display_name}</p>
      {map && <img src={map} alt="map" />}
    </div>
  );
}

export default App;
