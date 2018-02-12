const math = require('mathjs');

convertF = (temp, mode) => {
  /* Celsius to Fahrenheit */
  if (mode == "c") {
    returntmp = (temp * math.fraction('9/5')) + 32;
  }
  /* Fahrenheit to Kelvin */
  if (mode == "k") {
    returntmp = (temp + 459.67) * math.fraction('5/9');
  }
  return parseFloat(returntmp.toFixed(2));
};

convertC = (temp, mode) => {
  /* Fahrenheit to Celsius */
  if (mode == "f"){
    returntmp = (temp - 32) * math.fraction('5/9'); 
  }
  /* Celsius to Kelvin */
  if (mode == "k"){
    returntmp = temp + 273.15
  }
  return parseFloat(returntmp.toFixed(2));
};

module.exports = {
  Fahrenheit: convertF,
  Celsius: convertC
}
