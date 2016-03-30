var assert = require("assert");
var processing = require("../processing_data.js");
var fs = require("fs");



describe("For the first round of data processing,", function() {


  it('I should create an object with the information of each product', function() {

    var result = processing.originalArray('./files/week1.csv');



    assert.deepEqual(result[0], {
      day: 'Sunday',
      date: '1-Feb',
      product: 'Milk 1l',
      quantity: 3,
      price: 'R10.00'
    });



  });

  it('I should create a unique product array', function() {
  
    var result = processing.uniqueProducts(processing.originalArray('./files/week1.csv', 'utf8'));
    assert.deepEqual(result[1], 'Imasi');

  });

  it('I should find the most popular product', function() {

    var result = processing.popularProducts(processing.originalArray('./files/week1.csv', 'utf8'));
    assert.equal(result, 'Coke 500ml');
  });

});
