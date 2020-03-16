const bodyParser = require('body-parser');

module.exports = function (app, express) {
  app.set('views', `${__dirname}/../../public/templates`);
  app.set('view engine', 'ejs');
  app.use('/public', express.static(`${__dirname}/../../public`));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
