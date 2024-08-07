import React, { useContext, useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import LinkContext from "../../../Context/LinkContext/linkContext";

const AddLink = () => {
  const [link, setLink] = useState({ title: "", url: "" });
  const [msg, setMsg] = useState("");

  const { addLink } = useContext(LinkContext);

  const handleAddLink = () => {
    if (link.title.trim() === "") {
      setMsg("Title cannot be empty");
    } else if (link.url.trim() === "") {
      setMsg("URL cannot be empty");
    } else {
      addLink(link);
      setLink({ title: "", url: "" });
      setMsg("");
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLink((prevLink) => ({ ...prevLink, [name]: value }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={link.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formURL" className="mt-3">
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={link.url}
              onChange={handleChange}
            />
          </Form.Group>
          {msg && <div style={{ color: "red" }}>{msg}</div>}
          <Row className="mt-3">
            <Col>
              <Button
                className="d-none d-lg-inline"
                style={{
                  width: "30%",
                  backgroundImage: "linear-gradient(to right, #753a88, #a13373)",
                  border: "0",
                }}
                onClick={handleAddLink}
              >
                Add Link
              </Button>
              <Button
                className="d-lg-none"
                style={{
                  width: "100%",
                  backgroundImage: "linear-gradient(to right, #753a88, #a13373)",
                  border: "0",
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
