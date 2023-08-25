import "../../style/city-card.scss";

import {CityCardProps} from "../../interfaces/CityCard";
import {Link} from "react-router-dom";

const CityCard = ({ city }: CityCardProps) => {
  const path = "/cities/" + city.name.toLowerCase().replaceAll(" ", "-");

  return (
    <Link to={path} className={"city-card"}
            style={{backgroundImage: `url(${city.image})`}}
    >
      <div className={"city-card__title"}>{city.name}</div>
      <div className={"city-card__country"}>{city.country}</div>
      <p className={"city-card__description"}>{city.description}</p>
    </Link>
  )
}

export default CityCard;