import {City} from "../interfaces/City";
import {Weather} from "../interfaces/Weather";
import {API_KEY, ROOT_URL} from "../config";

export const getWeather = (city: City): Weather[] | any => {

  const locationKeyUrl = `${ROOT_URL}locations/v1/cities/search${API_KEY}&q=${city.name}`;

  const locationKey = fetchData(locationKeyUrl).then((data: any) => data[0].Key);

  const weather = locationKey
    .then(key => fetchData(`${ROOT_URL}forecasts/v1/daily/5day/${key}${API_KEY}`))
    .then((data: any) => data.DailyForecasts ?? data);

  return weather;
}

const fetchData = async (url: string) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`)
  }

  return await response.json();
}