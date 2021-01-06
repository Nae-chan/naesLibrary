import * as mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  rentedBy: {
    type: String,
  },
  dueDate: {
    type: String,
  },
});

const BookModel = mongoose.model("book", BooksSchema);

export { BookModel };
