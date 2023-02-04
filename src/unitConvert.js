function kelvinToCelsius(kelvin) {
  const celsius = kelvin - 273.5;
  const celsiusRounded = Math.round(celsius * 10) / 10;
  return celsiusRounded;
}

export default { kelvinToCelsius };
