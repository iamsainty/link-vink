import React from 'react';
import { Link } from 'react-router-dom';
import ErrorNavbar from '../ErrorNavbar';

function UserNotExist() {
  return (
    <>
      <ErrorNavbar />
      <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '90vh', 
          textAlign: 'center', 
          padding: '0 2vh' 
      }}>
        <h1 style={{
            fontSize: '8vh',
            fontWeight: '900',
            backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '2vh'
          }}>
          Oops!!
        </h1>
        <p style={{ fontSize: '3.5vh', fontWeight: '500', marginBottom: '2vh' }}>
          The username you're looking for doesn't exist.
        </p>
        <p style={{ fontSize: '3vh', fontWeight: '400', marginBottom: '4vh' }}>
          Want to claim it for yourself?
        </p>
        <Link to="/register" style={{
            textDecoration: 'none',
            color: 'white',
            padding: '1.5vh 3vh',
            fontSize: '2.5vh',
            fontWeight: '600',
            backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s'
          }}
        >
          Register Now
        </Link>
      </div>
    </>
  );
}

export default UserNotExist;
