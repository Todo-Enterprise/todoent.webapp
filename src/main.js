import dotenv from 'dotenv';
import express from 'express';
import routes from './api/routes';
import serverConfig from './config/server-config';

const app = express();

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

serverConfig(app, express);
routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
