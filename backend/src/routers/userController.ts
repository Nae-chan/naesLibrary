import * as express from "express";
import { getBookByID } from "../middleware/getBookById.middleware";
import { getBooksByUser } from "../middleware/getBooksByUser.middleware";
import dayjs from "dayjs";
import {
  getAvailableBooks,
  validateCheckout,
} from "../middleware/getAvailableBooks.middleware";
import { Book } from "../../../models/book";
import { BookModel } from "../schema";

const userRoutes = express.Router();

/**
 * Get all books by unique isbn (no duplicates)
 */
userRoutes.get("", async (req: express.Request, resp: express.Response) => {
  try {
    const allBooks: any = await BookModel.find();

    // remove duplicate books
    const uniqueIsbnBooks: Book[] = allBooks.filter(
      (book, index, bookArr) =>
        index === bookArr.findIndex((b) => b.isbn === book.isbn)
    );

    resp.json(uniqueIsbnBooks);
  } catch (e) {
    //server error, return error
    resp.status(500).json({ message: e.message });
    console.error("Caught error getting collection: ", e);
  }
});

/**
 * Get all books checked out for a user
 * @param req: should contain a 'user' field with a string value
 */
userRoutes.post(
  "",
  getBooksByUser,
  async (req: express.Request, resp: express.Response) => {
    resp.json(resp.locals.book);
  }
);

/**
 * Checkout a book
 * @param req should contain an 'isbn' and 'user' fields with string values
 */
userRoutes.patch(
  "/checkout",
  getBooksByUser,
  validateCheckout,
  getAvailableBooks,
  async (req: express.Request, resp: express.Response) => {
    // Update book with rentedBy set to user and dueDate set to 2 weeks from today
    const today = new Date();
    const dueDate = dayjs(today).add(2, "week").format('MM/DD/YYYY');

    let book = resp.locals.book;
    book.dueDate = dueDate.toString();
    book.rentedBy = req.body.user;

    try {
      const newlyCheckedOutBook = await book.save();
      resp.json(newlyCheckedOutBook);
    } catch (e) {
      //server error, return error
      resp.status(500).json({ message: e.message });
      console.error("Caught error saving book: ", e);
    }
  }
);

/**
 * Update one book for a return
 */
userRoutes.patch(
  "/:id",
  getBookByID,
  async (req: express.Request, resp: express.Response) => {
    // Update only the fields passed in the request
    resp.locals.book.dueDate = undefined;
    resp.locals.book.rentedBy = undefined;
    try {
      const updatedBook = await resp.locals.book.save();
      resp.json(updatedBook);
    } catch (e) {
      //server error, return error
      resp.status(500).json({ message: e.message });
      console.error("Caught error getting collection: ", e);
    }
  }
);

export { userRoutes };
