import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  action: string;
  show: boolean;
  toggleModal: any;
  message: string;
}
const FailureModal: React.FC<ModalProps> = ({
  action,
  show,
  toggleModal,
  message,
}) => {
  return (
    <Modal show={show} centered onHide={toggleModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{`${action} Failed!`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Reason:</b> {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={toggleModal}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FailureModal;
