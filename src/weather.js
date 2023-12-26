// Weather.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const API_KEY = "d5e6017b874a1d8c605482310ca9b12d";

  useEffect(() => {
    updateDateTime();
  }, []);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };
  const updateDateTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const formattedDateTime = now.toLocaleString("en-US", options);
    setCurrentDateTime(formattedDateTime);
  };
  return (
    <div>
      <h1>Weather App</h1>
      {currentDateTime && (
        <div>
          <p>{currentDateTime}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
