import request from "supertest";
import app from "../../src/app";
import { buildBookListResponse, buildBookResponse } from "../utils/helpers";
import { createBook } from "../../src/services/book-service";

describe("GET /books BookController browseBooks", () => {
  it("should return 200 for successful books retrieval", async () => {
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

    const responseBody = buildBookListResponse(1, 10, books.length, books.map((book) => buildBookResponse(book)));
    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(responseBody);
  });

  it("should return 200 for empty book list", async () => {
    const responseBody = buildBookListResponse(1, 10, 0, []);
    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(responseBody);
  });
});
