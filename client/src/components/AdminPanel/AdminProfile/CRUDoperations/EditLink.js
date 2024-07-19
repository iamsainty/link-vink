import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const EditLink = ({ showModal, setShowModal, link, setEditingLink, handleSaveLink, handleCancelEdit }) => {
    if (!link) return null;

    const handleChange = (e) => {
        setEditingLink({ ...link, [e.target.name]: e.target.value });
    };


    return (
        <Modal show={showModal} onHide={handleCancelEdit} centered>
            <Modal.Header>
                <Modal.Title style={{ fontWeight: 'bold' }}>Edit Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {link.social === false ?
                        <Form.Group controlId="formTitle">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={link.title}
                                onChange={handleChange}
                                style={{ marginBottom: '2vh' }}
                            />
                        </Form.Group> :
                        <Form.Group controlId="formPlatform">
                            <Form.Control
                                as="select"
                                name="title"
                                value={link.title}
                                onChange={handleChange}
                                style={{ marginBottom: '2vh' }}
                            >
                                <option value="">Select platform</option>
                                <option value="Whatsapp">WhatsApp</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Twitter/X">Twitter/X</option>
                                <option value="Gmail">Gmail</option>
                                <option value="Linkedin">LinkedIn</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Telegram">Telegram</option>
                            </Form.Control>
                        </Form.Group>
                    }
                    <Form.Group controlId="formURL">
                        <Form.Control
                            type="text"
                            placeholder="URL"
                            name="url"
                            value={link.url}
                            onChange={handleChange}
                            style={{ marginBottom: '2vh' }}
                        />
                    </Form.Group>
                </Form>
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
                            onClick={handleCancelEdit}
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
                            onClick={handleSaveLink}
                        >
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default EditLink;
