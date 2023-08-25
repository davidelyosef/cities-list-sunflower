import "../../style/header.scss";
import SearchInputWrapper from "./header/SearchInputWrapper";
import ContinentInputWrapper from "./header/ContinentInputWrapper";
import {AllCitiesContext, FilteredCitiesByContinentContext, FilteredCitiesByNameContext} from "../../context";
import {useContext, useState} from "react";
import {City} from "../../interfaces/City";
import SortInputWrapper from "./header/SortInputWrapper";
import TemperatureUnitWrapper from "./header/TemperatureUnitWrapper";

const CitiesHeader = () => {
  const allCities = useContext(AllCitiesContext);

  const [filteredCitiesByName, setFilteredCitiesByName] = useState<City[]>(allCities);
  const [filteredCitiesByContinent, setFilteredCitiesByContinent] = useState<City[]>(allCities);

  const citiesByNameState = {filteredCities: filteredCitiesByName, setFilteredCities: setFilteredCitiesByName};
  const citiesByContinentState = {filteredCities: filteredCitiesByContinent, setFilteredCities: setFilteredCitiesByContinent};

  return (
    <FilteredCitiesByContinentContext.Provider value={citiesByNameState}>
      <FilteredCitiesByNameContext.Provider value={citiesByContinentState}>

        <header className={"header"}>
          <div className="header__container container">
            <SearchInputWrapper/>
            <ContinentInputWrapper/>
            <SortInputWrapper/>
            <TemperatureUnitWrapper/>
          </div>
        </header>

      </FilteredCitiesByNameContext.Provider>
    </FilteredCitiesByContinentContext.Provider>
  )
}

export default CitiesHeader;