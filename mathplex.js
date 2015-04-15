/**
 * Copyright (c) 2015 Toni Solarin-Sodara
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * included in all copies or substantial portions of the Software.
 *
 * The above copyright notice and this permission notice shall be
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


function Complex(real, imaginary) {

  this.real = 0;
  this.imaginary = 0;
  this.magnitude = 0;
  
  this.real = (typeof real === 'undefined') ? this.real : parseFloat(real);
  this.imaginary = (typeof imaginary === 'undefined') ? this.imaginary : parseFloat(imaginary);
  this.magnitude = (this.real * this.real) + (this.imaginary * this.imaginary);

}

// Constants
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);
Complex.NEG_I = new Complex(0, -1);
Complex.SQR_I = -1;
Complex.PI = new Complex(Math.PI, 0);
Complex.E = new Complex(Math.E, 0);


// Static Methods
Complex.transform = function(num) {

  var complex;

  complex = (num instanceof Complex) ? num : complex;
  complex = (typeof num === 'number') ? new Complex(num, 0) : num;

  return complex;

};

Complex.add = function(first, second) {

  var firstnum, secondnum;

  firstnum = Complex.transform(first);
  secondnum = Complex.transform(second);

  var real = firstnum.real + secondnum.real;
  var imaginary = firstnum.imaginary + secondnum.imaginary;

  return new Complex(real, imaginary);

};

Complex.multiply = function(first, second) {

  var firstnum, secondnum;

  firstnum = Complex.transform(first);
  secondnum = Complex.transform(second);

  var real = (firstnum.real * secondnum.real) - (firstnum.imaginary * secondnum.imaginary);
  var imaginary = (firstnum.real * secondnum.imaginary) + (firstnum.imaginary * secondnum.real);

  return new Complex(real, imaginary);

};

Complex.negate = function(num) {

  var complex;
  complex = Complex.transform(num);
  return new Complex(-complex.real, -complex.imaginary);

};

Complex.abs = function(num) {

  var complex;
  complex = Complex.transform(num);
  return complex.magnitude;

};

Complex.floor = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = Math.floor(complex.real);
  var imaginary = Math.floor(complex.imaginary);

  return new Complex(real, imaginary);

};

Complex.ceil = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = Math.ceil(complex.real);
  var imaginary = Math.ceil(complex.imaginary);

  return new Complex(real, imaginary);

};

Complex.round = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = Math.round(complex.real);
  var imaginary = Math.round(complex.imaginary);

  return new Complex(real, imaginary);

};

Complex.square = function(num) {

  var complex;
  complex = Complex.transform(num);

  var real = (complex.real * complex.real) - (complex.imaginary * complex.imaginary);
  var imaginary = 2 * complex.real * complex.imaginary;

  return new Complex(real, imaginary);
};