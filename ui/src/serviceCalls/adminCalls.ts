import { NewBookInput } from "../../../models/book";
import { devServer } from "../environment";

const adminEndpoint = "/admin";

// Call for getting all books
const fetchAllBooks = async () => {
  try {
    const resp = await fetch(devServer + adminEndpoint);
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error getting all books: ", error);
    return { errorMessage: "Error getting books...Sorry, try again later?" };
  }
};
// Call for getting all overdue books
const fetchOverdueBooks = async () => {
  try {
    const resp = await fetch(devServer + adminEndpoint + "/overdue");
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error getting all overdue books: ", error);
    return { errorMessage: "Error getting books...Sorry, try again later?" };
  }
};
// Call to add a new COPY of a book
const addNewCopy = async (isbn: string) => {
  try {
    const resp = await fetch(devServer + adminEndpoint + "/add-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isbn }),
    });
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error adding new book copy: ", error);
    return { errorMessage: "Error adding new book...Sorry, try again later?" };
  }
};
// Call to add a new book
const addNewBook = async (newBook: NewBookInput) => {
  try {
    const resp = await fetch(devServer + adminEndpoint + "/new-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error adding new book: ", error);
    return { errorMessage: "Error adding new book...Sorry, try again later?" };
  }
};

// Call to delete a book
const deleteBook = async (id: string) => {
  try {
    const resp = await fetch(devServer + adminEndpoint + `/${id}`, {
      method: "DELETE",
    });
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error deleting book: ", error);
    return { errorMessage: "Error deleting book...Sorry, try again later?" };
  }
};

export { fetchAllBooks, fetchOverdueBooks, addNewCopy, addNewBook, deleteBook };
