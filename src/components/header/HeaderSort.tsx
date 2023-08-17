import {useContext, useState} from "react";
import {CitiesContext} from "../../context";
import {HeaderProps} from "../../interfaces/HeaderProps";
import {City, Coords} from "../../interfaces/City";

const HeaderSort = ({ setFilteredCities }: HeaderProps) => {
  const allCities = useContext(CitiesContext);
  const [userCoords, setUserCoords]                 = useState<Coords>({lat: 0, lng: 0});
  const [isSortedByName, setIsSortedByName]         = useState<boolean>(false);
  const [isSortedByDistance, setIsSortedByDistance] = useState<boolean>(false);

  const sortCities = () => {
    const sortedCities = getSortedCitiesByName(allCities);
    setFilteredCities([...sortedCities]);

    setIsSortedByName(true);
    setIsSortedByDistance(false);
  }

  const filterByDistance = () => {
    if (userCoords.lat === 0 && userCoords.lng === 0) {
      getUserCoords();
    }

    const sortedCities = getSortedCitiesByDistance(allCities, userCoords);
    setFilteredCities([...sortedCities]);

    setIsSortedByName(false);
    setIsSortedByDistance(true);
  }

  const getUserCoords = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const userCoords = {lat, lng};

        setUserCoords(userCoords);
        return userCoords;
      });
    }
    else {
      return {lat: 0, lng: 0};
    }
  }

  return (
    <div className={"header__sort"}>
      <div className={"header__subtitle"}>Sort by</div>
      <div className="header__buttons-wrapper">
        <button onClick={sortCities} className={isSortedByName ? "active" : ""}>Name</button>|
        <button onClick={filterByDistance} className={isSortedByDistance ? "active" : ""}>Distance</button>
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

const getSortedCitiesByDistance = (cities: City[], userCoords: Coords): any => {
  return cities.sort((a: City, b: City) => {
    const distanceA = calculateDistance(userCoords.lat, userCoords.lng, a.coords.lat, a.coords.lng);
    const distanceB = calculateDistance(userCoords.lat, userCoords.lng, b.coords.lat, b.coords.lng);
    return distanceA - distanceB;
  });
}

const getSortedCitiesByName = (cities: City[]): City[] => {
  return cities.sort((a: City, b: City) => {
    return a.name.localeCompare(b.name);
  });
}

export default HeaderSort;