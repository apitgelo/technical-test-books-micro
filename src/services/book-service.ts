import { BookCreateInput } from "../validators/book-validator";
import BookModel from "../models/book";
import { BookInterface } from "../interfaces/book-interface";

export const createBook = async (bookCreateInput: BookCreateInput): Promise<BookInterface> => {
  const book = await BookModel.create(bookCreateInput);

  return book;
}
