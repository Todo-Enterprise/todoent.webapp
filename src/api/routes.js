const express = require('express');
const db = require('../services/dal');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${Date.now()}]: ${res}`);
  next();
});

router.get('/', (req, res) => {
  res.render('index', { tasks: db.getTasks() });
});

module.exports = (app) => {
  app.use('', router);
};
