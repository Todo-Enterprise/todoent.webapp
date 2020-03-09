const memoryDatabase = {
  tasks: ['Add scripts', 'Add react', 'Add input field', 'Wash legs'],
};

function getTasks() {
  return memoryDatabase.tasks;
}

function addTask(taskName) {
  memoryDatabase.tasks.push(taskName);
}

function removeTask(/* taskName */) {
  // not implemented
}


module.exports = {
  getTasks,
  addTask,
  removeTask,
};
