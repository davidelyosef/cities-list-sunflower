import React, {useState} from 'react';
import './App.scss';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./pages/Main";
import SingleCity from "./pages/SingleCity";
import {TemperatureUnitContext, CitiesContext} from "./context";
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
  const value = {temperatureUnit, setTemperatureUnit};

  return (
    <TemperatureUnitContext.Provider value={value}>
      <CitiesContext.Provider value={allCities}>
        <RouterProvider router={router}/>
      </CitiesContext.Provider>
    </TemperatureUnitContext.Provider>
  );
}

export default App;
