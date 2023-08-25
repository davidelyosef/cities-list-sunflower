import {createContext} from "react";
import {City} from "./interfaces/City";
import {TemperatureUnit} from "./enums/TemperatureUnit";
import {TemperatureUnitState} from "./interfaces/TemperatureUnitState";
import {emptyFilteredCityState, FilteredCityState} from "./interfaces/FilteredCityState";

export const AllCitiesContext = createContext<City[]>([]);

export const FilteredCitiesContext = createContext<FilteredCityState>({
  ...emptyFilteredCityState,
  isLoaderVisible: false,
  setIsLoaderVisible: () => {}
});

export const TemperatureUnitContext = createContext<TemperatureUnitState>({
  temperatureUnit: TemperatureUnit.Celsius,
  setTemperatureUnit: () => {}
});

export const FilteredCitiesByContinentContext = createContext<FilteredCityState>(emptyFilteredCityState);
export const FilteredCitiesByNameContext = createContext<FilteredCityState>(emptyFilteredCityState);