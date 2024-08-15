import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../services/book-service";
import { BookInterface, BooksPresenter } from "../interfaces/book-interface";

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
  const queries = req.query;

  try {
    const books: BooksPresenter = await getBooks(queries);
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

export const editBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const { data } = req.body;

  try {
    const book: BookInterface = await updateBook(bookId, data);
    res.status(HttpStatus.OK).json(book);
  } catch (error) {
    console.error(`Error occurred when updating book with id: ${bookId}`, error);
    next(error);
  }
}

export const removeBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;

  try {
    await deleteBook(bookId);
    res.status(HttpStatus.OK).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(`Error occurred when deleting book with id: ${bookId}`, error);
    next(error);
  }
}
