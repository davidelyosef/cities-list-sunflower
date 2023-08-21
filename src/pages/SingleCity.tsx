import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {City} from "../interfaces/City";
import {getWeather} from "../services/get-weather";
import Masthead from "../components/SingleCity/Masthead";
import Temperatures from "../components/SingleCity/Temperatures";
import {Weather} from "../interfaces/Weather";
import WeatherJSON from "../services/jerusalem.json";
import {CitiesContext} from "../context";

function SingleCity() {
  const allCities = useContext(CitiesContext);
  const location = useLocation();
  const city: City = location.state ? location.state.city : findCityByName(allCities, location.pathname.replace('/', '').replace('-', ' '));
  // const jerusalem: any = WeatherJSON.DailyForecasts;

  const [weather, setWeather] = useState<Weather[]>([]);

  useEffect(() => {
    const weatherPromise = getWeather(city);
    weatherPromise.then((weather: Weather[]) => {
      setWeather(weather);
    })
      .catch((error: unknown) => {
        console.log('The allowed number of requests has been exceeded: ' + error);
        // Setting the weather to the JSON file in case the API call fails
        setWeather(WeatherJSON.DailyForecasts);
      });
    // setWeather(jerusalem);
  }, []);

  return (
    <>
      {city && <Masthead city={city}/>}
      {weather && <Temperatures weather={weather}/>}
    </>
  )

  function findCityByName(cities: City[], name: string): City | undefined {
    return cities.find((city: City) => city.name.toLowerCase() === name);
  }
}

export default SingleCity;