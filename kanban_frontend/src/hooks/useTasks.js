/**
 * hooks/useTasks.js
 * Custom hook that owns all task-related state and side effects.
 * Components that need tasks import this hook — they never call the API directly.
 *
 * Exposes:
 *   tasks        — full flat list from the server
 *   todoTasks    — filtered: status === "todo"
 *   doneTasks    — filtered: status === "done"
 *   loading      — true while any network request is in flight
 *   error        — error message string, or null
 *   addTask      — (title: string) => Promise<void>
 *   toggleStatus — (task: object) => Promise<void>
 *   removeTask   — (id: number) => Promise<void>
 */

import { useState, useEffect, useCallback } from "react";
import {
  fetchAllTasks,
  createTask,
  updateTaskStatus,
  updateTaskTitle,
  deleteTask,
} from "../api/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const clearError = () => setError(null);

  const handleError = (err) => {
    const message =
      err?.response?.data?.message || err?.message || "Something went wrong.";
    setError(message);
  };

  // ── Load tasks on mount ──────────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const data = await fetchAllTasks();
      setTasks(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ── Add task ─────────────────────────────────────────────────────────────
  const addTask = async (title) => {
    clearError();
    try {
      const newTask = await createTask(title);
      // Optimistic update: prepend to list so it appears immediately
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      handleError(err);
    }
  };

  // ── Toggle todo ↔ done ───────────────────────────────────────────────────
  const toggleStatus = async (task) => {
    const newStatus = task.status === "todo" ? "done" : "todo";
    clearError();
    // Optimistic UI: update locally before the server responds
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
    );
    try {
      const updated = await updateTaskStatus(task.id, newStatus);
      // Sync with server's canonical response
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      // Roll back on failure
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: task.status } : t)),
      );
      handleError(err);
    }
    };
    const editTask = async (id, newTitle) => {
      clearError();
      const previous = tasks;
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)),
      );
      try {
        const updated = await updateTaskTitle(id, newTitle);
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t)),
        );
      } catch (err) {
        setTasks(previous); // Rollback
        handleError(err);
      }
    };

  // ── Delete task ──────────────────────────────────────────────────────────
  const removeTask = async (id) => {
    clearError();
    // Optimistic removal
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      setTasks(previous); // Roll back
      handleError(err);
    }
  };

  // ── Derived state ────────────────────────────────────────────────────────
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return {
    tasks,
    todoTasks,
    doneTasks,
    loading,
    error,
    addTask,
    toggleStatus,
      removeTask,
    editTask,
  };
};

export default useTasks;
