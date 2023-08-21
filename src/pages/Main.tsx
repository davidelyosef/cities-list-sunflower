import React, {useState} from 'react';
import Header from "../components/Header";
import Cities from "../components/Cities";
import citiesJSON from "../services/cities.json";
import {City} from "../interfaces/City";

const allCities = citiesJSON.cities.filter((city: City) => city.active);

function Main() {
  const [filteredCities, setFilteredCities] = useState(allCities);

  return (
    <>
      <Header setFilteredCities={setFilteredCities}/>
      <Cities filteredCities={filteredCities}/>
    </>
  );
}

export default Main;
