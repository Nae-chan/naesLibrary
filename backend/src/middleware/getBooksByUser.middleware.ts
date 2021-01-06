import * as express from "express";
import { BookModel } from "../schema";

/**
 * Fetches books rented by a user
 * @param req should contain a 'user' field
 */
const getBooksByUser = async (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  let checkedOutBooks: any;
  try {
    checkedOutBooks = await BookModel.find({ rentedBy: req.body.user });
    if (checkedOutBooks === null) {
      // user has no checked out books
      return resp
        .status(404)
        .json({ errorMessage: "No books currently checked out." });
    }
  } catch (e) {
    // server error, return error
    return resp.status(500).json({ errorMessage: e.message });
  }
  resp.locals.book = checkedOutBooks;
  next();
};

export { getBooksByUser };
