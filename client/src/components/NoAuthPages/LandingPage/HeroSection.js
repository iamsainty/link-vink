import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="container" style={{ marginTop: '10vh', textAlign: 'center' }}>
      {/* Large Screen */}
      <div className="d-none d-lg-block">
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
            Your Link Vink profile will be :
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
        <Link to="/register">
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

      {/* Small Screen */}
      <div className="d-md-none" style={{ padding: '2vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '4.5vh', marginBottom: '2vh' }}>
          Tired of sharing multiple links?
        </h1>
        <h1 style={{
          fontSize: '6vh',
          fontWeight: 'bold',
          backgroundImage: 'linear-gradient(to right, #cc2b5e, #753a88)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '2vh'
        }}>
          Welcome to Link Vink
        </h1>
        <p className="lead" style={{ fontSize: '2.5vh', marginBottom: '3vh' }}>
          A platform to unify all your links in one place.
        </p>
        <div className="row align-items-center mb-4" style={{justifyContent : 'center'}}>
          <div className="col-12 col-sm-8" style={{ fontSize: '2vh', marginBottom: '1vh' }}>
            Your future Link Vink profile:
          </div>
          <div className="col-12 col-sm-8" style={{
            fontSize: '1.8vh',
            backgroundColor: '#f0f0f0',
            borderRadius: '1.5vh',
            padding: '1.5vh 2vh',
            alignItems: 'center'
          }}>
            <span style={{ textDecoration: 'none' }}>
              &nbsp; https://link-vink.in/yourname &nbsp;
            </span>
          </div>
        </div>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button className="btn btn-lg btn-primary" style={{
            background: 'linear-gradient(to right, #cc2b5e, #753a88)',
            color: '#fff',
            border: 'none',
            padding: '1.5vh 3vh',
            fontSize: '2.5vh',
            borderRadius: '1.5vh',
            marginTop: '2vh',
            marginBottom: '2vh',
            width: '100%'
          }}>
            Claim your handle
          </button>
        </Link>
      </div>


    </div>
  );
}

export default HeroSection;
