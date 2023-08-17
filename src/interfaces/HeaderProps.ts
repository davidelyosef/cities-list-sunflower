import {City} from "./City";

export interface HeaderProps {
  setFilteredCities: (cities: City[]) => void;
}