/*
 * Copyright (c) 2015 Toni Solarin-Sodara
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * This module contains the class and all methods for working with complex numbers
 * @module Mathplex
 */


/**
 * @class Complex
 * @constructor
 * @param real {Number} The real part of a complex number
 * @param imaginary {Number} The real part of a complex number
 * @return {Complex} An instance of the Complex class
 * @example
 *    // 2 + 7i
 *    var c = new Complex(2, 7);
 *    // -3.4 + 45i (Using string formated numbers)
 *    var c = new Complex('-3.4', '45');
 */

function Complex(real, imaginary) {

  /**
   * The real part of a complex number
   * @property real
   * @type Number
   */
  this.real = 0;

  /**
   * The imaginary part of a complex number
   * @property imaginary
   * @type Number
   */
  this.imaginary = 0;
  
  this.real = (typeof real === 'undefined') ? this.real : parseFloat(real);
  this.imaginary = (typeof imaginary === 'undefined') ? this.imaginary : parseFloat(imaginary);

  /**
   * Two dimensional distance from the origin
   * @property magnitude
   * @type Number
   */
  this.magnitude = Math.sqrt((this.real * this.real) + (this.imaginary * this.imaginary));

  /**
   * The arc tangent (in radians) of the real and imaginary. Useful in polar form calculation
   * @property tangent
   * @type Number
   */
  this.tangent = Math.atan2(this.imaginary, this.real);
  this.tangent = Math.PI - (Math.PI * 3 - (Math.PI - (Math.PI * 3 - this.tangent) % (Math.PI * 2))) % (Math.PI * 2);

}

// Constants

/**
 * A complex number with both real and imaginary parts set to zero
 * @property ZERO
 * @final
 * @static
 * @type Complex
 */
Complex.ZERO = new Complex(0, 0);

/**
 * A complex number with real part set to one and imaginary part set to zero
 * @property ONE
 * @final
 * @static
 * @type Complex
 */
Complex.ONE = new Complex(1, 0);

/**
 * A complex number with real part set to zero and imaginary part set to one
 * @property I
 * @final
 * @static
 * @type Complex
 */
Complex.I = new Complex(0, 1);

/**
 * A complex number with real part set to negative one and imaginary part set to zero
 * @property NEG_I
 * @final
 * @static
 * @type Complex
 */
Complex.NEG_I = new Complex(0, -1);

/**
 * A complex number with real part set to PI and imaginary part set to zero
 * @property PI
 * @final
 * @static
 * @type Complex
 */
Complex.PI = new Complex(Math.PI, 0);

/**
 * A complex number with real part set to constant e and imaginary part set to zero
 * @property E
 * @final
 * @static
 * @type Complex
 */
Complex.E = new Complex(Math.E, 0);

// Helper functions
/**
 * Standalone function to parse a string expression into a complex number and returns the result
 * @method parseComplex
 * @return {Complex} An instance of the Complex class
 * @example
 *    // same as new Complex(2.5, 60)
 *    parseComplex("2.5+60i")
 *    // same as new Complex(-2, 7)
 *    parseComplex("-2+7i")
 */
var parseComplex = function(num) {

  if (num instanceof Complex)
    return num;

  if (typeof num !== 'string')
    return undefined;

  var e = num;
  var valid = ['0','1','2','3','4','5','6','7','8','9','+','-','.'];
  for (var i = 0; i < num.length; i++)
    if (valid.indexOf(num[i]) == -1)
      e = e.replace(num[i], '');

  var real = 1, imaginary = 1, startindex = 0;

  real = (e[0] == '-') ? -1 : real;
  startindex = (e[0] == '-' || e[0] == '+') ? 1 : startindex;

  var temp_real = '';
  for (var j = startindex; j < e.length; j++) {
    startindex = j;
    if (e[j] == '+' || e[j] == '-')
      break;
    else
      temp_real += e[j];
  }

  real = real * Number(temp_real);
  imaginary = e[startindex] == '-' ? -1 : imaginary;
  ++startindex;

  var temp_imag = '';
  for (var k = startindex; k < e.length; k++) {
    if (e[k] == '+' || e[k] == '-')
      break;
    else
      temp_imag += e[k];
  }

  imaginary = imaginary * Number(temp_imag);

  return new Complex(real, imaginary);

};

// Static Methods

/**
 * Transforms a number or string to a complex number and returns the result
 * @method transform
 * @static
 * @param num {String} The object to transform to a complex number
 * @return {Complex} An instance of the Complex class
 */
Complex.transform = function(num) {

  var complex;

  complex = (num instanceof Complex) ? num : complex;
  complex = (typeof num === 'number') ? new Complex(num, 0) : num;
  complex = (typeof num === 'string') ? parseComplex(num) : complex;

  return complex;

};

