import bodyParser from 'body-parser';
import ejsExpress from 'ejs';

// eslint-disable-next-line no-underscore-dangle
const ejs = ejsExpress.__express;

function configureLogging(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}]: ${req.method} ${req.originalUrl}\n`
        + `Headers: ${JSON.stringify(req.headers, null, 2)} \n`
        + `Body: ${JSON.stringify(req.body, null, 2)} \n`
        + `BodyRaw: ${req.body} \n`);
      next();
    });
  }
}

export default (app, express) => {
  app.set('views', 'dist/templates');
  app.set('view engine', 'ejs');
  app.use('/dist', express.static('dist'));
  app.engine('.ejs', ejs);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  configureLogging(app);
};
