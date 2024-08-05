import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="container d-flex" style={{ textAlign: 'center', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      {/* Large Screen */}
      <div className="d-none d-lg-block">
        <h1 style={{ fontWeight: 'bold', fontSize: '5vh', marginBottom: '4vh' }}>
          Overwhelmed by managing multiple links?
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
        <p className="lead" style={{ fontSize: '3vh', fontWeight: '300', marginBottom: '6vh' }}>
          The ultimate solution for consolidating all your links into one.
        </p>
        <div className="row align-items-center justify-content-center mb-6">
          <div className="col-md-auto" style={{ fontSize: '2.5vh', padding: '2vh' }}>
          Your Link Vink profile might look like:
          </div>
          <div className="col-md-auto" style={{
            fontSize: '2vh',
            backgroundColor: '#f0f0f0',
            borderRadius: '1vh',
            padding: '1.5vh 3vh',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ textDecoration: 'none' }}>
              &nbsp; https://link-vink.in/yourname &nbsp;
            </span>
          </div>
        </div>
        <Link to="/register">
          <button className="btn btn-lg" style={{
            background: 'linear-gradient(to right, #753a88, #cc2b5e)',
            color: '#fff',
            border: 'none',
            padding: '1.5vh 3vh',
            fontSize: '2.5vh',
            borderRadius: '1vh',
            marginTop: '4vh',
            marginBottom: '4vh'
          }}>
            Claim Your Handle
          </button>
        </Link>
      </div>

      {/* Small Screen */}
      <div className="d-md-none" style={{ padding: '4vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '4vh', marginBottom: '3vh' }}>
          Managing multiple links made easy
        </h1>
        <h1 style={{
          fontSize: '6vh',
          fontWeight: 'bolder',
          backgroundImage: 'linear-gradient(to right, #cc2b5e, #753a88)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '3vh'
        }}>
          Welcome to Link Vink
        </h1>
        <p className="lead" style={{ fontSize: '2.5vh', marginBottom: '3vh' }}>
          Consolidate all your links into a single, easy-to-share link.
        </p>
        <div className="row align-items-center justify-content-center mb-4">
          <div className="col-12" style={{ fontSize: '2.5vh', marginBottom: '2vh' }}>
            Your Link Vink profile might look like:
          </div>
          <div className="col-12" style={{
            fontSize: '2vh',
            backgroundColor: '#f9f9f9',
            borderRadius: '1vh',
            padding: '1.5vh',
            textAlign: 'center'
          }}>
            <span style={{ textDecoration: 'none' }}>
              &nbsp; https://link-vink.in/u/yourname &nbsp;
            </span>
          </div>
        </div>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button className="btn btn-lg" style={{
            background: 'linear-gradient(to right, #cc2b5e, #753a88)',
            color: '#fff',
            border: 'none',
            padding: '1.5vh 3vh',
            fontSize: '2.5vh',
            borderRadius: '1vh',
            marginTop: '3vh',
            width: '100%'
          }}>
            Claim Your Handle
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
