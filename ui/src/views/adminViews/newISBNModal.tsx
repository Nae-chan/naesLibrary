import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { NewBookInput } from "../../../../models/book";
import { NewBook } from "../../../../models/book";
import { addNewBook } from "../../serviceCalls/adminCalls";

interface ModalProps {
  show: boolean;
  toggleModal: any;
  onSuccess: any;
}

const emptyNewBook = {
  isbn: "",
  title: "",
  author: "",
};

const NewISBNModal: React.FC<ModalProps> = ({
  show,
  toggleModal,
  onSuccess,
}) => {
  const [bookInput, setBookInput] = useState<NewBookInput>(emptyNewBook);

  const handleInputChange = (e: any) => {
    setBookInput({ ...bookInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newBookAdded: NewBook = await addNewBook(bookInput);
    if (newBookAdded._id) {
      onSuccess(newBookAdded);
    }
  };

  return (
    <Modal data-testid="isbn-modal" show={show} centered onHide={toggleModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Book</Modal.Title>
      </Modal.Header>
      <Form data-testid="isbn-form" onSubmit={(e)=>handleSubmit(e)}>
        <Modal.Body>
          <p> Please provide information about the new book.</p>
          <Form.Group as={Row} controlId="isbn">
            <Form.Label column sm={2}>
              ISBN
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="isbn"
                required
                type="text"
                placeholder="Isbn"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="title">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="title"
                required
                type="text"
                placeholder="Title"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="author">
            <Form.Label column sm={2}>
              Author
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="author"
                required
                type="text"
                placeholder="Author"
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewISBNModal;
