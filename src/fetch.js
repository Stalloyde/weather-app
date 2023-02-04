import { searchList } from './append';
import unitConvert from './unitConvert';

async function fetchCityList(city) {
  try {
    const searchCityResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=d9e258234d52a07f51639a2e63abcc0f`,
      { mode: 'cors' }
    );
    const searchCity = await searchCityResponse.json();
    return searchCity;
  } catch (error) {
    console.log(error);
  }
}

async function fetchCityWeather(latitude, longitude) {
  const cityWeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d9e258234d52a07f51639a2e63abcc0f`
  );
  const cityWeather = await cityWeatherResponse.json();
  const country = cityWeather.name;
  const currentTemperature = unitConvert.kelvinToCelsius(cityWeather.main.temp);

  const currentWeather = cityWeather.weather[0].main;
  return { country, currentTemperature, currentWeather };
}

export default { fetchCityList, fetchCityWeather };
