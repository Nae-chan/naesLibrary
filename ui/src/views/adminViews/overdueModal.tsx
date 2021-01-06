import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Book } from "../../../../models/book";
import { fetchOverdueBooks } from "../../serviceCalls/adminCalls";

interface ModalProps {
  show: boolean;
  toggleModal: any;
}

const OverdueModal: React.FC<ModalProps> = ({ show, toggleModal }) => {
  const [overdueBooks, setOverdueBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getData = async () => {
      const books: Book[] = await fetchOverdueBooks();
      setOverdueBooks(books);
    };
    getData();
  }, []);

  return (
    <Modal
      size="lg"
      show={show}
      centered
      onHide={toggleModal}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Overdue Books</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Rented By</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {overdueBooks.length > 0 &&
              overdueBooks.map((book) => {
                return (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.rentedBy}</td>
                    <td>{book.dueDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" type="button" onClick={toggleModal}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OverdueModal;
