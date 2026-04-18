/**
 * constants/status.js
 * Single source of truth for valid task status values.
 * Use these instead of hardcoding strings anywhere in the app.
 */

export const TASK_STATUS = {
  TODO: "todo",
  DONE: "done",
};

export const VALID_STATUSES = Object.values(TASK_STATUS);
