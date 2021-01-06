import * as express from "express";
import { BookModel } from "../schema";

/**
 * Get a book by its mongodb ID
 * @param req should contain an 'id' with a mongodb id value
 */
const getBookByID = async (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  let book: any;
  try {
    book = await BookModel.findById(req.params.id);
    if (book === null) {
      // could not find book id
      return resp.status(404).json({ errorMessage: "Cannot find book." });
    }
  } catch (e) {
    // server error, return error
    return resp.status(500).json({ errorMessage: e.message });
  }
  resp.locals.book = book;
  next();
};

export { getBookByID };
