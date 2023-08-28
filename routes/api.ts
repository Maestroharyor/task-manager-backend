import express from "express";
import taskRoutes from "./tasks";
import tagRoutes from "./tags";

const router = express.Router();

// Routes
router.use("/tasks", taskRoutes);
router.use("/tags", tagRoutes);

export default router;
