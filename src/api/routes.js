const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${Date.now()}]: ${res}`);
  next();
});

router.get('/', (req, res) => {
  res.render('index', { tasks: ['Add scripts', 'Add react', 'Wash hands', 'Wash legs'] });
});

module.exports = (app) => {
  app.use('', router);
};
