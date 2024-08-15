import { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator';

const inputSanitizer = [
  check('*').trim().escape()
];

const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { inputSanitizer, validateInput };
