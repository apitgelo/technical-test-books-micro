import request from "supertest";
import app from "../../src/app";
import { createBook } from "../../src/services/book-service";

describe("DELETE /books/:bookId BookController removeBook", () => {
  it("should return 200 for successful book deletion", async () => {
    const book = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedYear: 1937,
      genres: ["Fantasy"],
      stock: 10,
    };

    const createdBook = await createBook(book);

    const response = await request(app).delete(`/books/${createdBook.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book deleted successfully");
  });

  it("should return 404 for a non-existent book", async () => {
    const response = await request(app).delete("/books/66bde44cb4aeb7e02507ffc8");

    expect(response.status).toBe(404);
  });

  it("should return 422 for an invalid book ID", async () => {
    const response = await request(app).delete("/books/invalid-id");

    expect(response.status).toBe(422);
  });
});
