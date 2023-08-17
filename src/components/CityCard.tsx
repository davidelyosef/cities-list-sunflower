import {CityCardProps} from "../interfaces/CityCard";
import "../style/city-card.scss";
import { useNavigate } from "react-router-dom";

const CityCard = ({city}: CityCardProps) => {
  const navigate = useNavigate();

  const getCityWeather = () => {
    navigate(`/${getCityPath(city.name)}`, { state: { city } });
  }

  return (
    <button className={"city-card"}
          style={{backgroundImage: `url(${city.image})`}}
          onClick={getCityWeather}
    >
      <div className={"city-card__title"}>{city.name}</div>
      <div className={"city-card__country"}>{city.country}</div>
      <p className={"city-card__description"}>{city.description}</p>
    </button>
  )
}

const getCityPath = (city: string): string => {
  return city.toLowerCase().replace(' ', '-');
}

export default CityCard;