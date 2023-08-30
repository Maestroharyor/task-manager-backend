import { Request, Response } from "express";
import Task from "../models/taskModel";
import { createApiResponse } from "../utils";
import { ITask } from "../types";
import Tag from "../models/tagModel";
import randomColor from "randomcolor";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, tags } = req.body;

  try {
    const newTags: string[] = [];

    for (const tagName of tags) {
      let tag = await Tag.findOne({ name: tagName });

      if (!tag) {
        // If Tag doesn't exist, create a new one
        tag = await Tag.create({
          name: tagName,
          color: randomColor(),
          count: 1,
        });
      } else {
        // If Tag exists, increment its count
        await Tag.updateOne({ _id: tag._id }, { $inc: { count: 1 } });
      }

      newTags.push(tag._id);
    }

    const task: ITask = new Task({ title, description, tags: newTags });
    await task.save();

    res.status(201).json(createApiResponse(true, "Task created", task));
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error, tag name already exists
      res.status(400).json(createApiResponse(false, "Tag name already exists"));
    } else {
      res.status(400).json(createApiResponse(false, error.message));
    }
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { search, completed } = req.query;

  const query: any = {};
  if (search) {
    query.title = { $regex: search as string, $options: "i" };
  }
  if (completed) {
    query.completed = completed === "true";
  }

  try {
    const tasks: ITask[] = await Task.find(query).populate("tags").exec();
    res.status(200).json(createApiResponse(true, "Tasks retrieved", tasks));
  } catch (error: any) {
    res.status(500).json(createApiResponse(false, error.message));
  }
};

export const getTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  try {
    const task: ITask | null = await Task.findById(taskId)
      .populate("tags")
      .exec();

    if (!task) {
      res.status(404).json(createApiResponse(false, "Task not found"));
      return;
    }
    res.status(200).json(createApiResponse(true, "Task retrieved", task));
  } catch (error: any) {
    res.status(500).json(createApiResponse(false, error.message));
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { title, description, tags } = req.body;

  try {
    const task: ITask | null = await Task.findById(taskId);
    if (!task) {
      res.status(404).json(createApiResponse(false, "Task not found"));
      return;
    }

    const originalTags = task.tags.map((tag) => tag.toString());

    // Calculate the difference in tags (newly added tags and removed tags)
    const newTags = tags.filter((tag: string) => !originalTags.includes(tag));
    const removedTags = originalTags.filter((tag) => !tags.includes(tag));

    // Update existing tags count for removed tags
    await Tag.updateMany(
      { _id: { $in: removedTags } },
      { $inc: { count: -1 } }
    );

    // Update task and increment tag counts for new tags
    task.title = title;
    task.description = description;
    task.tags = tags;
    await task.save();

    // Update existing tags count for new tags
    await Tag.updateMany({ _id: { $in: newTags } }, { $inc: { count: 1 } });

    res.status(200).json(createApiResponse(true, "Task updated", task));
  } catch (error: any) {
    res.status(400).json(createApiResponse(false, error.message));
  }
};

export const updateTaskCompletion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = req.params.id;
  const { completed } = req.body;
  if (completed === undefined) {
    res
      .status(400)
      .json(createApiResponse(false, "Completed must be a boolean"));
    return;
  }

  try {
    const task: ITask | null = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );

    if (!task) {
      res.status(404).json(createApiResponse(false, "Task not found"));
      return;
    }

    res
      .status(200)
      .json(createApiResponse(true, "Task completion status updated", task));
  } catch (error: any) {
    res.status(400).json(createApiResponse(false, error.message));
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  try {
    const task: ITask | null = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json(createApiResponse(false, "Task not found"));
      return;
    }

    // Decrement tag counts for tags associated with the deleted task
    await Tag.updateMany({ _id: { $in: task.tags } }, { $inc: { count: -1 } });

    res.status(200).json(createApiResponse(true, "Task deleted"));
  } catch (error: any) {
    res.status(500).json(createApiResponse(false, error.message));
  }
};
