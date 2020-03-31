const memoryDatabase = {
  tasks: [],
};

function Task(name) {
  this.id = false;
  this.name = name;
  this.isDone = false;
  this.addedAt = false;
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
  Task,
  getTasks,
  addTask,
  removeTask,
};
