import { createBook, getBooks } from "../../src/services/book-service";
import { BookCreateInput } from "../../src/validators/book-validator";
import { buildBookCreateResponse } from "../utils/helpers";

describe("BookService createBook", () => {
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

describe("BookService getBooks", () => {
  it("should return a list of books for successful book retrieval", async () => {
    const books = [
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        publishedYear: 1937,
        genres: ["Fantasy"],
        stock: 10,
      },
      {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        publishedYear: 1954,
        genres: ["Fantasy"],
        stock: 5,
      },
    ];

    await createBook(books[0]);
    await createBook(books[1]);

    const responseBody = books.map((book) => buildBookCreateResponse(book));
    const response = await getBooks();

    expect(response).toMatchObject(responseBody);
  });

  it("should return an empty list for empty book list", async () => {
    const response = await getBooks();

    expect(response).toMatchObject([]);
  });
});
