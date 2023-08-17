import {HeaderProps} from "../interfaces/HeaderProps";
import HeaderFilter from "./header/HeaderFilter";
import HeaderSort from "./header/HeaderSort";
import "../style/header.scss";
import HeaderTemperatureUnits from "./header/HeaderTemperatureUnits";

const Header = ({setFilteredCities}: HeaderProps) => {

  return (
    <header className={"header"}>

      <div className="header__container container">

        <HeaderFilter setFilteredCities={setFilteredCities}/>
        <HeaderSort setFilteredCities={setFilteredCities}/>
        <HeaderTemperatureUnits/>

      </div>
    </header>
  )
}


export default Header;