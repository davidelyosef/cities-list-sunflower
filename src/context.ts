import {createContext} from "react";
import {City} from "./interfaces/City";
import {TemperatureUnit} from "./enums/TemperatureUnit";

export const CitiesContext = createContext<City[]>([]);
export const TemperatureUnitContext = createContext<any>(TemperatureUnit.Celsius);