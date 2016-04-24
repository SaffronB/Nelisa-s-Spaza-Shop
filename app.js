var processing_data = require ('./processing_data.js'),
    handlebars = require ('handlebars'),
    fs = require('fs'),
    express = require('express'),
    exphbs  = require('express-handlebars');


// Templates
var templates = require('./templates.js');

// Server
app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Server Routes
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/purchases/:week_name', function(req, res){
  res.render('');
});

app.get('/sales', function(req, res){
  res.render('sales');
});

// Any colon before would turn it into a variable
app.get('/sales/:week_name', function(req, res){
  var fileName = './files/week'+req.params.week_name+'.csv';
  var popular = processing_data.popularProducts(fileName);
  var leastPopular = processing_data.leastPopularProducts(fileName);

  var output = processing_data.productObject(fileName, 'utf8');
  var categoryLinkedProducts = processing_data.productCategory('./files/categories.csv');
  var quantitiesOfProducts = processing_data.totalProductQuantities('./files/categories.csv', output);
  var quantitiesAnd = processing_data.quantitiesLinkCategories(('./files/categories.csv', 'utf8'), categoryLinkedProducts, quantitiesOfProducts);

  var popularCategories = processing_data.popularCategories(fileName, quantitiesAnd);
  var leastPopularCategories = processing_data.leastPopularCategories(fileName, quantitiesAnd);

  var data = {
    number: req.params.week_name,
    popular: popular,
    leastPopular: leastPopular,
    popularCategories: popularCategories,
    leastPopularCategories: leastPopularCategories
  };

  res.render('week', data);
});

var server = app.listen(3000);  

// var weeks = 4;
// for(var i=1; i<=weeks; i++){
//   var fileName = './files/week'+i+'.csv';
//   var popular = processing_data.popularProducts(fileName);
//   var leastPopular = processing_data.leastPopularProducts(fileName);
//
//   var output = processing_data.productObject(fileName, 'utf8');
//   var categoryLinkedProducts = processing_data.productCategory('./files/categories.csv');
//   var quantitiesOfProducts = processing_data.totalProductQuantities('./files/categories.csv', output);
//   var quantitiesAnd = processing_data.quantitiesLinkCategories(('./files/categories.csv', 'utf8'), categoryLinkedProducts, quantitiesOfProducts);
//
//   var popularCategories = processing_data.popularCategories(fileName, quantitiesAnd);
//   var leastPopularCategories = processing_data.leastPopularCategories(fileName, quantitiesAnd);
//
//   var content = templates.module.htmlHeader +
//   templates.module.header+
//   '<h1>{{popular}}</h1>'+
//   '<h1>{{leastPopular}}</h1>'+
//   '<h1>{{popularCategories}}</h1>'+
//   '<h1>{{leastPopularCategories}}</h1>'; // Template String
//
//   var data = {
//     number: i,
//     popular: popular,
//     leastPopular: leastPopular,
//     popularCategories: popularCategories,
//     leastPopularCategories: leastPopularCategories
//   };
//
//   var template = handlebars.compile(content);
//   var html = template(data);
//
//   fs.writeFile('reportweek'+i+'.html', html, function (err) {
//     if (err) return console.log(err);
//   });
// }
//
// //index Main Page
// var indexContent = templates.module.htmlHeader +
// "<div class='container'><div class='name'>Nelisa's Spaza Shop</div></div>" +
// '{{#each weeks}}' +
//   '<a href="reportweek{{this}}.html">Week {{this}}</a>'+
// '{{/each}}'; // Template String
//
// var template = handlebars.compile(indexContent);
// var indexData = {
//   weeks: [1,2,3,4]
// };
// var indexHtml = template(indexData);
//
// fs.writeFile('index.html', indexHtml, function (err) {
//   if (err) return console.log(err);
// });
