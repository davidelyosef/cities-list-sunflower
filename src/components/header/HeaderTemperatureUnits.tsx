import {useContext} from "react";
import {TemperatureUnitContext} from "../../context";
import {TemperatureUnit} from "../../enums/TemperatureUnit";

const HeaderTemperatureUnits = () => {
  const {temperatureUnit, setTemperatureUnit} = useContext(TemperatureUnitContext);

  const handleTemperatureUnitChange = (unit: any) => {
    setTemperatureUnit(unit);
  };

  return (
    <div className={"header__units"}>
      <div className={"header__subtitle"}>Units</div>
      <div className="header__buttons-wrapper">
        <button
          className={temperatureUnit === TemperatureUnit.Celsius ? "active" : ""}
          onClick={() => handleTemperatureUnitChange(TemperatureUnit.Celsius)}>
          °C
        </button>|
        <button
          className={temperatureUnit === TemperatureUnit.Fahrenheit ? "active" : ""}
          onClick={() => handleTemperatureUnitChange(TemperatureUnit.Fahrenheit)}>
          °F
        </button>
      </div>
    </div>
  )
}

export default HeaderTemperatureUnits;