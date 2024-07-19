import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const DeleteLink = ({ showModal, setShowModal, handleDeleteLink }) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this link?
            </Modal.Body>
            <Modal.Footer>
                <Row style={{ width: '100%' }}>
                    <Col>
                        <Button
                            style={{
                                width: '100%',
                                backgroundImage: 'linear-gradient(to right, #753a88, #a13373)',
                                border: '0',
                                borderRadius: '1vh',
                                fontSize: '2vh'
                            }}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            style={{
                                width: '100%',
                                backgroundImage: 'linear-gradient(to right, #a13373, #cc2b5e)',
                                border: '0',
                                borderRadius: '1vh',
                                fontSize: '2vh'
                            }}
                            onClick={handleDeleteLink}
                        >
                            Confirm
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteLink;
