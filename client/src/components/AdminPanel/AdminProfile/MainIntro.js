import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/authContext';
import { FiCopy, FiCheck } from 'react-icons/fi';
import Loading from '../../UIcomponent/Loading';

const MainIntro = () => {
  const [totalProfileViews, setTotalProfileViews] = useState(0);
  const [totalLinkClicks, setTotalLinkClicks] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useContext(AuthContext);

  const host = 'https://link-vink-server.vercel.app';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = user;
        localStorage.setItem('username', userData.username);
        setTotalProfileViews(userData.profileViews);

        // Fetch user's links
        const linksResponse = await fetch(`${host}/link/links/${userData.username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!linksResponse.ok) {
          throw new Error('Failed to fetch user links');
        }

        const linksData = await linksResponse.json();
        const totalClicks = linksData.links.reduce((acc, link) => acc + link.clickCount, 0);
        setTotalLinkClicks(totalClicks);

        // Wait for at least 1 second
        await new Promise(resolve => setTimeout(resolve, 750));
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Handle the error case and stop loading
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      setGreeting('Good morning !!');
    } else if (currentTime < 18) {
      setGreeting('Good afternoon !!');
    } else {
      setGreeting('Good evening !!');
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://link-vink.vercel.app/${user.username}`)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1000); // Reset copy success state after 1 second
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Large Screen Layout */}
      <div className="d-none d-lg-block container" style={{ marginTop: '10vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '5vh' }}>
          {greeting}
        </h1>
        <h1 style={{
          fontSize: '7vh',
          fontWeight: '900',
          backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '5vh'
        }}>{user.name}</h1>
        <div className="row align-items-center mb-5">
          <div className="col-md-auto" style={{ fontSize: '3vh', padding: '1.5vh' }}>
            Your Link Vink profile:
          </div>
          <div className="col-md-auto" style={{ fontSize: '2.5vh', backgroundColor: '#e9e9e9', borderRadius: '5vh', padding: '1.75vh', width: 'auto' }}>
            <Link to={`/${user.username}`} style={{ textDecoration: 'none' }}>
              &nbsp; https://link-vink.vercel.app/{user.username} &nbsp;
            </Link>
            <span className="copy-icon" style={{ cursor: 'pointer' }} onClick={copyToClipboard}>
              {copySuccess ? <FiCheck /> : <FiCopy />}
            </span>
          </div>
        </div>
        <p className="lead" style={{ fontSize: '3vh', fontWeight: '350' }}>You are growing through Link Vink!</p>
        <p className="lead" style={{ fontSize: '3vh', fontWeight: '350' }}>Your profile got <strong>{totalProfileViews}</strong> profile views and <strong>{totalLinkClicks}</strong> link clicks.</p>
        <Link to="/stats">
          <button className="btn btn-lg" style={{ background: 'linear-gradient(to right, #753a88, #cc2b5e)', color: '#fff', border: 'none', padding: '1.25vh', fontSize: '2.5vh', borderRadius: '1vh', marginTop: '5vh', marginBottom: '5vh' }}>&nbsp; View more stats &nbsp;</button>
        </Link>
      </div>

      {/* Small Screen Layout */}
      <div className="d-lg-none container" style={{ marginTop: '5vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '4vh', textAlign: 'center' }}>
          {greeting}
        </h1>
        <h1 style={{
          fontSize: '7vw',
          fontWeight: '900',
          backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '3vh',
          textAlign: 'center'
        }}>{user.name}</h1>
        <div className="row align-items-center mb-4">
          <div className='col-12' style={{ fontSize: '4vw', padding: '2vw', textAlign: 'center', width: 'auto', margin: '0 auto' }}>
            Your Link Vink profile:
          </div>
          <div style={{
            fontSize: '3.5vw',
            backgroundColor: '#f5f5f5',
            borderRadius: '1rem',
            padding: '1.5vh',
            textAlign: 'center',
            width: 'auto',
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Link to={`/${user.username}`} style={{ textDecoration: 'none', color: '#333', wordBreak: 'break-all' }}>
              https://link-vink.vercel.app/{user.username}
            </Link>
            <span className="copy-icon" style={{ cursor: 'pointer', marginLeft: '1vw' }} onClick={copyToClipboard}>
              {copySuccess ? <FiCheck /> : <FiCopy />}
            </span>
          </div>
        </div>
        <p className="lead" style={{ fontSize: '4vw', fontWeight: '350', textAlign: 'center' }}>You are growing through Link Vink!</p>
        <p className="lead" style={{ fontSize: '4vw', fontWeight: '350', textAlign: 'center' }}>Your profile got <strong>{totalProfileViews}</strong> profile views and <strong>{totalLinkClicks}</strong> link clicks.</p>
        <Link to="/stats">
          <button className="btn btn-lg btn-block" style={{
            background: 'linear-gradient(to right, #753a88, #cc2b5e)',
            color: '#fff',
            border: 'none',
            padding: '2vw',
            fontSize: '4vw',
            borderRadius: '1rem',
            marginTop: '5vh',
            marginBottom: '5vh'
          }}>&nbsp; View more stats &nbsp;</button>
        </Link>
      </div>
    </>
  );
};

export default MainIntro;