/**
 * Adds two complex numbers together and returns the result
 * @method add
 * @static
 * @param first {Complex} An instance of the Complex Class
 * @param second {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 * @example
 *    Complex c1 = new Complex(3,5);
 *    Complex c2 = new Complex(23,-15);
 *    Complex.add(c1,c2);
 *    // All methods call the parseComplex() function internally so the below will give the same result
 *    Complex.add('3+5i','23-15i');
 *
 */
Complex.add = function(first, second) {

  var firstnum, secondnum;

  firstnum = Complex.transform(first);
  secondnum = Complex.transform(second);

  var real = firstnum.real + secondnum.real;
  var imaginary = firstnum.imaginary + secondnum.imaginary;

  return new Complex(real, imaginary);

};

/**
 * Subtracts a complex number from another and returns the result
 * @method subtract
 * @static
 * @param first {Complex} An instance of the Complex Class
 * @param second {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.subtract = function(first, second) {

  var firstnum, secondnum;

  firstnum = Complex.transform(first);
  secondnum = Complex.transform(second);

  var real = firstnum.real - secondnum.real;
  var imaginary = firstnum.imaginary - secondnum.imaginary;

  return new Complex(real, imaginary);

};

/**
 * Returns the product of two complex numbers together
 * @method multiply
 * @static
 * @param first {Complex} An instance of the Complex Class
 * @param second {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.multiply = function(first, second) {

  var firstnum, secondnum;

  firstnum = Complex.transform(first);
  secondnum = Complex.transform(second);

  var real = (firstnum.real * secondnum.real) - (firstnum.imaginary * secondnum.imaginary);
  var imaginary = (firstnum.real * secondnum.imaginary) + (firstnum.imaginary * secondnum.real);

  return new Complex(real, imaginary);

};

/**
 * Returns the division of a complex number by another
 * @method divide
 * @static
 * @param first {Complex} The quotient. An instance of the Complex Class
 * @param second {Complex} The divisor. An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.divide = function(first, second) {

  var firstnum, secondnum, numerator, denominator, multiplier;

  firstnum = Complex.transform(first);
  secondnum = Complex.transform(second);
  multiplier = new Complex(secondnum.real, secondnum.imaginary);
  multiplier.imaginary = multiplier.imaginary * -1;

  numerator = Complex.multiply(firstnum, multiplier);
  denominator = Complex.multiply(secondnum, multiplier);

  return new Complex(numerator.real / denominator.real, numerator.imaginary / denominator.real);

};

/**
 * Negates a complex number and returns it
 * @method negate
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c = new Complex(13,21);
 *    // returns new Complex(-13, -21);
 *    Complex.negate(c);
 */
Complex.negate = function(num) {

  var complex;
  complex = Complex.transform(num);
  return new Complex(-complex.real, -complex.imaginary);

};

/**
 * Returns the absolute value of a complex number
 * @method abs
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Number} The absolute value
 * @example
 *    Complex.abs(new Complex(11,6));
 */
Complex.abs = function(num) {

  var complex;
  complex = Complex.transform(num);
  return complex.magnitude;

};

/**
 * Rounds down the real and imaginary parts of a complex number and returns it
 * @method floor
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.floor = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = Math.floor(complex.real);
  var imaginary = Math.floor(complex.imaginary);

  return new Complex(real, imaginary);

};

/**
 * Rounds up the real and imaginary parts of a complex number and returns it
 * @method ceil
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.ceil = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = Math.ceil(complex.real);
  var imaginary = Math.ceil(complex.imaginary);

  return new Complex(real, imaginary);

};

/**
 * Rounds to the nearest whole number the real and imaginary parts of a complex number and returns it
 * @method round
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.round = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = Math.round(complex.real);
  var imaginary = Math.round(complex.imaginary);

  return new Complex(real, imaginary);

};

/**
 * Returns the square of a complex number
 * @method square
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.square = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = (complex.real * complex.real) - (complex.imaginary * complex.imaginary);
  var imaginary = 2 * complex.real * complex.imaginary;

  return new Complex(real, imaginary);
};

// DeMoivre's Theorem
/**
 * Uses DeMoivre's Theorem to convert a complex number to its polar form and returns it
 * @method polar
 * @static
 * @param r {Number} 
 * @param t {Number}
 * @return {Complex} An instance of the Complex class
 */
Complex.polar = function(r, t) {

  return new Complex(r * Math.cos(t), r * Math.sin(t));

};

/**
 * Returns a complex number raised to a real power
 * @method pow
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @param exp {Number} The exponent
 * @return {Complex} An instance of the Complex class
 */
Complex.pow = function(num, exp) {

  var complex;
  complex = Complex.transform(num);

  return Complex.polar(Math.pow(complex.magnitude, exp), complex.tangent * exp);

};

