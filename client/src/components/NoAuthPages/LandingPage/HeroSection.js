import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="container" style={{ marginTop: '10vh', textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '5vh' }}>
        Tired of sharing a large number of links?
      </h1>
      <h1 style={{
        fontSize: '7vh',
        fontWeight: '900',
        backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        marginBottom: '5vh'
      }}>
        Welcome to Link Vink
      </h1>
      <p className="lead" style={{ fontSize: '3vh', fontWeight: '350', marginBottom: '5vh' }}>
        A platform to unify all your links in one place.
      </p>
      <div className="row align-items-center mb-5 justify-content-center">
        <div className="col-md-auto" style={{ fontSize: '3vh', padding: '1.5vh' }}>
          Your future Link Vink profile:
        </div>
        <div className="col-md-auto" style={{
          fontSize: '2.5vh',
          backgroundColor: '#e9e9e9',
          borderRadius: '5vh',
          padding: '1.75vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ textDecoration: 'none' }}>
            &nbsp; https://link-vink.in/yourname &nbsp;
          </span>
        </div>
      </div>
      <Link to="/signup">
        <button className="btn btn-lg" style={{
          background: 'linear-gradient(to right, #753a88, #cc2b5e)',
          color: '#fff',
          border: 'none',
          padding: '1.25vh',
          fontSize: '2.5vh',
          borderRadius: '1vh',
          marginTop: '5vh',
          marginBottom: '5vh'
        }}>
          &nbsp; Claim your handle &nbsp;
        </button>
      </Link>
    </div>
  );
}

export default HeroSection;
