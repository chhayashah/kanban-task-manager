/**
 * routes/taskRoutes.js
 * Defines all /tasks endpoints.
 * Only routing and middleware wiring lives here — no handler logic.
 */

import express from "express";
import {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";
import {
  validateCreateTask,
  validateUpdateStatus,
} from "../middleware/validateTask.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", validateCreateTask, createTask);
router.put("/:id", validateUpdateStatus, updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;