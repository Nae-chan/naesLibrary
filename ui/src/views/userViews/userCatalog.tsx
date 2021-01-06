import React, { useState, useEffect, FC } from "react";
import { Book } from "../../../../models/book";
import { checkoutBook, fetchUserCatalog } from "../../serviceCalls/userCalls";
import { Button, Card, Spinner } from "react-bootstrap";
import book_icon from "../../assets/book_icon.png";
import SuccessModal from "../generalModals/successModal";
import FailureModal from "../generalModals/failureModal";
import {emptyBook} from "../../utils/emptyBook"

interface UserCatalogProps {
  userBooks: Book[];
  updateUserBooks: any;
}

const UserCatalog: FC<UserCatalogProps> = ({ userBooks, updateUserBooks }) => {
  const [catalog, setCatalog] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const [error, setError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Load books by isbn with no duplicates
  useEffect(() => {
    const getData = async () => {
      const books: any = await fetchUserCatalog();
      setCatalog(books);
    };
    getData();
  }, []);

  // toggle the right modal
  const toggleModal = (result: string) => {
    if (result === "success") {
      setShowSuccessModal(!showSuccessModal);
    } else if (result === "failure") {
      setShowErrorModal(!showErrorModal);
    }
  };

  // checkout a book for a user
  const checkout = async (isbn: string) => {
    const checkoutResult: any = await checkoutBook(isbn);

    if (checkoutResult && checkoutResult.errorMessage) {
      // it failed so show unsuccessful modal
      setError(checkoutResult.errorMessage);
      toggleModal("failure");
    } else {
      // succeeded, trigger update for users book list
      updateUserBooks();

      // show success modal
      setSelectedBook(checkoutResult);
      toggleModal("success");
    }
  };

  return (
    <>
      <div className="book-list">
        {catalog.length > 0 ? (
          catalog.map((book) => (
            <Card key={book._id} className="book-list-card" body>
              <Card.Img variant="top" src={book_icon} />
              <Card.Body className="book-details">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => checkout(book.isbn)}
                >
                  Borrow
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Spinner variant="primary" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
      <SuccessModal
        action={"Checkout"}
        show={showSuccessModal}
        toggleModal={() => toggleModal("success")}
        book={selectedBook}
      />
      <FailureModal
        action={"Checkout"}
        show={showErrorModal}
        toggleModal={() => toggleModal("failure")}
        message={error}
      />
    </>
  );
};
export default UserCatalog;
