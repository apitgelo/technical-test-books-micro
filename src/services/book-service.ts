import { BookCreateInput } from "../validators/book-validator";
import BookModel from "../models/book";
import { BookInterface } from "../interfaces/book-interface";
import HttpError from "../exceptions/http-error";
import { BOOK_NOT_FOUND } from "../exceptions/messages";
import HttpStatus from "http-status-codes";

export const createBook = async (bookCreateInput: BookCreateInput): Promise<BookInterface> => {
  const book = await BookModel.create(bookCreateInput);

  return book;
}

export const getBooks = async (): Promise<BookInterface[]> => {
  const books = await BookModel.find();

  return books;
}

export const getBookById = async (bookId: string): Promise<BookInterface> => {
  const book = await BookModel.findById(bookId);

  if (!book) {
    throw new HttpError(BOOK_NOT_FOUND(bookId), HttpStatus.NOT_FOUND);
  }

  return book;
}
