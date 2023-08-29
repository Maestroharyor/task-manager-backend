import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation middleware for creating or updating tasks
export const validateTaskData = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
  body("tags").isArray().withMessage("Tags must be an array"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid data sent",
        error: errors.array(),
      });
    }
    next();
  },
];

// Validation middleware for creating or updating tags
export const validateTagData = [
  body("name").notEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid data sent",
        errors: errors.array(),
      });
    }
    next();
  },
];
