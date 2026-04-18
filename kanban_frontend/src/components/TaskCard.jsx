/**
 * components/TaskCard.jsx
 * Renders a single task card with:
 *   - The task title
 *   - A toggle button to move it between To Do ↔ Done
 *   - A delete button
 *
 * Props:
 *   task         {object}   — { id, title, status }
 *   onToggle     {function} — (task) => void
 *   onDelete     {function} — (id: number) => void
 */

const TaskCard = ({ task, onToggle, onDelete }) => {
  const isDone = task.status === "done";

  return (
    <div className="group animate-slide-in flex items-start gap-3 bg-white rounded-xl border border-slate-100 shadow-card hover:shadow-card-hover px-4 py-3 transition-shadow">
      {/* Toggle checkbox-style button */}
      <button
        onClick={() => onToggle(task)}
        title={isDone ? "Move back to To Do" : "Mark as Done"}
        className={`
          mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
          ${
            isDone
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-slate-300 hover:border-brand-500"
          }
        `}
      >
        {isDone && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Task title */}
      <span
        className={`flex-1 text-sm leading-relaxed ${
          isDone ? "line-through text-slate-400" : "text-slate-700"
        }`}
      >
        {task.title}
      </span>

      {/* Delete button — visible on hover */}
      <button
        onClick={() => onDelete(task.id)}
        title="Delete task"
        className="
          flex-shrink-0 opacity-0 group-hover:opacity-100
          text-slate-300 hover:text-red-500
          transition-all duration-150
        "
        aria-label={`Delete task: ${task.title}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskCard;
