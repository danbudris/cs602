const temps = require("./src/temperatures.js");
const should = require('chai').should()

/* Celcius to Fahrenheit */
temps.Fahrenheit(50, 'c').should.equal(122.00);

/* Fahrenheit to Kelvin */
temps.Fahrenheit(50, 'k').should.equal(283.15);

/* Fahrenheit to Celsius */
temps.Celsius(50, 'f').should.equal(10.00);

/* Celsius to Kelvin */
temps.Celsius(50, 'k').should.equal(323.15);
