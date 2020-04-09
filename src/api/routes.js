const express = require('express');
const db = require('../services/dal');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${Date.now()}]: ${res}`);
  next();
});

router.post('/add-task', (req, res) => {
  db.addTask(req.body.task);
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('index', { tasks: db.getTasks() });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = (app) => {
  app.use('', router);
};
