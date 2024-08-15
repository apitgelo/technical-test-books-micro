import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { createBook } from "../services/book-service";
import { BookInterface } from "../interfaces/book-interface";

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  try {
    const book: BookInterface = await createBook(data);
    res.status(HttpStatus.CREATED).json(book);
  } catch (error) {
    console.error(`Error occurred when adding book: ${JSON.stringify(data)}`, error);
    next(error);
  }
};
