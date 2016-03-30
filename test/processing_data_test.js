var assert = require("assert");
var processing = require("../processing_data.js");
var fs = require("fs");



describe("For the first round of data processing,", function() {

  it('I should break down the csv files into a object of product details', function() {

    var result = processing.productObject('./files/week1.csv', 'utf8');

    assert.deepEqual(result[0], {
      day: 'Sunday',
      date: '1-Feb',
      product: 'Milk 1l',
      quantity: 3,
      price: 'R10.00'
    });
  });




  it('I should find the most popular product', function() {

    var result = processing.popularProducts('./files/week1.csv', 'utf8');
    assert.equal(result, 'Coke 500ml');
  });

});
