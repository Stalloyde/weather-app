let latitude;
let longitude;

export default async function fetchGeolocationData(city) {
  try {
    const geoLocationResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=d9e258234d52a07f51639a2e63abcc0f`,
      { mode: 'cors' }
    );

    const geoLocation = await geoLocationResponse.json();
    return geoLocation;
  } catch {
    console.log('ERROR: Something went wrong with your API call');
  }
}

async function getCityWeather() {
  const cityWeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d9e258234d52a07f51639a2e63abcc0f`
  );
  const cityWeather = await cityWeatherResponse.json();
  console.log(cityWeather);
}
