import { generateId } from "../utils/generateId.js";
import { TASK_STATUS } from "../constants/status.js";

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
  getAll() {
    return [...tasks];
  },

  findById(id) {
    return tasks.find((t) => t.id === id);
  },

  create(title) {
    const task = {
      id: generateId(),
      title: title.trim(),
      status: TASK_STATUS.TODO,
    };
    tasks.push(task);
    return task;
  },

  updateStatus(id, status) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    task.status = status;
    return task;
  },
  updateTitle(id, title) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    task.title = title.trim();
    return task;
  },

  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};

export default TaskStore;
