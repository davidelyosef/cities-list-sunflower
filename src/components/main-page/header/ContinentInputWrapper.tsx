import {ContinentOption} from "../../../interfaces/ContinentOption";
import {Continent} from "../../../enums/Continent";
import Select, {SingleValue} from "react-select";
import {useContext, useState} from "react";
import {City} from "../../../interfaces/City";
import {
  AllCitiesContext,
  FilteredCitiesByContinentContext,
  FilteredCitiesByNameContext,
  FilteredCitiesContext
} from "../../../context";

const continentOptions: ContinentOption[] = [
  { value: "", label: "All continents" },
  { value: Continent.Africa, label: Continent.Africa },
  { value: Continent.Europe, label: Continent.Europe },
  { value: Continent.Asia, label: Continent.Asia },
  { value: Continent.NorthAmerica, label: Continent.NorthAmerica },
  { value: Continent.Australia, label: Continent.Australia },
  { value: Continent.SouthAmerica, label: Continent.SouthAmerica },
]

const ContinentInputWrapper = () => {
  const allCities = useContext(AllCitiesContext);
  const FilteredCitiesByContinentState = useContext(FilteredCitiesByContinentContext);
  const {filteredCities} = useContext(FilteredCitiesByNameContext);

  const [continent, setContinent] = useState<ContinentOption>(continentOptions[0]);
  const {setFilteredCities} = useContext(FilteredCitiesContext);

  const filterByContinent = (newValue: SingleValue<ContinentOption>): void => {
    if (!newValue || newValue.value === "") {
      resetContinent();
      return;
    }

    const {value} = newValue;
    const AllCitiesByContinent = getCitiesByContinent(allCities, value);
    FilteredCitiesByContinentState.setFilteredCities(AllCitiesByContinent);

    setContinent(newValue);

    const citiesByContinent = getCitiesByContinent(filteredCities, value);
    setFilteredCities(citiesByContinent);
  }

  const getCitiesByContinent = (cities: City[], continent: string = ""): City[] => {
    if (continent === "") {
      return filteredCities;
    }
    return cities.filter((city: City) => {
      return city.continent.toLowerCase().includes(continent.toLowerCase());
    })
  }

  const resetContinent = () => {
    const citiesByContinent = getCitiesByContinent(filteredCities);

    setContinent(continentOptions[0]);
    FilteredCitiesByContinentState.setFilteredCities(allCities);
    setFilteredCities(citiesByContinent);
  }

  return (
    <div className={"header__continent"}>
      <div className={"header__filter-title"}>Continent</div>
      <div className="header__continent-dropdown">
        <Select options={continentOptions} onChange={filterByContinent} value={continent} />
      </div>
    </div>
  )
}

export default ContinentInputWrapper;