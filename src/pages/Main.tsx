import React, {useState} from 'react';
import Header from "../components/Header";
import Cities from "../components/Cities";
import {CitiesContext} from "../context";
import citiesJSON from "../services/cities.json";
import {City} from "../interfaces/City";

const allCities = citiesJSON.cities.filter((city: City) => city.active);

function Main() {
  const [filteredCities, setFilteredCities] = useState(allCities);

  return (
    <>
      <CitiesContext.Provider value={allCities}>
        <Header setFilteredCities={setFilteredCities} />
        <Cities filteredCities={filteredCities} />
      </CitiesContext.Provider>
    </>
  );
}

export default Main;
