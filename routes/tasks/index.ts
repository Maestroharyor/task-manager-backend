import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskCompletion,
  deleteTask,
} from "../../controllers/taskController";
import { validateTaskData } from "../../middlewares/validator";

const router = express.Router();

router.post("/", validateTaskData, createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", validateTaskData, updateTask);
router.patch("/:id/status", updateTaskCompletion);
router.delete("/:id", deleteTask);

export default router;
