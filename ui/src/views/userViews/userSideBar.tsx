import React, { useState, FC } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Book } from "../../../../models/book";
import { returnUserBook } from "../../serviceCalls/userCalls";
import SuccessModal from "../generalModals/successModal";
import { emptyBook } from "../../utils/emptyBook";

interface UserSideBarProps {
  userBooks: Book[];
  updateUserBooks: any;
}
const UserSideBar: FC<UserSideBarProps> = ({ userBooks, updateUserBooks }) => {
  const [show, setShowModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);

  // Return a checked out book
  const returnBook = async (book: Book) => {
    const returnedBookResult: any = await returnUserBook(book._id);

    if (returnedBookResult) {
      // trigger update for users book list
      updateUserBooks();
      // show success modal
      setSelectedBook(book);
      toggleModal();
    }
  };

  // Toggle call response modal
  const toggleModal = () => setShowModal(!show);

  return (
    <>
      <Card>
        <Card.Header className="header">My Books</Card.Header>
        <Col>
          <ListGroup variant="flush">
            {userBooks.length > 0 &&
              userBooks.map((book: Book) => (
                <ListGroup.Item className="list-group-item" key={book._id}>
                  <Row>
                    <Col>
                      <b>Title:</b> {book.title}
                      <br />
                      <b>Author:</b> {book.author}
                      <br />
                      <b>Due By:</b> {book.dueDate}
                    </Col>
                    <Col className="return-button">
                      <Button
                        variant="outline-primary"
                        onClick={() => returnBook(book)}
                      >
                        Return
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Card>
      <SuccessModal
        action={"Returned"}
        show={show}
        toggleModal={toggleModal}
        book={selectedBook}
      />
    </>
  );
};

export default UserSideBar;
