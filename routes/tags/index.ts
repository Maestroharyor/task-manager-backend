import express from "express";
import {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
} from "../../controllers/tagController";
import { validateTagData } from "../../middlewares/validator";

const router = express.Router();

router.post("/", validateTagData, createTag);
router.get("/", getTags);
router.get("/:id", getTag);
router.put("/:id", validateTagData, updateTag);
router.delete("/:id", deleteTag);

export default router;
