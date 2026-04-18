/**
 * components/KanbanBoard.jsx
 * Composes the two-column Kanban layout.
 * Receives all task data and callbacks from the parent (App.jsx via useTasks).
 *
 * Props:
 *   todoTasks {Array}    — tasks with status "todo"
 *   doneTasks {Array}    — tasks with status "done"
 *   onToggle  {function} — (task) => void
 *   onDelete  {function} — (id) => void
 */

import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ todoTasks, doneTasks, onToggle, onDelete }) => {
  return (
    <div className="flex gap-5 flex-col sm:flex-row flex-1 min-h-0">
      {/* To Do column — left, blue accent */}
      <KanbanColumn
        title="To Do"
        tasks={todoTasks}
        accent="border-l-4 border-l-brand-500"
        onToggle={onToggle}
        onDelete={onDelete}
        emptyText="No pending tasks"
      />

      {/* Done column — right, green accent */}
      <KanbanColumn
        title="Done"
        tasks={doneTasks}
        accent="border-l-4 border-l-emerald-500"
        onToggle={onToggle}
        onDelete={onDelete}
        emptyText="Nothing completed yet"
      />
    </div>
  );
};

export default KanbanBoard;
