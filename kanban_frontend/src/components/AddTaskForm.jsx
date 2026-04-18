/**
 * components/AddTaskForm.jsx
 * Controlled form for creating a new task.
 * Manages its own local input state; calls addTask from the parent on submit.
 *
 * Props:
 *   onAdd {function} — async (title: string) => void
 */

import { useState } from "react";

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await onAdd(trimmed);
    setTitle("");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task…"
        disabled={submitting}
        maxLength={120}
        className="add-task-input"
      />
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="add-task-btn"
      >
        {submitting ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;