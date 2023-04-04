const fs = require("fs/promises");

const { HttpError } = require("../utils/HttpError");

const crypto = require("crypto");

const path = require("path");

const db = path.join(process.cwd(), "db", "tasks.json");

const getTasksService = async () => {
  const rawData = await fs.readFile(db);
  const parsedData = JSON.parse(rawData);
  return parsedData;
};

const getTaskService = async (taskId) => {
  const tasks = await getTasksService();
  const task = tasks.find((item) => String(item.id) === String(taskId));
  if (!task) {
    throw new HttpError(404, "This task does not exist");
  }
  return task;
};

const createTaskService = async (body) => {
  const tasks = await getTasksService();
  const newTask = {
    id: crypto.randomUUID(),
    title: body.title,
    completed: body.completed,
  };
  tasks.push(newTask);
  await fs.writeFile(db, JSON.stringify(tasks, null, 2));
  return newTask;
};

const updateTaskService = async (taskId, body) => {
  const tasks = await getTasksService();
  const task = tasks.find((item) => String(item.id) === String(taskId));
  if (!task) {
    throw new HttpError(404, "This task does not exist");
  }

  task.title = body.title;
  task.completed = body.completed;

  await fs.writeFile(db, JSON.stringify(tasks, null, 2));
  return task;
};

const deleteTaskService = async (taskId) => {
  const tasks = await getTasksService();
  const filteredTasks = tasks.filter((item) => String(item.id) !== String(taskId));
  await fs.writeFile(db, JSON.stringify(filteredTasks, null, 2));
  if (tasks.length === filteredTasks.length) {
    throw new HttpError(404, "This task does not exist");
  }
  return taskId;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
