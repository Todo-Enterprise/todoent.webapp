import './bulma';
import Note from './note';

// import '../styles/bulma.scss';
import '../styles/notes.scss';

import '../styles/styles.css';
import '../styles/helpers.scss';

// Need to remove jquery

function createNewNote() {
  const $noteContainer = $('#note-template .note-container').clone();
  $noteContainer.appendTo('.notes-list');
  $noteContainer.removeClass('is-hidden');
  $noteContainer.addClass('js-is-transient');
  return new Note($noteContainer);
}

$(document).on('focus', '.note-container input', (e) => {
  const note = new Note($(e.currentTarget).closest('.note-container'));
  if (note.isOpened()) return;

  const openedContainer = $('.note-container.is-opened');
  if (openedContainer.length) {
    const openedNote = new Note(openedContainer);
    openedNote.save();
    openedNote.hide();
  }

  note.show();
});

$(document).on('click', '.note-container:not(.is-done) .checkmark', (e) => {
  const note = new Note($(e.currentTarget).closest('.note-container'));
  note.complete();
});

$(document).on('click', '.note-container .save-btn', (e) => {
  const note = new Note($(e.currentTarget).closest('.note-container'));
  note.hide();
  note.save();
});

$(document).on('click', '.add-note-btn', (e) => {
  if ($('.note-container.js-is-transient').length) return;

  const openedContainer = $('.note-container.is-opened');
  if (openedContainer.length) {
    const openedNote = new Note(openedContainer);
    openedNote.save();
    openedNote.hide();
  }

  const note = createNewNote();
  note.focusTitle();
});
