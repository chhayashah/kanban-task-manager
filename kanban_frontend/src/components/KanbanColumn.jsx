/**
 * components/KanbanColumn.jsx
 * A single Kanban column (To Do or Done).
 * Renders a header with title + count badge, then a scrollable list of TaskCards.
 *
 * Props:
 *   title    {string}   — column heading, e.g. "To Do"
 *   tasks    {Array}    — filtered task list for this column
 *   accent   {string}   — Tailwind color classes for the accent stripe
 *   onToggle {function} — passed down to TaskCard
 *   onDelete {function} — passed down to TaskCard
 *   emptyText {string}  — placeholder when column has no tasks
 */

import TaskCard from "./TaskCard";

const KanbanColumn = ({
  title,
  tasks,
  accent,
  onToggle,
  onDelete,
  emptyText,
}) => {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Column header */}
      <div
        className={`flex items-center gap-3 px-5 py-4 border-b border-slate-200 ${accent}`}
      >
        <h2 className="font-semibold text-sm tracking-wide uppercase text-slate-600">
          {title}
        </h2>
        {/* Task count badge */}
        <span className="ml-auto flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
          {tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-xs font-medium">{emptyText}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
