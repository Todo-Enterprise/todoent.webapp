import express from 'express';
import db from '../services/dal';

const router = express.Router();

function withPatchedFields(original, data) {
  const result = {};
  Object.keys(original).forEach((key) => {
    result[key] = (key in original && data[key] !== undefined)
      ? data[key]
      : original[key];
  });

  return result;
}



router.post('/notes', (req, res) => {
  const createdNote = db.insertNote(req.body);
  res.json(createdNote);
});

router.patch('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  const note = db.getNote(noteId);
  const updatedNote = withPatchedFields(note, req.body);
  db.saveNote(noteId, updatedNote);

  res.json(note);
});

router.get('/', (req, res) => {
  res.render('index', {
    currentPage: 'index',
    notes: db.getAllNotes(),
  });
});

router.get('/about', (req, res) => {
  res.render('about', { currentPage: 'about' });
});

router.get('/experiments', (req, res) => {
  res.render('experiments', { currentPage: 'experiments' });
});

router.get('/login', (req, res) => {
  res.render('login', { currentPage: 'login' });
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
