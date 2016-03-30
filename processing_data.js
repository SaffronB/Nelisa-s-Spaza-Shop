var fs = require("fs");
// var content = fs.readFileSync('./files/week1.csv', 'utf8');


exports.productObject = function(filePath) {
  var content = fs.readFileSync(filePath, 'utf8');

  var lines = content.split("\n");
  var objectArray = [];
  for (var i = 1; i < lines.length - 1; i++) {
    var salesArray = lines[i].split(',');
    var saleObject = {
      day: salesArray[0],
      date: salesArray[1],
      product: salesArray[2],
      quantity: Number(salesArray[3]),
      price: salesArray[4],
    }
    objectArray.push(saleObject);
  }
  return objectArray;


};

exports.popularProducts = function(filePath) {
  var productObject = exports.productObject;
  var objectArray = productObject(filePath);

  var quantityObject = {};

  objectArray.forEach(function(object) {

    if (quantityObject[object.product] === undefined) {
      quantityObject[object.product] = 0;
    }
    quantityObject[object.product] = object.quantity + quantityObject[object.product];
  });

  var productQuantities = [];
  for (var name in quantityObject) {
    productQuantities.push(quantityObject[name]);
  }


  var mostPopular = Math.max.apply(null, productQuantities);

  var popProduct = '';

  for (var name in quantityObject) {

    if (quantityObject[name] == mostPopular) {
      popProduct = name;
    }


  }
    return popProduct;
}


// exports.leastPopularProducts = function(filePath) {
//
//   var productObject = exports.productObject;
//   var object = productObject(filePath);
//
//   var quantityObject = {};
//
//   object.forEach(function(object) {
//
//     if (quantityObject[object.product] === undefined) {
//       quantityObject[object.product] = 0;
//     }
//     quantityObject[object.product] = object.quantity + quantityObject[object.product];
//   });
//
//   var productQuantities = [];
//   for (var name in quantityObject) {
//     productQuantities.push(quantityObject[name]);
//   }
//
//   var leastPopular = Math.min.apply(null, productQuantities);
//   var leastPopProduct = '';
//
//   for (var name in quantityObject) {
//
//     if  (quantityObject[name] == leastPopular)
//     leastPopProduct = name;
//   }
//
//   return leastPopProduct;
//
// };
