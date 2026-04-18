/**
 * middleware/validateTask.js
 * Express middleware for validating task-related request bodies.
 * Keeps validation logic out of controllers.
 */

import { VALID_STATUSES } from "../constants/status.js";

/**
 * Validates POST /tasks — requires a non-empty title string.
 */

export const validateCreateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required and must be a non-empty string.",
    });
  }
  next();
};

/**
 * Validates PUT /tasks/:id — requires status to be "todo" or "done".
 */
export const validateUpdateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "Status is required." });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${VALID_STATUSES.join(", ")}.`,
    });
  }
  next();
};