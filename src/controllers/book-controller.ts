import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { createBook, getBookById, getBooks } from "../services/book-service";
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

export const browseBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books: BookInterface[] = await getBooks();
    res.status(HttpStatus.OK).json(books);
  } catch (error) {
    console.error("Error occurred when getting books", error);
    next(error);
  }
}

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;

  try {
    const book: BookInterface = await getBookById(bookId);
    res.status(HttpStatus.OK).json(book);
  } catch (error) {
    console.error(`Error occurred when getting book with id: ${bookId}`, error);
    next(error);
  }
}
