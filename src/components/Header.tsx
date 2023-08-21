import HeaderFilter from "./header/HeaderFilter";
import HeaderSort from "./header/HeaderSort";
import "../style/header.scss";
import HeaderTemperatureUnits from "./header/HeaderTemperatureUnits";

const Header = () => {

  return (
    <header className={"header"}>
      <div className="header__container container">

        <HeaderFilter />
        <HeaderSort />
        <HeaderTemperatureUnits />

      </div>
    </header>
  )
}

export default Header;