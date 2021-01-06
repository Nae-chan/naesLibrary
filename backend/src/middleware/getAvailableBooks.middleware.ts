/**
 * Middleware used when a user checks out a book
 */
import * as express from "express";
import { BookModel } from "../schema";
import dayjs from "dayjs";

/**
 * Get a book by isbn that is not currently checked out.
 * @param req should contain 'isbn' field with a string value
 */
const getAvailableBooks = async (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  let availableBooks: any;
  try {
    availableBooks = await BookModel.findOne({
      isbn: req.body.isbn,
      rentedBy: null,
    });

    if (availableBooks === null) {
      // no available books
      return resp
        .status(404)
        .json({
          errorMessage: "There are no books available to be checked out.",
        });
    }
  } catch (e) {
    // server error, return error
    return resp.status(500).json({ errorMessage: e.message });
  }
  resp.locals.book = availableBooks;
  next();
};

/**
 * Validate that a user is allowed to checkout a book.
 * @param resp should contain a book document from mongodb
 */
const validateCheckout = async (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  const checkedOutBooks = resp.locals.book;
  // Check if user has overdue books
  for (let i = 0; i < checkedOutBooks.length; i++) {
    const currentDate = new Date();
    const isOverdue = dayjs(checkedOutBooks[i].dueDate).isBefore(
      currentDate,
      "day"
    );
    if (isOverdue) {
      return resp
        .status(403)
        .json({ errorMessage: "Overdue book outstanding." });
    }
  }
  // Check if user has 3 checked out books
  const numberCheckedOut = checkedOutBooks.length;
  if (numberCheckedOut >= 3) {
    return resp
      .status(403)
      .json({
        errorMessage: "Maximum allowed number of checked out books reached.",
      });
  }
  next();
};

export { getAvailableBooks, validateCheckout };
