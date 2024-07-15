import React, { useContext, useState } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import LinkContext from '../../../Context/LinkContext/linkContext';

const AddLink = () => {
    const [link, setLink] = useState({ title: '', url: '', social: false });
    const [msg, setMsg] = useState('');

    const { addLink } = useContext(LinkContext);

    const handleAddLink = () => {
        if (!link.social && link.title.trim() === '') {
            setMsg('Title cannot be empty');
        } else if (link.url.trim() === '') {
            setMsg('URL cannot be empty');
        } else if (link.social && link.title === '') {
            setMsg('Please select a platform for social link');
        } else {
            addLink(link);
            setLink({ title: '', url: '', social: false });
            setMsg('');
        }
    };

    const handleToggle = () => {
        setLink(prevLink => ({ ...prevLink, social: !prevLink.social }));
    };

    const handleClick = (e) => {
        const { name, value } = e.target;
        setLink(prevLink => ({ ...prevLink, [name]: value }));
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        {link.social ? (
                            <Form.Control as="select" name="title" value={link.title} onChange={handleClick}>
                                <option value="">Select platform</option>
                                <option value="Whatsapp">WhatsApp</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Twitter/X">Twitter/X</option>
                                <option value="Gmail">Gmail</option>
                                <option value="Linkedin">LinkedIn</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Telegram">Telegram</option>
                            </Form.Control>
                        ) : (
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={link.title}
                                onChange={handleClick}
                            />
                        )}
                    </Form.Group>
                    <Form.Group controlId="formURL" className="mt-3">
                        <Form.Control
                            type="text"
                            placeholder="URL"
                            name="url"
                            value={link.url}
                            onChange={handleClick}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSocialSwitch" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Is this a social media link?"
                            name="social"
                            checked={link.social}
                            onChange={handleToggle}
                        />
                    </Form.Group>
                    {msg && <div style={{ color: 'red' }}>{msg}</div>}
                    <Row className="mt-3">
                        <Col>
                            <Button
                                className='d-none d-lg-inline'
                                style={{
                                    width: '30%',
                                    backgroundImage: 'linear-gradient(to right, #753a88, #a13373)',
                                    border: '0',
                                }}
                                onClick={handleAddLink}
                            >
                                Add Link
                            </Button>
                            <Button
                                className='d-lg-none'
                                style={{
                                    width: '100%',
                                    backgroundImage: 'linear-gradient(to right, #753a88, #a13373)',
                                    border: '0',
                                }}
                                onClick={handleAddLink}
                            >
                                Add Link
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddLink;
