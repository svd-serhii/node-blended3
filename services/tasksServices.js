const { Task } = require("../models/Task");
const { HttpError } = require("../utils/HttpError");

const getTasksService = async (page, limit) => {
  const skip = (page - 1) * limit;
  const tasks = await Task.find().skip(skip).limit(limit);
  return tasks;
};

const getTaskService = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new HttpError(404, "This task does not exist");
  }
  return task;
};

const createTaskService = async (body) => {
  const newTask = await Task.create(body);
  return newTask;
};

const updateTaskService = async (taskId, body) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });
  if (!updatedTask) {
    throw new HttpError(404, "This task does not exist");
  }
  return updatedTask;
};

const deleteTaskService = async (taskId) => {
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    throw new HttpError(404, "This task does not exist");
  }

  return { id: taskId };
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
