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

export default (app) => {
  app.use('', router);
};
