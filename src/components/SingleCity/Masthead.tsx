import {MastheadProps} from "../../interfaces/MastheadProps";
import "../../style/single-city/masthead.scss";

const Masthead = ({ city }: MastheadProps) => {
  return (
    <div className={"masthead"}>
      <div className="container masthead__container">

        <div>
          <div className="masthead__flex-wrapper">
            {city.image && <img src={`${city.image}`} alt={city.name} className={"masthead__image"}/>}

            <div className="masthead__text-wrapper">
              <div className="masthead__titles">
                <h1 className={"masthead__title"}>{city.name}</h1>
                <h2 className={"masthead__sub-title"}>{city.country} - {city.continent}</h2>
              </div>

              <p className={"masthead__description"}>{city.description}</p>
            </div>
          </div>
          <p className={"masthead__description mobile-only"}>{city.description}</p>
        </div>

      </div>
    </div>
  )
}

export default Masthead;