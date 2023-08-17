import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {City} from "../interfaces/City";
import {getWeather} from "../services/get-weather";
import Masthead from "../components/SingleCity/Masthead";
import Temperatures from "../components/SingleCity/Temperatures";
import {Weather} from "../interfaces/Weather";
import WeatherJSON from "../services/jerusalem.json";

function SingleCity() {
  const location = useLocation();
  const city: City = location.state?.city;

  const [weather, setWeather] = useState<Weather[]>([]);

  useEffect(() => {
    const weatherPromise = getWeather(city);
    weatherPromise.then((weather: any) => {
      setWeather(weather);
    })
      .catch((error: any) => {
        console.log('The allowed number of requests has been exceeded: ' + error);
        // Setting the weather to the JSON file in case the API call fails
        setWeather(WeatherJSON.DailyForecasts);
      });
  }, []);

  return (
    <>
      <Masthead city={city}/>
      <Temperatures weather={weather}/>
    </>
  )
}

export default SingleCity;