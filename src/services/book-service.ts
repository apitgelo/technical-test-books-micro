import { BookBrowseParamsValidator, BookCreateInput, BookUpdateInput } from "../validators/book-validator";
import BookModel from "../models/book";
import { BookInterface, BooksPresenter } from "../interfaces/book-interface";
import HttpError from "../exceptions/http-error";
import { BOOK_NOT_FOUND } from "../exceptions/messages";
import HttpStatus from "http-status-codes";

export const createBook = async (bookCreateInput: BookCreateInput): Promise<BookInterface> => {
  const book = await BookModel.create(bookCreateInput);

  return book;
}

export const getBooks = async (bookBrowseParams: BookBrowseParamsValidator): Promise<BooksPresenter> => {
  const { page = 1, limit = 10, title, author, genres } = bookBrowseParams;

  let query = {};
  if (title) {
    query = { ...query, title: { $regex: title, $options: "i" } };
  }
  if (author) {
    query = { ...query, author: { $regex: author, $options: "i" } };
  }
  if (genres) {
    query = { ...query, genres: { $in: genres.split(',') } };
  }

  const total = await BookModel.countDocuments(query);
  const books = await BookModel.find(query).skip((page - 1) * limit).limit(limit);

  return {
    page: +page,
    totalPages: Math.ceil(total / limit),
    totalBooks: total,
    books,
  }
}

export const getBookById = async (bookId: string): Promise<BookInterface> => {
  const book = await BookModel.findById(bookId);

  if (!book) {
    throw new HttpError(BOOK_NOT_FOUND(bookId), HttpStatus.NOT_FOUND);
  }

  return book;
}

export const updateBook = async (bookId: string, bookUpdateInput: BookUpdateInput): Promise<BookInterface> => {
  const book = await getBookById(bookId);

  book.set(bookUpdateInput);

  const updatedBook = await book.save();

  return updatedBook;
}

export const deleteBook = async (bookId: string): Promise<void> => {
  const book = await BookModel.findByIdAndDelete(bookId);

  if (!book) {
    throw new HttpError(BOOK_NOT_FOUND(bookId), HttpStatus.NOT_FOUND);
  }
}
