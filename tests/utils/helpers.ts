import { BookCreateInput } from "../../src/validators/book-validator";

export const buildBookCreateResponse = (bookCreateInput: BookCreateInput) => {
  return {
    title: bookCreateInput.title,
    author: bookCreateInput.author,
    publishedYear: bookCreateInput.publishedYear,
    genres: bookCreateInput.genres,
    stock: bookCreateInput.stock,
  };
}
