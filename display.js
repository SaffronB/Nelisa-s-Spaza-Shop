var assert = require("assert");
var processing_data = require("./processing_data.js");
var fs = require("fs");

var contentW1 = ('./files/week1.csv');
var contentW2 = ('./files/week2.csv');
var contentW3 = ('./files/week3.csv');
var contentW4 = ('./files/week4.csv');


//most popular products per week
var popularW1 = processing_data.popularProducts (contentW1);
console.log (popularW1);
var popularW2 = processing_data.popularProducts (contentW2);
console.log (popularW2);
var popularW3 = processing_data.popularProducts (contentW3);
console.log (popularW3);
var popularW4 = processing_data.popularProducts (contentW4);
console.log (popularW4);

//least popular products per week
var notPopularW1 = processing_data.leastPopularProducts (contentW1);
console.log (notPopularW1);
var notPopularW2 = processing_data.leastPopularProducts (contentW2);
console.log (notPopularW2);
var notPopularW3 = processing_data.leastPopularProducts (contentW3);
console.log (notPopularW3);
var notPopularW4 = processing_data.leastPopularProducts (contentW4);
console.log (notPopularW4);
