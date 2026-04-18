/**
 * middleware/errorHandler.js
 * Global Express error-handling middleware.
 * Must be mounted LAST in app.js (after all routes).
 * Catches any error passed via next(err) from route handlers.
 */

const errorHandler = (err, req, res, next) => {
  console.error("[Error]", err.message);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
