/**
 * controllers/taskController.js
 * Handler functions for each task endpoint.
 * Controllers receive validated requests, talk to the model, and send responses.
 * No business-logic details or array manipulation lives here.
 */

const TaskStore = require("../models/taskStore");

/**
 * GET /tasks
 * Returns all tasks.
 */
const getAllTasks = (req, res, next) => {
  try {
    const tasks = TaskStore.getAll();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /tasks
 * Creates a new task with status "todo".
 * Body: { title: string }
 */
const createTask = (req, res, next) => {
  try {
    const { title } = req.body;
    const task = TaskStore.create(title);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /tasks/:id
 * Updates the status of a task.
 * Body: { status: "todo" | "done" }
 */
const updateTaskStatus = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task ID." });
    }

    const { status } = req.body;
    const updated = TaskStore.updateStatus(id, status);

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: `Task with ID ${id} not found.` });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /tasks/:id
 * Deletes a task by ID.
 */
const deleteTask = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid task ID." });
    }

    const deleted = TaskStore.delete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: `Task with ID ${id} not found.` });
    }

    res
      .status(200)
      .json({ success: true, message: `Task ${id} deleted successfully.` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, createTask, updateTaskStatus, deleteTask };
