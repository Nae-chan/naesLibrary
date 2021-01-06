import React, { useState, FC } from "react";
import { Book } from "../../../../models/book";
import { addNewCopy, deleteBook } from "../../serviceCalls/adminCalls";
import { Button, Card, Spinner } from "react-bootstrap";
import book_icon from "../../assets/book_icon.png";
import SuccessModal from "../generalModals/successModal";
import FailureModal from "../generalModals/failureModal";
import { emptyBook } from "../../utils/emptyBook";

interface AdminBookManagementProps {
  booklist: Book[];
  updateBooklist: any;
}

const AdminBookManagement: FC<AdminBookManagementProps> = ({
  booklist,
  updateBooklist,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
  const [error, setError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");

  // toggle the right modal
  const toggleModal = (result: string) => {
    if (result === "success") {
      setShowSuccessModal(!showSuccessModal);
    } else if (result === "failure") {
      setShowErrorModal(!showErrorModal);
    }
  };

  // add a new copy of a book
  const addCopy = async (isbn: string) => {
    const result: any = await addNewCopy(isbn);

    if (result && result.errorMessage) {
      // it failed so show unsuccessful modal
      setError(result.errorMessage);
      toggleModal("failure");
    } else {
      // succeeded, trigger update for main book list
      updateBooklist();

      // show success modal
      setAction("Added")
      setSelectedBook(result);
      toggleModal("success");
    }
  };

  // delete a copy of a book
  const deleteCopy = async (book: Book) => {
    try {
      const result: any = await deleteBook(book._id);

      if (result && result.errorMessage) {
        // it failed so show unsuccessful modal
        setError(result.errorMessage);
        toggleModal("failure");
      } else {
        // succeeded, trigger update for main book list
        updateBooklist();

        // show success modal
        setAction("Deleted")
        setSelectedBook(book);
        toggleModal("success");
      }
    } catch (error) {
      console.error("Error deleting Book! ", error);
      setError("Error deleting book...try again?");
      toggleModal("failure");
    }
  };

  return (
    <>
      <div className="book-list">
        {booklist.length > 0 ? (
          booklist.map((book) => (
            <Card key={book._id} className="book-list-card" body>
              <Card.Img variant="top" src={book_icon} />
              <Card.Body className="book-details">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => addCopy(book.isbn)}
                >
                  Add Copy
                </Button>
                <br />
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => deleteCopy(book)}
                >
                  Delete Copy
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
        action={action}
        show={showSuccessModal}
        toggleModal={() => toggleModal("success")}
        book={selectedBook}
      />
      <FailureModal
        action={"Action"}
        show={showErrorModal}
        toggleModal={() => toggleModal("failure")}
        message={error}
      />
    </>
  );
};
export default AdminBookManagement;
