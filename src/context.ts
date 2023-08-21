import {createContext} from "react";
import {City} from "./interfaces/City";
import {TemperatureUnit} from "./enums/TemperatureUnit";
import {FilteredCityContext} from "./interfaces/FilteredCityContext";
import {TemperatureUnitState} from "./interfaces/TemperatureUnitContext";

export const CitiesContext = createContext<City[]>([]);

export const FilteredCitiesContext = createContext<FilteredCityContext>({
  filteredCities: [],
  setFilteredCities: () => {}
});

export const TemperatureUnitContext = createContext<TemperatureUnitState>({
  temperatureUnit: TemperatureUnit.Celsius,
  setTemperatureUnit: () => {}
});