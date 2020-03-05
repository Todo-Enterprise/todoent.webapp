var express = require('express');
var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.set('views', __dirname + '/../public/templates');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { name: 'World'});
});

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
