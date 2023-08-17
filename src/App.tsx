import React, {useState} from 'react';
import './App.scss';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Main from "./pages/Main";
import SingleCity from "./pages/SingleCity";
import {TemperatureUnitContext} from "./context";
import {TemperatureUnit} from "./enums/TemperatureUnit";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Main />} />
    <Route path="/:city" element={<SingleCity />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {

  const [temperatureUnit, setTemperatureUnit] = useState(TemperatureUnit.Celsius);
  const value = {temperatureUnit, setTemperatureUnit};

  return (
    <TemperatureUnitContext.Provider value={value} >
      <RouterProvider router={router} />
    </TemperatureUnitContext.Provider>
  );
}

export default App;
