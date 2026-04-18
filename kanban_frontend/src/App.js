import React, { useState } from "react";
import useTasks from "./hooks/useTasks";
import KanbanBoard from "./components/KanbanBoard";
import AddTaskForm from "./components/AddTaskForm";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const {
    todoTasks,
    doneTasks,
    loading,
    error,
    addTask,
    toggleStatus,
    removeTask,
  } = useTasks();

  const [errorDismissed, setErrorDismissed] = useState(false);

  const showError = error && !errorDismissed;
  const handleDismiss = () => setErrorDismissed(true);
  const handleAddTask = async (title) => {
    setErrorDismissed(false);
    await addTask(title);
  };

  const totalTasks = todoTasks.length + doneTasks.length;
  const completedCount = doneTasks.length;
  const progressPct =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">
                Kanban Board
              </h1>
              <p className="text-xs text-slate-400">Task Manager</p>
            </div>
          </div>

          {!loading && totalTasks > 0 && (
            <div className="sm:ml-auto flex flex-col items-end gap-1.5 min-w-[160px]">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>
                  {completedCount} / {totalTasks} completed
                </span>
                <span className="font-bold text-blue-600">{progressPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 gap-4">
        {showError && (
          <ErrorMessage message={error} onDismiss={handleDismiss} />
        )}
        <AddTaskForm onAdd={handleAddTask} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <KanbanBoard
            todoTasks={todoTasks}
            doneTasks={doneTasks}
            onToggle={toggleStatus}
            onDelete={removeTask}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200 bg-white">
        Mini Kanban Task Manager — React + Node.js + Express
      </footer>
    </div>
  );
};

export default App;
