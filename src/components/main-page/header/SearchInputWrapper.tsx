import {ChangeEvent, useContext, useState} from "react";
import {
  AllCitiesContext,
  FilteredCitiesByContinentContext,
  FilteredCitiesByNameContext,
  FilteredCitiesContext
} from "../../../context";
import {City} from "../../../interfaces/City";

const SearchInputWrapper = () => {
  const allCities = useContext(AllCitiesContext);
  const {setFilteredCities} = useContext(FilteredCitiesContext);
  const [searchText, setSearchText] = useState("");

  const filteredCitiesByNameState = useContext(FilteredCitiesByNameContext);
  const {filteredCities} = useContext(FilteredCitiesByContinentContext);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;

    if (value === "") {
      resetText();
      return;
    }

    const allCitiesByName = getCitiesByName(allCities, value);
    const newFilteredCities = getCitiesByName(filteredCities, value);

    setSearchText(value);
    filteredCitiesByNameState.setFilteredCities(allCitiesByName);
    setFilteredCities(newFilteredCities);
  }

  function getCitiesByName(cities: City[], name: string = "") {
    if (name === "") return filteredCities;
    return cities.filter((city) => (
      city.name.toLowerCase().includes(name.toLowerCase()) ||
        city.country.toLowerCase().includes(name.toLowerCase())
    ));
  }

  const resetText = () => {
    const newFilteredCities = getCitiesByName(filteredCities, "");

    setSearchText("");
    filteredCitiesByNameState.setFilteredCities(allCities);
    setFilteredCities(newFilteredCities);
  }

  return (
    <div className={"header__search"}>
      <div className={"header__filter-title"}>Search</div>
      <div className={"header__input-wrapper"}>
        <input type="text" placeholder={"Type to search"} value={searchText} onChange={handleSearch} />
        <button className={"header__reset-text"} onClick={resetText}>✕</button>
      </div>
    </div>
  )
}

export default SearchInputWrapper;