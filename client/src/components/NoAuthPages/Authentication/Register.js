import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [credentials, setCredentials] = useState({ name: "", username: "", password: "" });
  const [msg, setMsg] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const host = "http://localhost:5005";

  const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9]{4,20}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^\S{6,15}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(credentials.username)) {
      setMsg('Username should have 4 to 20 characters of only lowercase alphabets and numbers.');
      return;
    }
    if (!validatePassword(credentials.password)) {
      setMsg('Password should have 6 to 15 characters and no spaces.');
      return;
    }

    try {
      const response = await fetch(`${host}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: credentials.name, username: credentials.username, password: credentials.password }),
      });

      const json = await response.json();
      if (response.ok) {
        localStorage.setItem('authtoken', json.token);
        navigate('/admin');
        window.location.reload(); // Reload the page to update the navbar
      } else {
        setMsg(json.message);
      }
    } catch (error) {
      setMsg('Registration error.');
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

  const checkUsernameAvailability = async (username) => {
    if (!validateUsername(username)) {
      setMsg('Username: 4-20 chars, lowercase, numbers.');
      return;
    }
    try {
      const response = await fetch(`${host}/auth/user/${username}`);
      const json = await response.json();
      if (response.ok && json.exists) {
        setMsg('Username taken.');
      } else {
        setMsg('');
      }
    } catch (error) {
      setMsg('Error checking username.');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === 'username') {
      checkUsernameAvailability(e.target.value);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(to right, #753a88, #cc2b5e)' }}>
      <div className="card p-4 shadow-lg" style={{ width: '60vh', maxWidth: '90%', borderRadius: '3vh' }}>
        <h2 className="text-center mb-4" style={{ fontSize: '4vh', color: '#753a88' }}><b>Register your account</b></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" id="name" onChange={handleChange} value={credentials.name} name='name' placeholder='Name' style={{ borderColor: '#753a88', borderWidth: '0.25vh' }} />
          </div>
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
          <button type="submit" className="btn btn-block" style={{ width: '100%', background: 'linear-gradient(to right, #753a88, #cc2b5e)', color: '#fff', border: 'none', padding: '1vh', fontSize: '2.5vh', borderRadius: '5px' }}>Register</button>
          <p style={{ fontSize: '2vh', marginTop: '1.75vh', textAlign: 'center' }}>Already have an account? <Link to="/login" style={{ color: '#753a88' }}>Login now</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
