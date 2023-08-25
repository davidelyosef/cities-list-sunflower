import {City} from "./City";

export interface FilteredCityState {
  filteredCities: City[];
  setFilteredCities: (cities: City[]) => void;
  isLoaderVisible?: boolean;
  setIsLoaderVisible?: (isLoading: boolean) => void;
}

export const emptyFilteredCityState: FilteredCityState = {
  filteredCities: [],
  setFilteredCities: () => {},
}