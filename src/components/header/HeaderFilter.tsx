import {Continent} from "../../enums/Continent";
import {ChangeEvent, useContext, useRef, useState} from "react";
import {City} from "../../interfaces/City";
import {CitiesContext, FilteredCitiesContext} from "../../context";
import Select, {SingleValue} from "react-select";
import {ContinentOption} from "../../interfaces/ContinentOption";

const continentOptions: ContinentOption[] = [
  { value: "", label: "All continents" },
  { value: Continent.Africa, label: Continent.Africa },
  { value: Continent.Europe, label: Continent.Europe },
  { value: Continent.Asia, label: Continent.Asia },
  { value: Continent.NorthAmerica, label: Continent.NorthAmerica },
  { value: Continent.Australia, label: Continent.Australia },
  { value: Continent.SouthAmerica, label: Continent.SouthAmerica },
]

const HeaderFilter = () => {
  const {setFilteredCities} = useContext(FilteredCitiesContext);

  const [citiesByName, setCitiesByName] = useState<City[]>([]);
  const [citiesByContinent, setCitiesByContinent] = useState<City[]>([]);
  const [continent, setContinent] = useState<ContinentOption>(continentOptions[0]);

  const allCities = useContext(CitiesContext);

  const searchRef = useRef<HTMLInputElement>(null);;

  /**
   * Filter cities by name or country
   * @param event
   */
  const filterByNameOrCountry = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // if continent is selected, filter by cities with the same continent
    const citiesToFilter = citiesByContinent.length ? citiesByContinent : allCities;
    const cities = getCitiesByNameOrCountry(citiesToFilter, value);

    setFilteredCities(cities);
    setCitiesByName(value === "" ? [] : getCitiesByNameOrCountry(allCities, value));
  }

  /**
   * Get cities by name or country
   * @param cities
   * @param nameOrCountry
   */
  const getCitiesByNameOrCountry = (cities: City[], nameOrCountry: string): City[] => {
    return cities.filter((city: City) => {
      return city.name.toLowerCase().includes(nameOrCountry.toLowerCase()) ||
        city.country.toLowerCase().includes(nameOrCountry.toLowerCase());
    });
  }

  /**
   * Filter cities by continent
   * @param option
   */
  const filterByContinent = (newValue: SingleValue<ContinentOption>): void => {
    if (!newValue) {
      return;
    }

    const {value} = newValue;

    // // if name or country is selected, filter by cities with the same name or country
    const citiesToFilter = citiesByName.length ? citiesByName : allCities;
    const cities = getCitiesByContinent(citiesToFilter, value);

    setContinent(newValue);
    setFilteredCities(cities);
    setCitiesByContinent(value === "" ? [] : getCitiesByContinent(allCities, value));
  }

  /**
   * Get cities by continent
   * @param continent
   */
  const getCitiesByContinent = (cities: City[], continent: string): City[] => {
    return cities.filter((city: City) => {
      return city.continent.toLowerCase().includes(continent.toLowerCase());
    })
  }

  const resetText = () => {
    setCitiesByName([]);
    setFilteredCities(citiesByContinent.length ? citiesByContinent : allCities);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  }

  return (
    <>
      <div className={"header__search"}>
        <div className={"header__filter-title"}>Search</div>
        <div className={"header__input-wrapper"}>
          <input type="text" placeholder={"Type to search"} onChange={filterByNameOrCountry} ref={searchRef} />
          <div className={"header__reset-text"} onClick={resetText}>✕</div>
        </div>
      </div>

      <div className={"header__continent"}>
        <div className={"header__filter-title"}>Continent</div>
        <div className="header__continent-dropdown">
          <Select options={continentOptions} onChange={filterByContinent} value={continent} />
        </div>
      </div>
    </>
  )
}

export default HeaderFilter