import React, { useState, FC } from "react";
import { Button, Card } from "react-bootstrap";
import { Book } from "../../../../models/book";
import NewISBNModal from "./newISBNModal";
import OverdueModal from "./overdueModal";
import SuccessModal from "../generalModals/successModal";
import {emptyBook} from "../../utils/emptyBook"

interface AdminSideBarProps {
  updateAllBooks: any;
}

const AdminSideBar: FC<AdminSideBarProps> = ({ updateAllBooks }) => {
  const [showIsbnModal, setShowIsbnModal] = useState<boolean>(false);
  const [showOverdueModal, setShowOverdueModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [newBook, setNewBook] = useState<Book>(emptyBook);

  // toggle the right modal
  const toggleModal = (keyword: string) => {
    if (keyword === "isbn") {
      setShowIsbnModal(!showIsbnModal);
    } else if (keyword === "overdue") {
      setShowOverdueModal(!showOverdueModal);
    } else if (keyword === "success") {
      setShowSuccessModal(!showSuccessModal);
    }
  };

  // when successful book entry, swap modals
  const onSuccess = (book: Book) => {
    setNewBook(book);
    updateAllBooks();
    toggleModal("isbn");
    toggleModal("success");
  };

  return (
    <>
      <Card>
        <Card.Header className="header">Librarian Tools</Card.Header>
        <Card.Body className="librarian-tools">
          <Button
            variant="outline-primary"
            onClick={() => {
              toggleModal("isbn");
            }}
          >
            Add New ISBN
          </Button>
          <br />
          <Button
            variant="outline-primary"
            onClick={() => {
              toggleModal("overdue");
            }}
          >
            View Overdue Books
          </Button>
        </Card.Body>
      </Card>
      <NewISBNModal
        show={showIsbnModal}
        toggleModal={() => toggleModal("isbn")}
        onSuccess={onSuccess}
      />
      <OverdueModal
        show={showOverdueModal}
        toggleModal={() => toggleModal("overdue")}
      />
      <SuccessModal
        action={"Added"}
        show={showSuccessModal}
        toggleModal={() => toggleModal("success")}
        book={newBook}
      />
    </>
  );
};

export default AdminSideBar;
