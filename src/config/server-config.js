module.exports = function (app, express) {
  app.set('views', `${__dirname}/../../public/templates`);
  app.set('view engine', 'ejs');
  app.use('/public', express.static(`${__dirname}/../../public`));
};
