import express from "express";
import { BookModel } from "../schema";
import { getBookByID } from "../middleware/getBookById.middleware";
import dayjs from "dayjs";
import { NewBookInput } from "../../../models/book";

const adminRoutes = express.Router();

/**
 * Get all books
 */
adminRoutes.get("", async (req: express.Request, resp: express.Response) => {
  try {
    const allBooks: any = await BookModel.find();
    resp.json(allBooks);
  } catch (e) {
    // server error, return error
    return resp.status(500).json({ errorMessage: e.message });
  }
});

/**
 * Get all overdue books
 */
adminRoutes.get(
  "/overdue",
  async (req: express.Request, resp: express.Response) => {
    try {
      const checkedOutBooks: any = await BookModel.find({
        dueDate: { $exists: true },
        rentedBy: { $exists: true },
      });
      const overdueBooks = [];
      // Add books with past due dates to the overdueBooks array
      for (let i = 0; i < checkedOutBooks.length; i++) {
        const currentDate = new Date();
        const isOverdue = dayjs(checkedOutBooks[i].dueDate).isBefore(
          currentDate,
          "day"
        );
        if (isOverdue) {
          overdueBooks.push(checkedOutBooks[i]);
        }
      }
      resp.json(overdueBooks);
    } catch (e) {
      //server error, return error
      resp.status(500).json({ message: e.message });
      console.error("Caught error getting collection: ", e);
    }
  }
);

/**
 * Add a new copy of a book to inventory by existing isbn
 * @param req should contain an 'isbn' field with a string value
 */
adminRoutes.post(
  "/add-copy",
  async (req: express.Request, resp: express.Response) => {
    try {
      const existingBook: any = await BookModel.findOne(req.body);
      if (existingBook === null) {
        // could not find book isbn
        return resp
          .status(404)
          .json({ errorMessage: "Cannot find book with specified ISBN." });
      }

      const newBookObj: NewBookInput = {
        isbn: existingBook.isbn,
        title: existingBook.title,
        author: existingBook.author,
      };

      const newBook = await new BookModel(newBookObj).save();
      resp.status(201).json(newBook);
    } catch (e) {
      // server error, return error
      return resp.status(500).json({ errorMessage: e.message });
    }
  }
);

/**
 * Add a new book to inventory
 * @param req should contain 'isbn', 'title', and 'author' fields all with string values
 */
adminRoutes.post(
  "/new-book",
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    const bookFromReq: NewBookInput = req.body;
    const book = new BookModel(bookFromReq);
    try {
      const newBook = await book.save();
      resp.status(201).json(newBook);
    } catch (e) {
      //user sent bad req, return error
      resp.status(400).json({ message: e.message });
      console.error("Caught error getting collection: ", e);
    }
  }
);

/**
 * Remove Book from Inventory by ID
 */
adminRoutes.delete(
  "/:id",
  getBookByID,
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await resp.locals.book.remove();
      resp.json({ message: "Book successfully removed from Inventory." });
    } catch (e) {
      // server error, return error
      resp.status(500).json({ message: e.message });
      console.error("Caught error getting collection: ", e);
    }
  }
);

export { adminRoutes };
