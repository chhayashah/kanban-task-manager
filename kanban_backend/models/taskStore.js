/**
 * models/taskStore.js
 * In-memory "database" for tasks.
 * All CRUD operations live here — controllers never touch the array directly.
 *
 * Shape of each task:
 *   { id: number, title: string, status: "todo" | "done" }
 */

const { generateId } = require("../utils/generateId");
const { TASK_STATUS } = require("../constants/status");

// Seed data so the UI isn't empty on first load
let tasks = [
  {
    id: generateId(),
    title: "Set up project repository",
    status: TASK_STATUS.DONE,
  },
  { id: generateId(), title: "Design API endpoints", status: TASK_STATUS.DONE },
  { id: generateId(), title: "Build React frontend", status: TASK_STATUS.TODO },
  {
    id: generateId(),
    title: "Write README documentation",
    status: TASK_STATUS.TODO,
  },
];

const TaskStore = {
  /** Return a shallow copy of the full list */
  getAll() {
    return [...tasks];
  },

  /** Find a single task by numeric ID; returns undefined if not found */
  findById(id) {
    return tasks.find((t) => t.id === id);
  },

  /** Create a new task with default status "todo" */
  create(title) {
    const task = {
      id: generateId(),
      title: title.trim(),
      status: TASK_STATUS.TODO,
    };
    tasks.push(task);
    return task;
  },

  /** Update the status of an existing task; returns updated task or null */
  updateStatus(id, status) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    task.status = status;
    return task;
  },

  /** Remove a task by ID; returns true if removed, false if not found */
  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};

module.exports = TaskStore;
