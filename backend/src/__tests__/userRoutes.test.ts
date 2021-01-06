import { app } from "../app";
import supertest from "supertest";
import dbSetUp from "../testSetup";
import { BookModel } from "../schema";

describe("user Routes", () => {
  // set up db for test
  dbSetUp();

  it("gets all books checked out by a user", async () => {
    let resp: any;
    try {
      resp = await supertest(app)
        .post("/borrowed-books")
        .send({ user: "Mary Doe" });
    } catch (error) {
      console.error("Error: ", error);
    }
    const differentUser = resp.body.filter(
      (book) => book.rentedBy !== "Mary Doe"
    ).length;
    expect(resp.status).toEqual(200);
    expect(resp.body[0].rentedBy).toBe("Mary Doe");
    expect(differentUser).toBe(0);
  });

  it("updates a book for a new loan", async () => {
    let resp: any;
    try {
      resp = await supertest(app)
        .patch("/borrowed-books/checkout")
        .send({ isbn: "456", user: "bob" });
    } catch (error) {
      console.error("Error: ", error);
    }
    expect(resp.status).toEqual(200);
    expect(resp.body.rentedBy).toBe("bob");
    expect(resp.body.isbn).toBe("456");
    expect(resp.body.dueDate).toBeDefined();
  });

  it("updates a book for a return", async () => {
    let resp: any;

    try {
      // get book id
      const bookToReturn: any = await BookModel.find({
        isbn: "456",
        rentedBy: "Mary Doe",
      });
      resp = await supertest(app).patch(
        `/borrowed-books/${bookToReturn[0]._id}`
      );
    } catch (error) {
      console.error("Error: ", error);
    }
    expect(resp.status).toEqual(200);
    expect(resp.body.isbn).toBe("456");
    expect(resp.body.dueDate).toBeUndefined();
    expect(resp.body.rentedBy).toBeUndefined();
  });
});
