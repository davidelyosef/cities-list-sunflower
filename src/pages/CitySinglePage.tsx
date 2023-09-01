import Masthead from "../components/city-page/Masthead";
import TemperatureTable from "../components/city-page/TemperatureTable";
import { useContext } from "react";
import { AllCitiesContext } from "../context";
import { useLoaderData, useParams } from "react-router-dom";
import { City } from "../interfaces/City";
import { Weather } from "../interfaces/Weather";
import WeatherJSON from "../services/jerusalem.json";
import { getWeather } from "../services/get-weather";
import { findCityByPath } from "../services/find-city-by-path";
import { WeatherLoaderFunctionArgs } from "../interfaces/WeatherLoaderFunctionArgs";

const CitySinglePage = () => {
  const { city: path } = useParams();
  const allCities = useContext(AllCitiesContext);

  const city = findCityByPath(allCities, path);
  const weather = useLoaderData();

  return (
    <>
      {city && <Masthead city={city} />}
      {weather && <TemperatureTable weather={weather} />}
    </>
  )
}

export default CitySinglePage;

export const weatherLoader = async ({ params }: WeatherLoaderFunctionArgs, allCities: City[]) => {
  const city = findCityByPath(allCities, params.city || "");
  const fallback = WeatherJSON.DailyForecasts;

  if (!city) {
    return fallback;
  }

  const weatherPromise = getWeather(city);
  return weatherPromise
    .then((weather: Weather[]) => weather)
    .catch((error: unknown) => {
      // Setting the weather to the JSON file in case the API call fails
      console.error('The allowed number of requests has been exceeded: ' + error);
      return fallback;
    });
}