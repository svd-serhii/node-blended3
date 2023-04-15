const express = require("express");

const { getTasks, getTask, createTask, updateTask, deleteTask } = require("../controllers/tasksControllers");

const { validateBody } = require("../utils/validateBody");

const { createTaskSchema, updateTaskSchema } = require("../utils/validation/taskValidationSchemas");

// const { catchAsync } = require("../utils/catchAsync");

const router = express.Router();

router.route("/").get(getTasks).post(validateBody(createTask), createTask);

router.route("/:taskId").get(getTask).patch(validateBody(updateTaskSchema), updateTask).delete(deleteTask);

module.exports = { tasksRouter: router };
