const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/tasksServices");

const { catchAsync } = require("../utils/catchAsync");

let getTasks = async (req, res) => {
  const tasks = await getTasksService();
  res.status(200).json(tasks);
};

getTasks = catchAsync(getTasks);

let getTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskService(taskId);
  res.status(200).json(task);
});

let createTask = async (req, res, next) => {
  const createTask = await createTaskService(req.body);
  res.status(201).json(createTask);
};

createTask = catchAsync(createTask);

let updateTask = async (req, res, next) => {
  const { taskId } = req.params;
  const updatedTask = await updateTaskService(taskId, req.body);
  res.status(200).json(updatedTask);
};

updateTask = catchAsync(updateTask);

let deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  const deletedTaskId = await deleteTaskService(taskId);
  res.status(200).json({ id: taskId });
};

deleteTask = catchAsync(deleteTask);

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