/**
 * Returns the square root of a complex number
 * @method sqrt
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.sqrt = function(num) {

  var complex;
  complex = Complex.transform(num);

  return complex.pow(0.5);

};

/**
 * Returns natural logarithm of a complex number
 * @method log
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.log = function(num){

  var complex;
  complex = Complex.transform(num);

  return new Complex(Math.log(complex.magnitude), complex.tangent);

};

/**
 * Returns the constant e raised to a complex power
 * @method exp
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 * @example
 *    // e^(21+33i)
 *    var c = new Complex(21,33);
 *    Complex.exp(c);
 */
Complex.exp = function(num) {

  var complex;
  complex = Complex.transform(num);

  return complex.imaginary === 0 ? Complex.E.pow(complex.real) : Complex.polar(Math.exp(complex.real), complex.imaginary);

};


// Trigonometric Functions

// formula: tan(c) = (e^(ci)-e^(-ci))/(i(e^(ci)+e^(-ci)))
/**
 * Returns the tangent (in radians) of the angle formed by the real and imaginary parts of a complex number
 * formula: tan(c) = (e^(ci)-e^(-ci))/(i(e^(ci)+e^(-ci)))
 * @method tan
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.tan = function(num) {

  var complex;
  complex = Complex.transform(num);

  var ci = complex.multiply(Complex.I);
  var pos = Complex.exp(ci);
  var neg = Complex.exp(Complex.negate(ci));

  return pos.subtract(neg).divide(pos.add(neg).multiply(Complex.I));

};

// formula: sin(c) = (e^(ci)-e^(-ci))/(2i)
/**
 * Returns the sine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * formula: sin(c) = (e^(ci)-e^(-ci))/(2i)
 * @method sin
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.sin = function(num) {

  var complex;
  complex = Complex.transform(num);

  var ci = complex.multiply(Complex.I);

  return Complex.exp(ci).subtract(Complex.exp(Complex.negate(ci))).divide(new Complex(0, 2));

};

// formula: cos(c) = (e^(ci)+e^(-ci))/2
/**
 * Returns the cosine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * formula: cos(c) = (e^(ci)+e^(-ci))/2
 * @method cos
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.cos = function(num) {

  var complex;
  complex = Complex.transform(num);

  var ci = complex.multiply(Complex.I);

  return Complex.exp(ci).add(Complex.exp(Complex.negate(ci))).divide(new Complex(2, 0));

};

// formula: arctan(c) = i/2 log((i+x)/(i-x))
/**
 * Returns the arc tangent (in radians) of the angle formed by the real and imaginary parts of a complex number
 * arctan(c) = i/2 log((i+x)/(i-x))
 * @method atan
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.atan = function(num) {

  var complex;
  complex = Complex.transform(num);

  return Complex.I.multiply(Complex.log(Complex.I.add(complex).divide(Complex.I.subtract(complex)))).divide(new Complex(2, 0));

};

// formula: arcsin(c) = -i*log(ci+sqrt(1-c^2))
/**
 * Returns the arc sine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method asin
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.asin = function(num) {

  var complex;
  complex = Complex.transform(num);

  return Complex.NEG_I.multiply(Complex.log(complex.multiply(Complex.I).add(Complex.sqrt(Complex.ONE.subtract(complex.pow(2))))));

};

// formula: arccos(c) = i*log(c-i*sqrt(1-c^2))
/**
 * Returns the arc cosine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * formula: arccos(c) = i*log(c-i*sqrt(1-c^2))
 * @method acos
 * @static
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.acos = function(num) {

  var complex;
  complex = Complex.transform(num);

  return Complex.I.multiply(Complex.log(complex.add(Complex.NEG_I.multiply(Complex.sqrt(Complex.ONE.subtract(complex.pow(2)))))));

};

/**
 * Returns a random complex number
 * @method random
 * @static
 * @return {Complex} An instance of the Complex class
 */
Complex.random = function () {
  return new Complex(Math.random(), Math.random());
};

/**
 * Returns the lowest complex number
 * @method min
 * @static
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c1 = new Complex(23,5);
 *    var c2 = new Complex(12,6);
 *    var c3 = new Complex(2,33);
 *    Complex.min(c1,c2,c3);
 */
Complex.min = function() {

  var mags = [];
  var cs = [];

  for (var i = 0; i < arguments.length; i++) {
    cs.push(arguments[i]);
    mags.push(arguments[i].magnitude);
  }

  var min = Math.min.apply(Math, mags);
  return cs[mags.indexOf(min)];

};

/**
 * Returns the highest complex number
 * @method max
 * @static
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c1 = new Complex(23,5);
 *    var c2 = new Complex(12,6);
 *    var c3 = new Complex(2,33);
 *    Complex.max(c1,c2,c3);
 */
