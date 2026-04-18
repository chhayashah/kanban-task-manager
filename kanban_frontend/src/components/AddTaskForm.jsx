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
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 bg-white rounded-2xl shadow-card border border-slate-100 p-3"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task…"
        disabled={submitting}
        maxLength={120}
        className="
          flex-1 px-3 py-2 text-sm rounded-xl
          bg-slate-50 border border-slate-200
          placeholder-slate-400 text-slate-700
          focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
          disabled:opacity-50
          transition
        "
      />
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="
          flex items-center gap-1.5 px-4 py-2
          bg-brand-500 hover:bg-brand-600 active:bg-brand-700
          text-white text-sm font-semibold rounded-xl
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors shadow-sm
        "
      >
        {submitting ? (
          /* Mini spinner while posting */
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
