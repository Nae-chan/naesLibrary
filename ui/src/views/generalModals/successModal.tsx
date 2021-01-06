import { Modal, Button } from "react-bootstrap";
import { Book } from "../../../../models/book";

interface ModalProps {
  action: string;
  show: boolean;
  toggleModal: any;
  book: Book;
}
const SuccessModal: React.FC<ModalProps> = ({
  action,
  show,
  toggleModal,
  book,
}) => {
  return (
    <Modal show={show} centered onHide={toggleModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{`Book ${action} Successfully!`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Title:</b> {book.title}
        <br />
        <b>Author:</b> {book.author}
        <br />
        <b>ISBN:</b> {book.isbn}
        <br />
        {action === "Checkout" && (
          <>
            <b>Due By:</b> {book.dueDate}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={toggleModal}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
