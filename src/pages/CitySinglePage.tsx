import Masthead from "../components/city-page/Masthead";
import TemperatureTable from "../components/city-page/TemperatureTable";
import {useContext, useEffect, useState} from "react";
import {AllCitiesContext} from "../context";
import {useLocation} from "react-router-dom";
import {City} from "../interfaces/City";
import {Weather} from "../interfaces/Weather";
import WeatherJSON from "../services/jerusalem.json";
import {getWeather} from "../services/get-weather";

const CitySinglePage = () => {
  const allCities = useContext(AllCitiesContext);
  const location = useLocation();
  const cityName = location.pathname
    .replace('cities/', '')
    .replaceAll('/', '')
    .replaceAll('-', ' ');
  const city: City | undefined = findCityByName(allCities, cityName);
  const jerusalem: any = WeatherJSON.DailyForecasts;

  const [weather, setWeather] = useState<Weather[]>([]);

  useEffect(() => {
    if (!city) {
      return;
    }
    const weatherPromise = getWeather(city);
    weatherPromise.then((weather: Weather[]) => {
      setWeather(weather);
    })
      .catch((error: unknown) => {
        console.log('The allowed number of requests has been exceeded: ' + error);
        // Setting the weather to the JSON file in case the API call fails
        setWeather(jerusalem);
      });
    // setWeather(jerusalem);
  }, []);

  function findCityByName(cities: City[] = allCities, name: string): City | undefined {
    return cities.find((city: City) => city.name.toLowerCase() === name);
  }

  return (
    <>
      {city && <Masthead city={city}/>}
      {weather && <TemperatureTable weather={weather}/>}
    </>
  )
}

export default CitySinglePage;