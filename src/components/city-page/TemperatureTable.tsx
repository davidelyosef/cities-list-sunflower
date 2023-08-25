import {Link} from "react-router-dom";
import {WeatherProps} from "../../interfaces/WeatherProps";
import "../../style/single-city/temperatures.scss";
import {Weather} from "../../interfaces/Weather";
import TemperatureCard from "./TemperatureCard";

const TemperatureTable = ({weather}: WeatherProps) => {
  return (
    <div className={"temperatures"}>
      <div className="temperatures__container container">
        <div className="temperatures__wrapper">
          <Link to={"/"} className={"temperatures__back-button"}>Back to main page</Link>

          <table className={"temperatures__table"}>
            <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Temperature</th>
              <th>Day Status</th>
              <th>Night Status</th>
            </tr>
            </thead>
            <tbody>
            {weather && weather.map((day: Weather, index: number) => (
              <TemperatureCard key={index} day={day}/>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TemperatureTable;