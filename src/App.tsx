import React, {useState} from 'react';
import './App.scss';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main";
import SingleCity from "./pages/SingleCity";
import {TemperatureUnitContext, CitiesContext, FilteredCitiesContext} from "./context";
import {TemperatureUnit} from "./enums/TemperatureUnit";
import citiesJSON from "./services/cities.json";
import {City} from "./interfaces/City";

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {index: true, element: <Main/>},
      {path: ':city', element: <SingleCity/>},
    ],
  }
]);

function App() {

  const allCities = citiesJSON.cities.filter((city: City) => city.active);

  const [temperatureUnit, setTemperatureUnit] = useState(TemperatureUnit.Celsius);
  const temperatureUnitState = {temperatureUnit, setTemperatureUnit};

  const [filteredCities, setFilteredCities] = useState(allCities);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const filteredCitiesState = {filteredCities, setFilteredCities, isLoaderVisible, setIsLoaderVisible};

  return (
    <TemperatureUnitContext.Provider value={temperatureUnitState}>
      <CitiesContext.Provider value={allCities}>
        <FilteredCitiesContext.Provider value={filteredCitiesState}>
          <RouterProvider router={router}/>
        </FilteredCitiesContext.Provider>
      </CitiesContext.Provider>
    </TemperatureUnitContext.Provider>
  );
}

export default App;
