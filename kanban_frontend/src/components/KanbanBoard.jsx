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
    <div className="kanban-board">
      <KanbanColumn
        title="To Do"
        tasks={todoTasks}
        accentColor="border-l-4 border-l-blue-500"
        onToggle={onToggle}
        onDelete={onDelete}
        emptyText="No pending tasks"
      />
      <KanbanColumn
        title="Done"
        tasks={doneTasks}
        accentColor="border-l-4 border-l-emerald-500"
        onToggle={onToggle}
        onDelete={onDelete}
        emptyText="Nothing completed yet"
      />
    </div>
  );
};

export default KanbanBoard;
