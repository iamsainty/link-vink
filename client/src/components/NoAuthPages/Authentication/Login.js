import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const host = "http://localhost:5005";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.username === '') {
      setMsg('Enter your username');
      return;
    }
    if (credentials.password === '') {
      setMsg('Enter your password');
      return;
    }

    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: credentials.username, password: credentials.password }),
      });

      const json = await response.json();
      if (response.ok) {
        localStorage.setItem('authtoken', json.token); // Use token instead of authtoken
        navigate('/admin');
        window.location.reload(); // Reload the page to update the navbar
      } else {
        setMsg(json.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMsg('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('authtoken')) {
        navigate('/admin');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === 'username') {
      setMsg('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(to right, #753a88, #cc2b5e)' }}>
      <div className="card p-4 shadow-lg" style={{ width: '60vh', maxWidth: '90%', borderRadius: '3vh' }}>
        <h2 className="text-center mb-4" style={{ fontSize: '4vh', color: '#753a88' }}><b>Login to your account</b></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" id="username" onChange={handleChange} value={credentials.username} name='username' placeholder='Username' style={{ borderColor: '#753a88', borderWidth: '0.25vh' }} aria-describedby="usernameHelp" />
          </div>
          <div className="mb-3">
            <div className="input-group">
              <input type={passwordVisible ? 'text' : 'password'} className="form-control" id="password" onChange={handleChange} value={credentials.password} placeholder='Password' style={{ borderColor: '#753a88', borderWidth: '0.25vh', borderRight: '1vh' }} name='password' />
              <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)} style={{ cursor: 'pointer', borderColor: '#753a88', borderWidth: '0.25vh' }}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div style={{ fontSize: '1.75vh', color: 'red', paddingBottom: '1.5vh' }}>{msg}</div>
          <button type="submit" className="btn btn-block" style={{ width: '100%', background: 'linear-gradient(to right, #753a88, #cc2b5e)', color: '#fff', border: 'none', padding: '1vh', fontSize: '2.5vh', borderRadius: '5px' }}>Login</button>
          <p style={{ fontSize: '2vh', marginTop: '1.75vh', textAlign: 'center' }}>Don't have an account? <Link to="/register" style={{ color: '#753a88' }}>Register now</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
