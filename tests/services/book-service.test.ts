import { createBook } from "../../src/services/book-service";
import { BookCreateInput } from "../../src/validators/book-validator";
import { buildBookCreateResponse } from "../utils/helpers";

describe("BookService create", () => {
  it("should return a book for successful book creation", async () => {
    const bookCreateInput: BookCreateInput = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedYear: 1937,
      genres: ["Fantasy"],
      stock: 10,
    };

    const responseBody = buildBookCreateResponse(bookCreateInput);
    const response = await createBook(bookCreateInput);

    expect(response).toMatchObject(responseBody);
  });
});
