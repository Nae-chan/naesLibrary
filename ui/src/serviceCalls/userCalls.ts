import { devServer } from "../environment";

const userEndpoint = "/users";

// ***Hardcoded user***
const user: string = "Jo";

// Call for getting all books checked out by a user
const fetchUsersBooks = async () => {
  try {
    const resp = await fetch(devServer + userEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
    const body = await resp.json();
    return body || [];
  } catch (error) {
    console.error("Error fetching user books: ", error);
  }
};

// Call for returning a checked out book
const returnUserBook = async (id: string) => {
  try {
    const resp = await fetch(devServer + userEndpoint + `/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error fetching user books: ", error);
  }
};

// Call for getting all books without duplicates
const fetchUserCatalog = async () => {
  try {
    const resp = await fetch(devServer + userEndpoint);
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error getting user catalog: ", error);
  }
};

// Call for checking out a book
const checkoutBook = async (isbn: string) => {
  try {
    const resp = await fetch(devServer + userEndpoint + "/checkout", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isbn, user }),
    });
    const body = await resp.json();
    return body;
  } catch (error) {
    console.error("Error fetching user books: ", error);
  }
};
export { fetchUsersBooks, returnUserBook, fetchUserCatalog, checkoutBook };
