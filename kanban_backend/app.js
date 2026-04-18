import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

export default app;
