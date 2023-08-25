import React, {useContext, useState} from 'react';
import {AllCitiesContext, FilteredCitiesContext} from "../context";
import CitiesContainer from "../components/main-page/CitiesContainer";
import CitiesHeader from "../components/main-page/CitiesHeader";

const MainPage = () => {
  const allCities = useContext(AllCitiesContext);
  const [filteredCities, setFilteredCities] = useState(allCities);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const filteredCitiesState = {filteredCities, setFilteredCities, isLoaderVisible, setIsLoaderVisible};

  return (
    <FilteredCitiesContext.Provider value={filteredCitiesState}>
      <CitiesHeader />
      <CitiesContainer/>
    </FilteredCitiesContext.Provider>
  )
}

export default MainPage;