Complex.max = function() {

  var mags = [];
  var cs = [];

  for (var i = 0; i < arguments.length; i++) {
    cs.push(arguments[i]);
    mags.push(arguments[i].magnitude);
  }

  var max = Math.max.apply(Math, mags);
  return cs[mags.indexOf(max)];

};

// Non static methods (internal use of static methods)

/**
 * Adds two complex numbers together and returns the result
 * @method add
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c = new Complex(23,64);
 *    var d = new Complex(12,10);
 *    // adds d to c
 *    c.add(d);
 */
Complex.prototype.add = function(num) {
  return Complex.add(this, num);
};

/**
 * Subtracts a complex number from another and returns the result
 * @method subtract
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c = new Complex(23,64);
 *    var d = new Complex(12,10);
 *    // subtract d from c
 *    c.subtract(d);
 */
Complex.prototype.subtract = function(num) {
  return Complex.subtract(this, num);
};

/**
 * Returns the product of two complex numbers together
 * @method multiply
 * @param num {Complex} An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c = new Complex(23,64);
 *    var d = new Complex(12,10);
 *    // multiplies d and c
 *    c.multiply(d);
 */
Complex.prototype.multiply = function(num) {
  return Complex.multiply(this, num);
};

/**
 * Returns the division of a complex number by another
 * @method divide
 * @param num {Complex} The quotient. An instance of the Complex Class
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.divide = function(num) {
  return Complex.divide(this, num);
};

/**
 * Negates a complex number and returns it
 * @method negate
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.negate = function() {
  return Complex.negate(this);
};

/**
 * Returns the absolute value of a complex number
 * @method abs
 * @return {Number} The absolute value
 * @example
 *    var c = new Complex(23,64);
 *    // returns the absolute value of c
 *    c.abs();
 */
Complex.prototype.abs = function() {
  return Complex.abs(this);
};

/**
 * Rounds down the real and imaginary parts of a complex number and returns it
 * @method floor
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.floor = function() {
  return Complex.floor(this);
};

/**
 * Rounds up the real and imaginary parts of a complex number and returns it
 * @method ceil
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.ceil = function() {
  return Complex.ceil(this);
};

/**
 * Rounds to the nearest whole number the real and imaginary parts of a complex number and returns it
 * @method round
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.round = function() {
  return Complex.round(this);
};

/**
 * Returns the square of a complex number
 * @method square
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.square = function() {
  return Complex.square(this);
};

/**
 * Returns a complex number raised to a real power
 * @method pow
 * @param exp {Number} The exponent
 * @return {Complex} An instance of the Complex class
 * @example
 *    var c = new Complex(23,64);
 *    // adds c raised to the power of 4
 *    c.pow(4);
 */
Complex.prototype.pow = function(exp) {
  return Complex.pow(this, exp);
};

/**
 * Returns the square root of a complex number
 * @method sqrt
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.sqrt = function() {
  return Complex.sqrt(this);
};

/**
 * Returns natural logarithm of a complex number
 * @method log
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.log = function() {
  return Complex.log(this);
};

/**
 * Returns the constant e raised to a complex power
 * @method exp
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.exp = function() {
    return Complex.exp(this);
};

/**
 * Returns the tangent (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method tan
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.tan = function() {
  return Complex.tan(this);
};

/**
 * Returns the sine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method sin
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.sin = function() {
  return Complex.sin(this);
};

/**
 * Returns the cosine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method cos
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.cos = function() {
  return Complex.cos(this);
};

/**
 * Returns the arc tangent (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method atan
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.atan = function() {
  return Complex.atan(this);
};

/**
 * Returns the arc sine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method asin
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.asin = function() {
  return Complex.asin(this);
};

/**
 * Returns the arc cosine (in radians) of the angle formed by the real and imaginary parts of a complex number
 * @method acos
 * @return {Complex} An instance of the Complex class
 */
Complex.prototype.acos = function() {
  return Complex.acos(this);
};

/**
 * Returns a complex number in the form a + bi
 * @method toString()
 * @return {String} An instance of the Complex class
 * @example
 *    // returns -11+4i
 *    var c = new Complex(-11,4);
 */
Complex.prototype.toString = function() {

  var r = (this.real % 1 == 0) ? this.real.toString() : this.real.toFixed(4).toString();
  var i = (this.imaginary % 1 == 0) ? this.imaginary.toString() : this.imaginary.toFixed(4).toString();
  if (this.imaginary > 0 || this.imaginary == 0)
    i = "+" + i;

  return r + i;

};

if (typeof module !== 'undefined' && module !== null && module.exports)
  module.exports = Complex;
else
  Math.Complex = Complex;
