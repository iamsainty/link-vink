import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { Card, Form, Button } from "react-bootstrap";
import Loading from "../../UIcomponent/Loading"; // Import the Loading component
import AuthContext from "../../Context/AuthContext/authContext";

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #753a88, #cc2b5e);
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;

  @media (max-width: 576px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const PasswordToggle = styled.span`
  cursor: pointer;
  border: none;
  background: transparent;
  color: #753a88;
  font-size: 1.2rem;
`;

const ErrorMsg = styled.div`
  font-size: 0.875rem;
  color: #d32f2f;
  padding-bottom: 1rem;
`;

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login, error } = authContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username) {
      setMsg("Enter your username");
      return;
    }
    if (!credentials.password) {
      setMsg("Enter your password");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      await login(credentials.username, credentials.password);
    } catch (err) {
      setMsg(error || 'Login error.');
    }
    setLoading(false); // Set loading to false
  };

  useEffect(() => {
    if (localStorage.getItem("link-vink-authtoken")) navigate("/admin");
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === "username") setMsg("");
  };

  return (
    <Background>
      <StyledCard className="shadow-lg">
        <h2
          className="text-center mb-4"
          style={{ color: "#753a88", fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Login to Your Account
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            style={{
              borderColor: "#753a88",
              borderWidth: "2px",
              fontSize: "1rem",
            }}
          >
            <Form.Control
              type="text"
              id="username"
              onChange={handleChange}
              value={credentials.username}
              name="username"
              placeholder="Username"
              aria-describedby="usernameHelp"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            style={{
              borderColor: "#753a88",
              borderWidth: "2px",
              fontSize: "1rem",
            }}
          >
            <div className="input-group">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                id="password"
                onChange={handleChange}
                value={credentials.password}
                placeholder="Password"
                name="password"
              />
              <PasswordToggle
                className="input-group-text"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </div>
          </Form.Group>
          <ErrorMsg>{msg}</ErrorMsg>
          {loading ? ( // Display Loading component if loading is true
            <Loading />
          ) : (
            <Button
              type="submit"
              className="w-100"
              style={{
                background: "#753a88",
                color: "#fff",
                border: "none",
                padding: "0.75rem",
                fontSize: "1rem",
              }}
            >
              Login
            </Button>
          )}
          <p className="text-center mt-3" style={{ fontSize: "0.875rem" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#753a88", textDecoration: "underline" }}
            >
              Register now
            </Link>
          </p>
        </Form>
      </StyledCard>
    </Background>
  );
};

export default Login;
