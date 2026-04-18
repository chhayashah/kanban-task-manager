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
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={darkMode ? "app dark" : "app"}>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
              <h1 className="brand-title">Kanban Board</h1>
              <p className="brand-sub">Task Manager</p>
            </div>
          </div>

          {/* Progress */}
          {!loading && totalTasks > 0 && (
            <div className="progress-wrap">
              <div className="progress-label">
                <span>
                  {completedCount} / {totalTasks} completed
                </span>
                <span className="progress-pct">{progressPct}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              /* Sun icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.592-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.592z" />
              </svg>
            ) : (
              /* Moon icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
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
      <footer className="footer">
        Mini Kanban Task Manager — React + Node.js + Express
      </footer>
    </div>
  );
};

export default App;
