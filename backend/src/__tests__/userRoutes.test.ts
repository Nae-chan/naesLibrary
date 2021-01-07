import { app } from "../app";
import supertest from "supertest";
import dbSetUp from "../testSetup";
import { BookModel } from "../schema";
import { Book } from "../../../models/book";

const userEndpoint = "/users"

describe("user Routes", () => {
  // set up db for test
  dbSetUp();

  it("gets all books checked out by a user", async () => {
    let resp: any;
    try {
      resp = await supertest(app)
        .post(userEndpoint)
        .send({ user: "Mary Doe" });
    } catch (error) {
      console.error("Error: ", error);
    }
    console.log("resp ", resp)
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
        .patch(userEndpoint + "/checkout")
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
        `${userEndpoint}/${bookToReturn[0]._id}`
      );
    } catch (error) {
      console.error("Error: ", error);
    }
    expect(resp.status).toEqual(200);
    expect(resp.body.isbn).toBe("456");
    expect(resp.body.dueDate).toBeUndefined();
    expect(resp.body.rentedBy).toBeUndefined();
  });

  it("gets all books by unique isbn", async () => {
    let resp: any;
    try {
      resp = await supertest(app).get(userEndpoint);
    } catch (error) {
      console.error("Error: ", error);
    }
    const numberOfRepeats = resp.body.filter((book:Book) => book.isbn === "123")
      .length;

    expect(resp.status).toEqual(200);
    expect(resp.body[0]._id).toBeDefined();
    expect(numberOfRepeats).toBe(1);
  });
});
