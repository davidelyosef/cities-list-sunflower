import {useContext, useEffect, useState} from "react";
import {FilteredCitiesContext} from "../../context";
import {City, Coords} from "../../interfaces/City";

const HeaderSort = () => {
  const {filteredCities, setFilteredCities, setIsLoaderVisible} = useContext(FilteredCitiesContext);

  const [userCoords, setUserCoords] = useState<Coords | null>(null);
  const [isSortedByName, setIsSortedByName] = useState<boolean>(false);
  const [isSortedByDistance, setIsSortedByDistance] = useState<boolean>(false);

  const getSortedCitiesByDistance = (cities: City[], userCoords: Coords | null) => {
    if (!userCoords) {
      return [];
    }
    return cities.sort((a: City, b: City) => {
      const distanceA = calculateDistance(userCoords.lat, userCoords.lng, a.coords.lat, a.coords.lng);
      const distanceB = calculateDistance(userCoords.lat, userCoords.lng, b.coords.lat, b.coords.lng);
      return distanceA - distanceB;
    });
  };

  // Update the cities list when the user coordinates change
  useEffect(() => {
    if (userCoords) {
      sortCitiesByDistance();
    }
  }, [userCoords]);

  const sortCitiesByName = () => {
    const sortedCities = getSortedCitiesByName(filteredCities);
    setFilteredCities([...sortedCities]);

    setIsSortedByName(true);
    setIsSortedByDistance(false);
  }

  const sortCitiesByDistance = () => {
    setIsLoaderVisible && setIsLoaderVisible(true);

    if (!userCoords) {
      setUserCoordsByGeolocationAPI();
      return;
    }

    const sortedCities = getSortedCitiesByDistance(filteredCities, userCoords);
    setFilteredCities([...sortedCities]);

    setIsSortedByName(false);
    setIsSortedByDistance(true);
    console.log('done');
    setIsLoaderVisible && setIsLoaderVisible(false);
  }

  const setUserCoordsByGeolocationAPI = (): void => {
    console.log('setUserCoordsByGeolocationAPI');
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setUserCoords({lat, lng});
    });
  }

  return (
    <div className={"header__sort"}>
      <div className={"header__subtitle"}>Sort by</div>
      <div className="header__buttons-wrapper">
        <button onClick={sortCitiesByName} className={isSortedByName ? "active" : ""}>Name</button>
        |
        <button onClick={sortCitiesByDistance} className={isSortedByDistance ? "active" : ""}>Distance</button>
      </div>
    </div>
  )
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // Distance in kilometers
}

const getSortedCitiesByName = (cities: City[]): City[] => {
  console.log('getSortedCitiesByName');
  return cities.sort((a: City, b: City) => {
    return a.name.localeCompare(b.name);
  });
}

export default HeaderSort;