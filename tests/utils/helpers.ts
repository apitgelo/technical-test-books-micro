import { BookCreateInput } from "../../src/validators/book-validator";

export const buildBookResponse = (bookCreateInput: BookCreateInput) => {
  return {
    title: bookCreateInput.title,
    author: bookCreateInput.author,
    publishedYear: bookCreateInput.publishedYear,
    genres: bookCreateInput.genres,
    stock: bookCreateInput.stock,
  };
}

export const buildBookListResponse = (page: number = 1, limit: number = 10, total: number, books: BookCreateInput[]) => {
  return {
    page,
    totalPages: Math.ceil(total / limit),
    totalBooks: total,
    books,
  };
}
