import {CitiesProps} from "../interfaces/CitiesProps";
import CityCard from "./CityCard";
import "../style/cities.scss";

const Cities = ({ filteredCities }: CitiesProps) => {
  return (
    <div className={"cities"}>
      <div className="cities__container container">
        {filteredCities && filteredCities.map((city, index) => (
          <CityCard key={index} city={city} />
        ))}
      </div>
    </div>
  )
}

export default Cities;