import {City} from "./City";

export interface FilteredCityContext {
  filteredCities: City[];
  setFilteredCities: (cities: City[]) => void;
  isLoaderVisible?: boolean;
  setIsLoaderVisible?: (isLoading: boolean) => void;
}