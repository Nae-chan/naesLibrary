import { app } from "../app";
import supertest from "supertest";
import { BookModel } from "../schema";
import dbSetUp from "../testSetup";

describe("Admin Routes", () => {
  // set up db for test
  dbSetUp();

  it("gets all overdue books", async () => {
    let resp: any;
    try {
      resp = await supertest(app).get("/admin");
    } catch (error) {
      console.error("Error: ", error);
    }

    expect(resp.status).toEqual(200);
    expect(resp.body[0]._id).toBeDefined();
    expect(resp.body[0]).toHaveProperty("isbn");
  });

  it("should add a new copy of a book", async () => {
    let resp: any;
    try {
      resp = await supertest(app).post("/admin/add-copy").send({
        isbn: "123",
      });
    } catch (error) {
      console.error("Error: ", error);
    }
    expect(resp.status).toEqual(201);
    expect(resp.body._id).toBeDefined();
    expect(resp.body.isbn).toBe("123");
  });

  it("should create a new book", async () => {
    let resp: any;
    try {
      resp = await supertest(app).post("/admin/new-book").send({
        isbn: "4444",
        title: "Jesting Testing",
        author: "Bob Morgan",
      });
    } catch (error) {
      console.error("Error: ", error);
    }
    expect(resp.status).toEqual(201);
    expect(resp.body._id).toBeDefined();
    expect(resp.body).toHaveProperty("isbn");
  });

  it("should delete a book by its id", async () => {
    let resp: any;
    try {
      // get book id
      const bookToDelete: any = await BookModel.find({ title: "Blue Test" });
      resp = await supertest(app).delete(`/admin/${bookToDelete[0]._id}`);
    } catch (error) {
      console.error("Error: ", error);
    }
    expect(resp.status).toEqual(200);
    expect(resp.body.message).toBe("Book successfully removed from Inventory.");
  });
});
