const memoryDatabase = {
  notes: {},
};

let lastId = 0;

memoryDatabase.notes[lastId] = {
  id: 0, title: 'Test note', content: 'Нужно, чтоб отображались нормально теги, как в карточке ниже', isDone: false, addedAt: '2020.01.01',
};
lastId += 1;
memoryDatabase.notes[lastId] = {
  id: 1, title: 'Test done note', content: '1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a><time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>', isDone: true, addedAt: '2020.01.01',
};
lastId += 1;

function Note(title, content) {
  this.id = lastId;
  this.title = title;
  this.content = content;
  this.isDone = false;
  this.addedAt = '2020.01.01';
}

function getAllNotes() {
  return Object.values(memoryDatabase.notes);
}

function insertNote(note) {
  const constructedNote = new Note(note.title, note.content);
  memoryDatabase.notes[lastId] = constructedNote;
  lastId += 1;

  return constructedNote;
}

function getNote(id) {
  return memoryDatabase.notes[id];
}

function saveNote(id, note) {
  memoryDatabase.notes[id] = note;
}

function deleteNote(/* noteName */) {
  // not implemented
}

export default {
  getNote,
  getAllNotes,
  insertNote,
  saveNote,
  deleteNote,
};
