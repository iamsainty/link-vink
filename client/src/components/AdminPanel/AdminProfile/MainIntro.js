import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../Context/AuthContext/authContext";
import Loading from "../../UIcomponent/Loading";
import {
  FaUserEdit,
  FaTasks,
  FaChartBar,
  FaHeart,
  FaExclamationTriangle,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Greeting = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Username = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  background-image: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin: 1rem 0;
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 0.5rem 0 2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 60vw;
  margin-top: 5vh;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const ActionButton = styled(ScrollLink)`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  padding: 2rem;
  border-radius: 8px;

  svg {
    color: #753a88;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-weight: 10rem;
    font-size: 3rem;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    margin: 0.5rem 0 0;
  }
`;

const LinkSection = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 20px;
  margin-top: 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  margin: 1rem 0;

  p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  a {
    font-size: 1rem;
    color: #753a88;
    text-decoration: none;
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-right: 20px;
    }
  }

  .copy-button {
    background-color: black;
    border-radius: 15px;
    height: 100%;
    border: none;
    color: white;
    padding: 0 20px;
    font-size: 1rem;
    transition: background 0.3s;
    margin-left: 1rem;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const MainIntro = () => {
  const [greeting, setGreeting] = useState("");
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const { user, loadUser, loading, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      setGreeting("Good morning!");
    } else if (currentTime < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 seconds
    } else {
      setLoadingTimeout(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`link-vink.vercel.app/u/${user.username}`);
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 1500);
  };

  if (loading) {
    if (loadingTimeout) {
      return (
        <Container>
          <ErrorMessage>
            <FaExclamationTriangle />
            <h2>Oops!</h2>
            <p>
              Loading is taking too long. Please try refreshing the page, there
              might be a network issue.
            </p>
          </ErrorMessage>
        </Container>
      );
    }
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Container>
        <h1>Please log in to access your dashboard.</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Greeting>{greeting}</Greeting>
      <Username>{user.name}</Username>
      <WelcomeMessage>
        Welcome back! We're excited to have you here. <br />
        Manage your links, update your profile, check your stats, and more!
      </WelcomeMessage>
      <ProfileCard>
        <p>Copy & Share Your Link Vink URL</p>
        <LinkSection>
          <p>
            <Link to={`/u/${user.username}`}>
              link-vink.vercel.app/u/{user.username}
            </Link>
          </p>
          <button className="copy-button" onClick={handleCopy}>
            {copyStatus ? <FaCheck /> : <FaCopy />}
          </button>
        </LinkSection>
      </ProfileCard>
      <ActionContainer>
        <ActionButton
          to="manage-links"
          smooth={true}
          duration={500}
          className="btn btn-outline-dark"
        >
          <FaTasks /> <span>Manage Links</span>
        </ActionButton>
        <ActionButton
          to="manage-social"
          smooth={true}
          duration={500}
          className="btn btn-outline-dark"
        >
          <FaHeart /> <span>Social Handles</span>
        </ActionButton>
        <ActionButton
          to="edit-profile"
          smooth={true}
          duration={500}
          className="btn btn-outline-dark"
        >
          <FaUserEdit /> <span>Edit Profile</span>
        </ActionButton>
        <ActionButton
          to="stats"
          smooth={true}
          duration={500}
          className="btn btn-outline-dark"
        >
          <FaChartBar /> <span>View Stats</span>
        </ActionButton>
      </ActionContainer>
    </Container>
  );
};

export default MainIntro;
