# 📋 Kanban Task Manager

A full-stack **Kanban-style Task Manager** built with **React** (frontend) and **Node.js + Express** (backend). Tasks are organized into two columns — **To Do** and **Done** — with full CRUD operations, inline editing, and dark/light theme toggle.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (CRA), Tailwind CSS v3, Axios |
| Backend | Node.js, Express 4, CORS, dotenv |
| Storage | In-memory array (no database) |

---

## ✨ Features

- ✅ Create new tasks
- ✅ View tasks grouped in **To Do** and **Done** columns
- ✅ Move tasks between To Do ↔ Done
- ✅ **Edit** task title inline (click ✏️ icon)
- ✅ Delete tasks
- ✅ **Dark / Light theme** toggle
- ✅ Progress bar showing completion %
- ✅ Loading state with spinner
- ✅ Error handling with dismissable banner
- ✅ Optimistic UI updates with rollback on failure
- ✅ Slide-in animation on new tasks

---

## 📁 Project Structure

```
kanban-task-manager/
│
├── kanban_backend/
│   ├── constants/
│   │   └── status.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateTask.js
│   ├── models/
│   │   └── taskStore.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── generateId.js
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── kanban_frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.js
│   │   ├── components/
│   │   │   ├── AddTaskForm.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── KanbanColumn.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/chhayashah/kanban-task-manager
cd kanban-task-manager
```

---

### 2️⃣ Start the Backend

```bash
cd kanban_backend
npm install
npm run dev
```

✅ You should see:
```
✅ Kanban API running on http://localhost:5000
   Environment : development
```

---

### 3️⃣ Start the Frontend

Open a **new terminal**:

```bash
cd kanban_frontend
npm install
npm start
```

🎉 App opens at **http://localhost:3000**

---

## 🔌 API Reference

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/tasks` | — | Fetch all tasks |
| POST | `/tasks` | `{ "title": "..." }` | Create a new task |
| PUT | `/tasks/:id` | `{ "status": "done" }` | Update task status |
| PATCH | `/tasks/:id/title` | `{ "title": "..." }` | Update task title |
| DELETE | `/tasks/:id` | — | Delete a task |

### ✅ Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Buy milk",
    "status": "todo"
  }
}
```

### ❌ Error Response
```json
{
  "success": false,
  "message": "Title is required and must be a non-empty string."
}
```

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| ➕ Add task | Type in input → click **Add Task** |
| ✅ Mark done | Click **circle button** on any task |
| ↩️ Move back to To Do | Click **green check** on a done task |
| ✏️ Edit title | Hover task → click **pencil icon** → type → **Enter** |
| ❌ Cancel edit | Press **Escape** |
| 🗑️ Delete task | Hover task → click **trash icon** |
| 🌙 Dark mode | Click **Dark** button in header |
| ☀️ Light mode | Click **Light** button in header |

---

## 🛠️ Available Scripts

### Backend

```bash
npm start        # Production mode
npm run dev      # Development mode (nodemon auto-restart)
```

### Frontend

```bash
npm start        # Development server → http://localhost:3000
npm run build    # Production build → /build folder
npm test         # Run tests
```

---

## 🌐 Environment Variables

Create `.env` file inside `kanban_backend/`:

```env
PORT=5000
NODE_ENV=development
```

---

## 📌 Important Notes

- Data is stored **in-memory** — restarting backend resets all tasks
- **4 seed tasks** load automatically when backend starts
- Frontend uses **optimistic UI** — changes appear instantly, rollback on API failure
- Both servers must run **simultaneously** for the app to work
- Frontend runs on **port 3000**, backend on **port 5000**

---

## 👩‍💻 Author

**Chhaya Shah**
Built with ❤️ using React + Node.js + Express