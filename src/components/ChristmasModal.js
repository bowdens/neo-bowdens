import Modal from "react-bootstrap/Modal";

const ChristmasModal = ({show, onHide, title, children}) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" fullscreen="sm-down">
            <Modal.Header closeButton>
                <h3>{title ? title : "Merry Christmas!"}</h3>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
};

export default ChristmasModal;