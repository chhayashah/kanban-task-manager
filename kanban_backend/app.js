/**
 * app.js
 * Express application setup.
 * Configures middleware, mounts routes, and attaches the global error handler.
 * Kept separate from server.js so the app can be tested without starting a live server.
 */

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors()); // Allow cross-origin requests from the React dev server
app.use(express.json()); // Parse JSON request bodies

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/tasks", taskRoutes);

// Health-check — useful for deployment platforms
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
