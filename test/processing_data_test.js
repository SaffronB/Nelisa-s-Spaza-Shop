var assert = require("assert");
var processing_data = require("../processing_data.js");
var fs = require("fs");



var output = processing_data.productObject('./files/week1.csv', 'utf8');
var categoryLinkedProducts = processing_data.productCategory('./files/categories.csv', 'utf8');
var quantitiesOfProducts = processing_data.totalProductQuantities(('./files/categories.csv', 'utf8'), output);
var quantitiesAnd = processing_data.quantitiesLinkCategories(('./files/categories.csv', 'utf8'), categoryLinkedProducts, quantitiesOfProducts);
var popCat = processing_data.popularCategories(('./files/categories.csv', 'utf8'), quantitiesAnd);
var purchases = processing_data.productPurchases('./files/purchases.csv', 'utf8');
var profitprofit = processing_data.profits(('./files/week1.csv'), output, purchases);
var cP = processing_data.categoryProfits(('./files/week1.csv'), profitprofit, categoryLinkedProducts);

describe("For the first round of data processing,", function() {

  it("I should break down the weekly csv sales files into an object with the product's details", function() {

    var result = processing_data.productObject('./files/week1.csv', 'utf8');

    assert.deepEqual(result[0], {
      day: 'Sunday',
      date: '1-Feb',
      product: 'Milk 1l',
      quantity: 3,
      price: 'R10.00'
    });
  });



  it('I should find the most popular product', function() {

    var result = processing_data.popularProducts('./files/week1.csv', 'utf8');
    assert.equal(result, 'Coke 500ml');
  });



  it('I should find the least popular product', function() {

    var result = processing_data.leastPopularProducts('./files/week1.csv', 'utf8');
    assert.equal(result, 'Shampoo 1 litre');
  });



  it("I should break down the categories csv file into a object that includes the categories' details", function() {

    var result = processing_data.productCategory('./files/categories.csv', 'utf8');

    assert.deepEqual(result, {
      "Apples": "Fruit",
      "Bananas": "Fruit",
      "Bread": "Bakery",
      "Chakalaka Can": "Cans",
      "Coke 500ml": "Soda",
      "Cream Soda 500ml": "Soda",
      "Fanta 500ml": "Soda",
      "Gold Dish Vegetable Curry Can": "Cans",
      "Heart Chocolates": "Seasonal",
      "Imasi": "Starch",
      "Iwisa Pap 5kg": "Starch",
      "Milk 1l": "Dairy",
      "Mixed Sweets": "Sweets",
      "Rose (plastic)": "Seasonal",
      "Shampoo 1 litre": "Toiletries",
      "Soap Bar": "Toiletries",
      "Top Class Soy Mince": "Starch",
      "Valentine Cards": "Seasonal"
    });
  });

  it("I should add total quantites up of each product", function() {

    var result = processing_data.totalProductQuantities(('./files/categories.csv', 'utf8'), output)

    assert.deepEqual(result, {
      'Milk 1l': 39,
      'Imasi': 30,
      'Bread': 45,
      'Chakalaka Can': 23,
      'Gold Dish Vegetable Curry Can': 17,
      'Fanta 500ml': 33,
      'Coke 500ml': 54,
      'Cream Soda 500ml': 22,
      'Iwisa Pap 5kg': 17,
      'Top Class Soy Mince': 22,
      'Shampoo 1 litre': 3,
      'Soap Bar': 12,
      'Bananas - loose': 47,
      'Apples - loose': 36,
      'Mixed Sweets 5s': 49
    });

  });

  it("I should link the products from the categories and those from total Product Quantities ", function() {

    var result = processing_data.quantitiesLinkCategories(('./files/categories.csv', 'utf8'), categoryLinkedProducts, quantitiesOfProducts)

    assert.deepEqual(result, {
      Dairy: 39,
      Starch: 22,
      Bakery: 45,
      Cans: 17,
      Soda: 22,
      Toiletries: 12
    });
  });

  it("I should find the most popular categories", function() {

    var result = processing_data.popularCategories(('./files/categories.csv', 'utf8'), quantitiesAnd)

    assert.deepEqual(result, "Bakery");
  });

  it("I should find the least popular categories", function() {

    var result = processing_data.leastPopularCategories(('./files/categories.csv', 'utf8'), quantitiesAnd);

    assert.equal(result, "Toiletries");
  });

  it("I should create an oject that includes the item and price from the purchases", function() {

    var result = processing_data.productPurchases('./files/purchases.csv', 'utf8')

    assert.deepEqual(result, {
      'Chakalaka Can': 83.5,
      'Coke 500ml': 28,
      'Cream Soda 500ml': 34.5,
      'Fanta 500ml': 44.5,
      'Gold Dish Vegetable Curry Can': 86,
      'Imasi': 177,
      'Iwisa Pap 5kg': 200,
      'Milk 1l': 101,
      'Top Class Soy Mince': 94,
      'Bananas - loose': 8,
      'Apples - loose': 12,
      'Mixed Sweets 5s': 24,
      'Shampoo 1 litre': 260,
      'Soap Bar': 36,
      'Bread': 94,
      'Rose (plastic)': 10,
      'Heart Chocolates': 25,
      'Valentine Cards': 2
    });
  });
  //
  it("I should find the profits per sale", function() {

    var result = processing_data.profits(('./files/week1.csv'), output, purchases);

    assert.deepEqual(result, {
      "Apples - loose": 60,
      "Bananas - loose": 86,
      "Bread": 446,
      "Chakalaka Can": 146.5,
      "Coke 500ml": 323,
      "Cream Soda 500ml": 130.5,
      "Fanta 500ml": 170,
      "Gold Dish Vegetable Curry Can": 67,
      "Imasi": 573,
      "Iwisa Pap 5kg": 310,
      "Milk 1l": 289,
      "Mixed Sweets 5s": 96,
      "Shampoo 1 litre": -170,
      "Soap Bar": 36,
      "Top Class Soy Mince": 170,
    });
  });

  it("I should find the weekly profits and the maximum profitable product", function() {

    var result = processing_data.profitProduct(('./files/week1.csv'), profitprofit);

    assert.equal(result, 'Imasi');
  });

  it("I should find the most profitable category", function() {

    var result = processing_data.categoryProfits(('./files/week1.csv'), profitprofit, categoryLinkedProducts);

    assert.deepEqual(result, {
      Dairy: 289,
      Starch: 1053,
      Bakery: 446,
      Cans: 213.5,
      Soda: 623.5,
      Toiletries: -134
    });
  });

  it("I should find the most profitable category", function() {

    var result = processing_data.mostProfitableCategory(('./files/week1.csv'), cP);

    assert.equal(result, 'Starch');
  });

});
