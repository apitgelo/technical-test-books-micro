import request from "supertest";
import app from "../../src/app";
import { createBook } from "../../src/services/book-service";

describe("PUT /books/:bookId BookController editBook", () => {
  it("should return 200 for successful book update", async () => {
    const book = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedYear: 1937,
      genres: ["Fantasy"],
      stock: 10,
    };

    const createdBook = await createBook(book);

    const updatedBook = {
      title: "The Hobbit (Updated)",
    };

    const response = await request(app)
      .put(`/books/${createdBook.id}`)
      .send({ data: updatedBook });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
  });

  it("should return 404 for a non-existent book", async () => {
    const updatedBook = {
      title: "The Hobbit (Updated)",
    };

    const response = await request(app)
      .put("/books/66bde44cb4aeb7e02507ffc8")
      .send({ data: updatedBook });

    expect(response.status).toBe(404);
  });
});
