import {TemperatureUnit} from "../enums/TemperatureUnit";

export interface TemperatureUnitState {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (temperatureUnit: TemperatureUnit) => void;
}