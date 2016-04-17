var fs = require("fs");


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
      // console.log(saleObject);
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

exports.leastPopularProducts = function(filePath) {

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
  var leastPopular = Math.min.apply(null, productQuantities);

  var leastPopProduct = '';

  for (var name in quantityObject) {

    if (quantityObject[name] == leastPopular) {
      leastPopProduct = name;
    }
  }
  return leastPopProduct;
};

exports.productCategory = function(filePath) {
  var content = fs.readFileSync(filePath, 'utf8');
  var lines = content.split("\n");
  var categoryObject = {};

  for (var i = 1; i < lines.length - 1; i++) {
    var salesArray = lines[i].split(',');
    var product = salesArray[0];
    var category = salesArray[1];
    categoryObject[product] = category;
  };
  console.log(categoryObject);
  return categoryObject;
}

exports.totalProductQuantities = function(filePath, objectArray) {
  var productQuantities = {};

  objectArray.forEach(function(object) {

    if (!productQuantities.hasOwnProperty(object.product)) {
      productQuantities[object.product] = object.quantity;
    } else {
      productQuantities[object.product] += object.quantity;
    }
  });
  return productQuantities;
};

exports.quantitiesLinkCategories = function(filePath, categoryObject, productQuantities) {
  var categoryQuantities = {};

  for (var product in categoryObject) {
    for (var product2 in productQuantities) {

      if (product === product2) {
        if (!categoryQuantities.hasOwnProperty(product)) {
          categoryQuantities[categoryObject[product]] = productQuantities[product2];
        } else {
          categoryQuantities[categoryObject[product]] += productQuantities[product2];
        }
      }
    }
  }
  return categoryQuantities;
};


exports.popularCategories = function(filePath, categoryQuantities) {

  var categoryQuantityArray = [];
  for (var category in categoryQuantities) {
    categoryQuantityArray.push(categoryQuantities[category])
  }
  var mostPopular = Math.max.apply(null, categoryQuantityArray);
  var popCat = '';

  for (var name in categoryQuantities) {
    if (categoryQuantities[name] == mostPopular) {
      popCat = name;
    }
  }

  return popCat;
};

exports.leastPopularCategories = function(filePath, categoryQuantities) {
  var categoryQuantityArray = [];
  for (var category in categoryQuantities) {
    categoryQuantityArray.push(categoryQuantities[category])
  }
  var leastPopular = Math.min.apply(null, categoryQuantityArray);
  var leastPopCat = '';

  for (var name in categoryQuantities) {
    if (categoryQuantities[name] == leastPopular) {
      leastPopCat = name;
    }
  }
  return leastPopCat;
};

exports.productPurchases = function(filePath) {
  var content = fs.readFileSync(filePath, 'utf8');
  var lines = content.split("\n");
  var purchaseObject = {};

  for (var i = 1; i < lines.length - 1; i++) {
    var purchaseArray = lines[i].split(';');
    var item = purchaseArray[2];
    var cost = Number(purchaseArray[4].replace('R', '').replace(',', '.'));

    if (!purchaseObject.hasOwnProperty(item)) {
      purchaseObject[item] = cost;
    } else {
      purchaseObject[item] += cost;
    }
  };
  return purchaseObject;
};

exports.profits = function(filePath, saleObject, purchaseObject) {

  var sales = {};

  saleObject.forEach(function(saleInfo) {
    var numbers = Number(saleInfo.price.replace('R', ''));
    var item = saleInfo.product

    if (!sales.hasOwnProperty(item)) {
      sales[item] = numbers * saleInfo.quantity;
    } else {
      sales[item] += numbers * saleInfo.quantity;
    }
  });

  var profitMap = {};

  for (var product in sales) {
    profitMap[product] = (sales[product] - purchaseObject[product])
  }
  console.log(profitMap);
  return profitMap;
};


exports.profitProduct = function(filePath, profits) {
  var profitNumber = 0;
  var profitableProduct = '';

  for (var productName in profits) {
    if (profits[productName] > profitNumber) {
      profitableProduct = productName;
      profitNumber = profits[productName];
    }
  }
  return profitableProduct;
};

exports.categoryProfits = function(filePath, profitMap, categoryObject) {

  var totalCategoryProfits = {};

  for (var product in categoryObject) {
    for (var product2 in profitMap) {

      if (product === product2) {
        if (!totalCategoryProfits.hasOwnProperty(categoryObject[product])) {
          totalCategoryProfits[categoryObject[product]] = profitMap[product2];
        } else {
          totalCategoryProfits[categoryObject[product]] += profitMap[product2];
        }
      }
    }
  }
  return totalCategoryProfits;
};

exports.mostProfitableCategory = function(filepath, categoryProfits) {
  var categoryProfitsArray = [];

  for (var category in categoryProfits) {
    categoryProfitsArray.push(categoryProfits[category])
  }


  var mostProfitable = Math.max.apply(null, categoryProfitsArray);
  var profitCat = '';

  for (var name in categoryProfits) {
    if (categoryProfits[name] == mostProfitable) {
      profitCat = name;
    }
  }
  return profitCat;
};
