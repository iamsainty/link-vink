import React, { useContext, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import linkContext from '../../../Context/LinkContext/linkContext';
import styled from 'styled-components';

const AddLink = () => {
    const [link, setLink] = useState({ title: '', url: '', social: false });
    const [msg, setMsg] = useState('');

    const context = useContext(linkContext);
    const { addLink } = context;

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

    const handletoggle = () => { // Toggle social link
        setLink({ ...link, social: !link.social });
    };

    const handleChange = (e) => {
        setLink({ ...link, [e.target.name]: e.target.value }); // Update link state
    };

    const Card = styled.div`
    background-color: #fff;
    border-radius: 1vh;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    padding: 20px;
    transition: transform 0.3s ease-in-out;


    .card {
        border: none;
    }
`;

    return (
        <Card style={{maxWidth: '100%', borderRadius: '2vh' }}>
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
                <Form.Group controlId="formSocialToggle">
                    <Form.Check
                        type="switch"
                        id="socialSwitch"
                        label="Is this a social media link?"
                        name="social"
                        checked={link.social}
                        onChange={handletoggle}
                        style={{ marginBottom: '2vh' }}
                    />
                </Form.Group>
                <div style={{ color: 'red', paddingBottom: '2vh' }}>{msg}</div>
                <Row>
                    <Col>
                        <Button
                        className='d-none d-lg-inline'
                            style={{
                                width: '30%',
                                backgroundImage: 'linear-gradient(to right, #753a88, #a13373)',
                                border: '0',
                                borderRadius: '1vh',
                                marginBottom: '2vh',
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
                                borderRadius: '1vh',
                            }}
                            onClick={handleAddLink}
                        >
                            Add Link
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AddLink;
