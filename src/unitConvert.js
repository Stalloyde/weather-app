function fahrenheitToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * 0.5556;
  const celsiusRounded = Math.round(celsius * 10) / 10;
  return celsiusRounded;
}

function celsiusToFahrenheit(celsius) {
  const fahrenheit = celsius * 1.8 + 32;
  const fahrenheitRounded = Math.round(fahrenheit * 10) / 10;
  return fahrenheitRounded;
}

export default { fahrenheitToCelsius, celsiusToFahrenheit };
