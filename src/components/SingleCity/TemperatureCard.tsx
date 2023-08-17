import {TemperatureCardProps} from "../../interfaces/TemperatureCardProps";
import {useContext} from "react";
import {TemperatureUnitContext} from "../../context";
import {TemperatureUnit} from "../../enums/TemperatureUnit";
import {WEATHER_LOGO_URL} from "../../config";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TemperatureCard = ({ day }: TemperatureCardProps) => {
  const {temperatureUnit, setTemperatureUnit} = useContext(TemperatureUnitContext);

  const date = new Date(day.Date);
  const dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];

  let temperatureUnitText = '';
  switch (temperatureUnit) {
    case TemperatureUnit.Fahrenheit:
      temperatureUnitText = `${day.Temperature.Minimum.Value}°F - ${day.Temperature.Maximum.Value}°F`;
      break;
    case TemperatureUnit.Celsius:
      temperatureUnitText = `${fahrenheitToCelsius(day.Temperature.Minimum.Value).toFixed(2)}°C - ${fahrenheitToCelsius(day.Temperature.Maximum.Value).toFixed(2)}°C`;
      break;
    default:
      temperatureUnitText = `${day.Temperature.Minimum.Value}°F - ${day.Temperature.Maximum.Value}°F`;
  }

  return (
    <tr className="temperature-card">
      <td>{dayOfWeek}</td>
      <td>{dateString}</td>
      <td>{temperatureUnitText}</td>
      <td>
        <div className={"temperatures__row-with-image"}>
          <img src={`${WEATHER_LOGO_URL}${day.Day.Icon < 10 ? '0' + day.Day.Icon : day.Day.Icon}-s.png`} alt={"day"} />
          <span>{day.Day.IconPhrase}</span>
        </div>
      </td>
      <td>
        <div className={"temperatures__row-with-image"}>
          <img src={`${WEATHER_LOGO_URL}${day.Night.Icon < 10 ? '0' + day.Night.Icon : day.Night.Icon}-s.png`} alt={"day"} />
          <span>{day.Night.IconPhrase}</span>
        </div>
      </td>
    </tr>
  )
}

const fahrenheitToCelsius = (fahrenheit: number): number => {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius;
}

export default TemperatureCard;