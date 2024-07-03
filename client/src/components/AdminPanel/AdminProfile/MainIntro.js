import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/authContext';
import { MdContentCopy, MdDone } from 'react-icons/md';

const MainIntro = () => {
  const [totalProfileViews, setTotalProfileViews] = useState(0);
  const [totalLinkClicks, setTotalLinkClicks] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [greeting, setGreeting] = useState('');

  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');

        // Fetch user details
        const userDetailsResponse = await fetch('http://localhost:5005/auth/userdetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': authToken,
          },
        });

        if (!userDetailsResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await userDetailsResponse.json();
        setTotalProfileViews(userData.data.profileViews);

        // Fetch user's links
        const linksResponse = await fetch(`http://localhost:5005/link/links/${userData.data._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': authToken,
          },
        });

        if (!linksResponse.ok) {
          throw new Error('Failed to fetch user links');
        }

        const linksData = await linksResponse.json();
        const totalClicks = linksData.links.reduce((acc, link) => acc + link.clickCount, 0);
        setTotalLinkClicks(totalClicks);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

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
    navigator.clipboard.writeText(`https://link-vink.in/${user.username}`)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1000); // Reset copy success state after 1 second
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state until user data is fetched
  }

  return (
    <div className="container" style={{ marginTop: '10vh' }}>
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
        <div className="col-md-auto" style={{ fontSize: '2.5vh', backgroundColor: '#e9e9e9', borderRadius: '5vh', padding: '1.75vh' }}>
          <a href={`https://link-vink.in/${user.username}`} style={{ textDecoration: 'none' }}>
            &nbsp; https://link-vink.in/{user.username} &nbsp;
          </a>
          <span className="copy-icon" style={{ cursor: 'pointer' }} onClick={copyToClipboard}>
            {copySuccess ? <MdDone /> : <MdContentCopy />}
          </span>
        </div>
      </div>
      <p className="lead" style={{ fontSize: '3vh', fontWeight: '350' }}>You are growing through Link Vink!</p>
      <p className="lead" style={{ fontSize: '3vh', fontWeight: '350' }}>Your profile got <strong>{totalProfileViews}</strong> profile views and <strong>{totalLinkClicks}</strong> link clicks.</p>
      <Link to="/stats">
        <button className="btn btn-lg" style={{ background: 'linear-gradient(to right, #753a88, #cc2b5e)', color: '#fff', border: 'none', padding: '1.25vh', fontSize: '2.5vh', borderRadius: '1vh', marginTop: '5vh', marginBottom: '5vh' }}>&nbsp; View more stats &nbsp;</button>
      </Link>
    </div>
  );
};

export default MainIntro;
