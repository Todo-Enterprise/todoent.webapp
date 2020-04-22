const dotenv = require('dotenv');
const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

require('./config/server-config')(app, express);
require('./api/routes')(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
