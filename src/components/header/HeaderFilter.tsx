import {Continent} from "../../enums/Continent";
import {ChangeEvent, useContext, useState, useRef} from "react";
import {City} from "../../interfaces/City";
import {CitiesContext} from "../../context";
import {HeaderProps} from "../../interfaces/HeaderProps";

const continents: Continent[] = [
  Continent.Africa, Continent.Europe, Continent.Asia, Continent.NorthAmerica, Continent.Australia, Continent.SouthAmerica
];

const HeaderFilter = ({ setFilteredCities }: HeaderProps) => {
  const [citiesByName, setCitiesByName] = useState<City[]>([]);
  const [citiesByContinent, setCitiesByContinent] = useState<City[]>([]);

  const allCities = useContext(CitiesContext);

  const searchRef = useRef<HTMLInputElement>(null);;

  /**
   * Filter cities by name or country
   * @param event
   */
  const filterByNameOrCountry = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // let cities;
    //
    // if (citiesByContinent.length) {
    //   cities = getCitiesByNameOrCountry(citiesByContinent, value);
    // } else {
    //   cities = getCitiesByNameOrCountry(allCities, value);
    // }
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
   * @param event
   */
  const filterByContinent = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    // let cities;
    //
    // // if name or country is selected, filter by cities with the same name or country
    // if (citiesByName.length) {
    //   cities = getCitiesByContinent(citiesByName, value);
    // } else {
    //   cities = getCitiesByContinent(allCities, value);
    // }

    const citiesToFilter = citiesByName.length ? citiesByName : allCities;
    const cities = getCitiesByContinent(citiesToFilter, value);

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
          <select onChange={filterByContinent}>
            <option value={""}>All continents</option>
            {continents.map((continent: Continent, index: number) => (
              <option key={index} value={continent}>{continent}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default HeaderFilter