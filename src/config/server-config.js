module.exports = function (app) {
  app.set('views', `${__dirname}/../../public/templates`);
  app.set('view engine', 'ejs');
};
