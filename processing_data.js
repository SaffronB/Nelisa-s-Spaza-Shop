var fs = require("fs");
exports.originalArray = function(filePath) {
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



exports.uniqueProducts = function(objectArray) {

  var uniqueProductList = [];
  var productList = [];
  objectArray.forEach(function(object) {
    productList.push(object.product);
  });

  for (i = 0; i < productList.length; i++) {
    if (uniqueProductList.indexOf(productList[i]) == -1) {
      uniqueProductList.push(productList[i]);
    }
  }

  return uniqueProductList;
};


exports.popularProducts = function(objectArray) {

  var quantityObject = {};

  objectArray.forEach(function(object) {

    if (quantityObject[object.product] === undefined) {
      quantityObject[object.product] = 0;
    }
    quantityObject[object.product] = object.quantity + quantityObject[object.product];
  });
  // console.log(quantityObject);

  var productQuantities = [];
  for (var name in quantityObject) {
    productQuantities.push(quantityObject[name]);
  }
  // console.log(productQuantities);

  var mostPopular = Math.max.apply(null, productQuantities);
  var popProduct = '';

  for (var name in quantityObject) {

    if (quantityObject[name] == mostPopular) {
      popProduct = name;

    }
  }
  return popProduct;
}
