var assert = require("assert");
var nelisa = require("../nelisa.js");
var fs = require("fs");





describe("For the first round of data processing,", function() {


  it('I should create an object with the information of each product', function() {

    var contents = fs.readFileSync('./files/week1.csv', 'utf8');
    var result = nelisa.originalArray(contents);


    assert.deepEqual(result[0], {
      day: 'Sunday',
      date: '1-Feb',
      product: 'Milk 1l',
      quantity: 3,
      price: 'R10.00'
    });



  });

  it('I should create a unique product array', function() {
    var contents = fs.readFileSync('./files/week1.csv', 'utf8');
    var result = nelisa.uniqueProducts(nelisa.originalArray(contents));
    assert.deepEqual(result[1], 'Imasi');

  });

  it('I should find the most popular product', function() {
    var contents = fs.readFileSync('./files/week1.csv', 'utf8');
    var result = nelisa.popularProducts(nelisa.originalArray(contents));
    assert.equal(result, 'Coke 500ml');
  });

});
