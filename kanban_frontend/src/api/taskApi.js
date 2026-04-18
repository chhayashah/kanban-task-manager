

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/tasks`
  : "http://localhost:5000/tasks";

/**
 * Fetch all tasks from the API.
 * @returns {Promise<Array>} Array of task objects
 */
export const fetchAllTasks = async () => {
  const res = await axios.get(BASE_URL);
  return res.data.data; // { success, data: [...] }
};

/**
 * Create a new task with the given title.
 * @param {string} title
 * @returns {Promise<Object>} The newly created task
 */
export const createTask = async (title) => {
  const res = await axios.post(BASE_URL, { title });
  return res.data.data;
};

/**
 * Toggle a task's status between "todo" and "done".
 * @param {number} id
 * @param {"todo"|"done"} status
 * @returns {Promise<Object>} The updated task
 */
export const updateTaskStatus = async (id, status) => {
  const res = await axios.put(`${BASE_URL}/${id}`, { status });
  return res.data.data;
};
export const updateTaskTitle = async (id, title) => {
  const res = await axios.patch(`${BASE_URL}/${id}/title`, { title });
  return res.data.data;
};

/**
 * Delete a task by ID.
 * @param {number} id
 * @returns {Promise<void>}
 */
export const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
