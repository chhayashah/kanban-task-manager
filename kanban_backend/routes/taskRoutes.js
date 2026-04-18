/**
 * routes/taskRoutes.js
 * Defines all /tasks endpoints.
 * Only routing and middleware wiring lives here — no handler logic.
 */

const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const {
  validateCreateTask,
  validateUpdateStatus,
} = require("../middleware/validateTask");

// GET    /tasks         → fetch all tasks
router.get("/", getAllTasks);

// POST   /tasks         → create a new task
router.post("/", validateCreateTask, createTask);

// PUT    /tasks/:id     → update task status
router.put("/:id", validateUpdateStatus, updateTaskStatus);

// DELETE /tasks/:id     → delete a task
router.delete("/:id", deleteTask);

module.exports = router;
