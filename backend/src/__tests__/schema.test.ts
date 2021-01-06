import mongoose from "mongoose";
import { BookModel } from "../schema";
import dbSetUp from "../testSetup";

describe("BookModel Test", () => {
  // Connect to the MongoDB Memory Server
  dbSetUp();

  // Test invalid field
  it("create a book successfully but only with fields defined in the schema", async () => {
    const testBook = { isbn: "1234", invalidField: "field not in schema" };
    const bookWithInvalidField = new BookModel(testBook);
    let result: any;
    try {
      result = await bookWithInvalidField.save();
    } catch (error) {
      console.error("Error with invalid field test: ", error);
    }
    expect(result._id).toBeDefined();
    expect(result.invalidField).toBeUndefined();
  });

  // Test required field
  it("fails to create a book without required fields", async () => {
    const testBook = { title: "testing", author: "Test Author" };
    const bookWithoutRequiredField = new BookModel(testBook);
    let error;
    try {
      const savedWithoutRequiredField = await bookWithoutRequiredField.save();
      error = savedWithoutRequiredField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.isbn).toBeDefined();
  });
});
