import { app } from "../app";
import supertest from "supertest";
import dbSetUp from "../testSetup";

describe("general Routes", () => {
  // set up db for test
  dbSetUp();

  it("gets all books by unique isbn", async () => {
    let resp: any;
    try {
      resp = await supertest(app).get("/");
    } catch (error) {
      console.error("Error: ", error);
    }
    const numberOfRepeats = resp.body.filter((book) => book.isbn === "123")
      .length;

    expect(resp.status).toEqual(200);
    expect(resp.body[0]._id).toBeDefined();
    expect(numberOfRepeats).toBe(1);
  });
});
