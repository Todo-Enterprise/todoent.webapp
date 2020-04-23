import express from 'express';
import db from '../services/dal';

const router = express.Router();

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

router.get('/logout', (req, res) => {
  res.redirect('/login');
});

router.post('/auth/login', (req, res) => {
  res.redirect('/');
});

export default (app) => {
  app.use('', router);
};
