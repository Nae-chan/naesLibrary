import "dotenv/config";
import mongoose from "mongoose";
import { BookModel } from "./schema";

// test data
const testBooks = [
  {
    isbn: "123",
    title: "Red Test",
    author: "TingOne",
    dueDate: "2017/02/05",
    rentedBy: "John Doe",
  },
  {
    isbn: "123",
    title: "Red Test",
    author: "TingOne",
    dueDate: "2021/02/05",
    rentedBy: "Mary Doe",
  },
  {
    isbn: "456",
    title: "Blue Test",
    author: "TingTwo",
  },
  {
    isbn: "456",
    title: "Blue Test",
    author: "TingTwo",
    dueDate: "2021/01/05",
    rentedBy: "Mary Doe",
  },
];
// Open db connection and set up/clean up data for each test
export default () => {
  beforeAll(async () => {
    const url = process.env.TESTDBSTRING;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  // Seed the database with books
  beforeEach(async () => {
    await BookModel.create(testBooks);
  });
  // Clear test collection
  afterEach(async () => {
    await BookModel.deleteMany();
  });
  // Close db connection
  afterAll(async (done) => {
    await mongoose.connection.close();
    done();
  });
};
