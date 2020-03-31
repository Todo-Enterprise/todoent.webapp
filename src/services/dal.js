const memoryDatabase = {
  tasks: [
    {
      id: 0, name: 'Test task', isDone: false, addedAt: '2020.01.01',
    },
    {
      id: 0, name: 'Test done task', isDone: true, addedAt: '2020.01.01',
    },
  ],
};

function Task(name) {
  this.id = 0;
  this.name = name;
  this.isDone = false;
  this.addedAt = '2020.01.01';
}

function getTasks() {
  return memoryDatabase.tasks;
}

function addTask(name) {
  const constructionTask = new Task(name);
  memoryDatabase.tasks.push(constructionTask);
}

function removeTask(/* taskName */) {
  // not implemented
}

module.exports = {
  getTasks,
  addTask,
  removeTask,
};
