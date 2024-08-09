import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';
import { Card, Form, Button } from 'react-bootstrap';
import Loading from '../../UIcomponent/Loading'; // Import the Loading component
import AuthContext from '../../Context/AuthContext/authContext';
import { Helmet } from 'react-helmet-async';
import defaulimage from "../../../media/Link-Vink-share.png";

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

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, checkUsernameAvailability, error } = authContext;
  const [credentials, setCredentials] = useState({ name: '', username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (username) => /^[a-z0-9]{4,20}$/.test(username);
  const validatePassword = (password) => /^\S{6,15}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.username.toLowerCase() === 'admin') {
      setMsg('The username "admin" cannot be used.');
      return;
    }
    if (!validateUsername(credentials.username)) {
      setMsg('Username should have 4 to 20 characters of only lowercase alphabets and numbers.');
      return;
    }
    if (!validatePassword(credentials.password)) {
      setMsg('Password should have 6 to 15 characters and no spaces.');
      return;
    }
setLoading(true)
    try {
      await register(credentials.name, credentials.username, credentials.password);
    } catch (err) {
      setMsg(error || 'Registration error.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem('link-vink-authtoken')) navigate('/admin');
  }, [navigate]);

  const handleChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === 'username') {
      const isAvailable = await checkUsernameAvailability(e.target.value);
      setMsg(isAvailable ? '' : 'Username taken.');
    }
  };

  return (
    <Background>
      <Helmet>
        <title>Register - Link Vink </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Register to Your Link Vink Account" />
        <meta
          name="description"
          content="Register to your Link Vink account to manage and unify all your social and professional links in one place."
        />
        <meta
          name="keywords"
          content="Link Vink, Register, Account, Social Links, Professional Links"
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://link-vink.vercel.app/register" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://link-vink.vercel.app/register" />
        <meta property="og:title" content="Register to Your Link Vink Account" />
        <meta
          property="og:description"
          content="Register to your Link Vink account to manage and unify all your social and professional links in one place."
        />
        <meta property="og:image" content={defaulimage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://link-vink.vercel.app/register"
        />
        <meta
          property="twitter:title"
          content="Register to Your Link Vink Account"
        />
        <meta
          property="twitter:description"
          content="Register to your Link Vink account to manage and unify all your social and professional links in one place."
        />
        <meta property="twitter:image" content={defaulimage} />
      </Helmet>
      <StyledCard className="shadow-lg">
        <h2 className="text-center mb-4" style={{ color: '#753a88', fontSize: '2rem' }}>
          Register Your Account
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder='Name'
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder='Username'
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
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
          {msg && <ErrorMsg>{msg}</ErrorMsg>}
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
              Register
            </Button>
          )}
             <p className="text-center mt-3" style={{ fontSize: "0.875rem" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#753a88", textDecoration: "underline" }}
            >
              Login now
            </Link>
          </p>
        </Form>
      </StyledCard>
    </Background>
  );
};

export default Register;
