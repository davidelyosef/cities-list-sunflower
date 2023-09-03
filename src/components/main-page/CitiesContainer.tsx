import React, {useContext} from "react";
import {FilteredCitiesContext} from "../../context";
import Loader from "../Loader";
import CityCard from "./CityCard";
import "../../style/cities.scss";

const CitiesContainer = () => {
  const {filteredCities, isLoaderVisible} = useContext(FilteredCitiesContext);

  return (
    <div className={"cities"}>
      <div className="cities__container container">
        {isLoaderVisible && <Loader />}
        {filteredCities && filteredCities.map((city, index) => (
          <CityCard key={index} city={city}/>
        ))}
        {filteredCities.length === 0 && (
          <div>No results found</div>
        )}
      </div>
    </div>
  )
}

export default React.memo(CitiesContainer);