import { Request, Response } from "express";
import { ITag } from "../types";
import { createApiResponse } from "../utils";
import Tag from "../models/tagModel";
import Task from "../models/taskModel";
import randomColor from "randomcolor";

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newTag: ITag = new Tag({ name, count: 0, color: randomColor() });
    await newTag.save();
    res.status(201).json(createApiResponse(true, "Tag created", newTag));
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json(createApiResponse(false, "Tag already exists"));
    }
    return res.status(400).json(createApiResponse(false, error.message));
  }
};

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags: ITag[] = await Tag.find();
    res.status(200).json(createApiResponse(true, "Tags retrieved", tags));
  } catch (error: any) {
    res.status(500).json(createApiResponse(false, error.message));
  }
};

export const getTag = async (req: Request, res: Response) => {
  const tagId = req.params.id;
  try {
    const tag: ITag | null = await Tag.findById(tagId);
    if (!tag) {
      res.status(404).json(createApiResponse(false, "Tag not found"));
      return;
    }
    res.status(200).json(createApiResponse(true, "Tag retrieved", tag));
  } catch (error: any) {
    res.status(500).json(createApiResponse(false, error.message));
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const tagId = req.params.id;
  const { name } = req.body;

  try {
    const updatedTag: ITag | null = await Tag.findByIdAndUpdate(
      tagId,
      { name },
      { new: true }
    );
    if (!updatedTag) {
      res.status(404).json(createApiResponse(false, "Tag not found"));
      return;
    }
    res.status(200).json(createApiResponse(true, "Tag updated", updatedTag));
  } catch (error: any) {
    res.status(400).json(createApiResponse(false, error.message));
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const tagId = req.params.id;
  try {
    const tag: ITag | null = await Tag.findByIdAndDelete(tagId);
    if (!tag) {
      res.status(404).json(createApiResponse(false, "Tag not found"));
      return;
    }

    // Update tasks to remove the deleted tag from their references
    await Task.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });

    res.status(200).json(createApiResponse(true, "Tag deleted"));
  } catch (error: any) {
    res.status(500).json(createApiResponse(false, error.message));
  }
};
