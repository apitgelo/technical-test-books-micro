import request from "supertest";
import app from "../../src/app";
import { buildBookCreateResponse } from "../utils/helpers";

describe("POST /books BookController create", () => {
  it("should return 201 for successful book creation", async () => {
    const bookCreatePayload = {
      data: {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        publishedYear: 1937,
        genres: ["Fantasy"],
        stock: 10,
      },
    };

    const responseBody = buildBookCreateResponse(bookCreatePayload.data);
    const response = await request(app)
      .post("/books")
      .send(bookCreatePayload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(responseBody);
  });

  it("should return 422 for empty input", async () => {
    const bookCreatePayload = {
      data: {},
    };

    const response = await request(app)
      .post("/books")
      .send(bookCreatePayload);

    expect(response.status).toBe(422);
  });

  it("should return 422 for invalid input", async () => {
    const bookCreatePayload = {
      data: {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        publishedYear: 1937,
        genres: ["Fantasy"],
        stock: "10",
      },
    };

    const response = await request(app)
      .post("/books")
      .send(bookCreatePayload);

    expect(response.status).toBe(422);
  });

  it("should return 422 for missing input", async () => {
    const bookCreatePayload = {
      data: {
        title: "The Hobbit",
        publishedYear: 1937,
        genres: ["Fantasy"],
        stock: 10,
      },
    };

    const response = await request(app)
      .post("/books")
      .send(bookCreatePayload);

    expect(response.status).toBe(422);
  });
});
