import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./pages/MainPage";
import CitySinglePage, { weatherLoader } from "./pages/CitySinglePage";
import {AllCitiesContext, TemperatureUnitContext} from "./context";
import CitiesJSON from "./services/cities.json";
import {City} from "./interfaces/City";
import {TemperatureUnit} from "./enums/TemperatureUnit";

function App() {
  const allActiveCities = CitiesJSON.cities.filter((city: City) => city.active);

  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(TemperatureUnit.Celsius);
  const temperatureUnitState = {temperatureUnit, setTemperatureUnit};

  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {index: true, element: <MainPage/>},
        {path: 'cities', element: <MainPage/>},
        {path: 'cities/:city', element: <CitySinglePage/>, loader: (loaderData) => weatherLoader(loaderData, allActiveCities) },
      ]
    }
  ])

  return (
    <>
      <AllCitiesContext.Provider value={allActiveCities}>
        <TemperatureUnitContext.Provider value={temperatureUnitState}>
          <RouterProvider router={router}/>
        </TemperatureUnitContext.Provider>
      </AllCitiesContext.Provider>
    </>
  );
}

export default App;
