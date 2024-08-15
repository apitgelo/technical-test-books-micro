import { createBook, getBookById, getBooks, updateBook } from "../../src/services/book-service";
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

describe("BookService getBookById", () => {
  it("should return a book for successful book retrieval", async () => {
    const bookCreateInput: BookCreateInput = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedYear: 1937,
      genres: ["Fantasy"],
      stock: 10,
    };

    const createdBook = await createBook(bookCreateInput);
    const responseBody = buildBookCreateResponse(bookCreateInput);
    const response = await getBookById(createdBook.id);

    expect(response).toMatchObject(responseBody);
  });

  it("should throw an error for a non-existent book", async () => {
    try {
      await getBookById("66bde44cb4aeb7e02507ffc8");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.code).toBe(404);
    }
  });
});

describe("BookService updateBook", () => {
  it("should return a book for successful book update", async () => {
    const bookCreateInput: BookCreateInput = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedYear: 1937,
      genres: ["Fantasy"],
      stock: 10,
    };

    const createdBook = await createBook(bookCreateInput);

    const updatedBook = {
      title: "The Hobbit (Updated)",
    };

    const response = await updateBook(createdBook.id, updatedBook);

    expect(response.title).toBe(updatedBook.title);
  });

  it("should throw an error for a non-existent book", async () => {
    const updatedBook = {
      title: "The Hobbit (Updated)",
    };

    try {
      await updateBook("66bde44cb4aeb7e02507ffc8", updatedBook);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.code).toBe(404);
    }
  });
});
