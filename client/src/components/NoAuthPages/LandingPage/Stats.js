import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaUser, FaLink, FaEye } from "react-icons/fa";
import linkContext from "../../Context/LinkContext/linkContext";
import AuthContext from "../../Context/AuthContext/authContext";

// Styled Components
const Container = styled.div`
  padding: 4rem 2rem; /* Increased padding for better spacing */
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem; /* Updated for consistency with other sections */
  padding: 1.5rem; /* Adjusted padding for uniformity */
  width: 300px; /* Consistent max-width with other sections */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px); /* Updated hover effect for consistency */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Updated shadow for consistency */
  }
`;

const StatTitle = styled.h4`
  font-size: 1.1rem; /* Updated to match other sections */
  font-weight: 700;
  margin: 1rem 0;
  color: #333;
`;

const StatValue = styled.p`
  font-size: 1.5rem; /* Adjusted font size to match design consistency */
  color: #333;
  line-height: 1.6;
  margin: 0;
`;

const Icon = styled.div`
  font-size: 2.5rem; /* Consistent icon size with other sections */
  color: #cc2b5e;
  margin-bottom: 1rem; /* Updated margin for uniform spacing */
`;

function Stats() {
  const [users, setUsers] = useState(0);
  const [links, setLinks] = useState(0);
  const [clicks, setClicks] = useState(0);

  const linkcontext = useContext(linkContext);
  const { fetchAllLinks, linkcount, clickcount } = linkcontext;

  const authcontext = useContext(AuthContext);
  const { fetchUserCount, usercount } = authcontext;

  // fetch linkcount and clickcount from context by calling  fetchAllLinks function
  useEffect(() => {
    fetchAllLinks(); // fetch all links
    fetchUserCount();
    setLinks(linkcount); // set links state to linkcount
    setClicks(clickcount); // set clicks state to clickcount
    setUsers(usercount); // set users state to usercount
    // eslint-disable-next-line
  }, [fetchAllLinks, fetchUserCount]);

  return (
    <div id="stats">
      <Container>
        <Title>Stats</Title>
        <StatsWrapper>
          <StatCard>
            <Icon>
              <FaUser />
            </Icon>
            <StatTitle>Number of Users</StatTitle>
            <StatValue>{users}</StatValue>
          </StatCard>
          <StatCard>
            <Icon>
              <FaLink />
            </Icon>
            <StatTitle>Links Added</StatTitle>
            <StatValue>{links}</StatValue>
          </StatCard>
          <StatCard>
            <Icon>
              <FaEye />
            </Icon>
            <StatTitle>Clicks Received</StatTitle>
            <StatValue>{clicks}</StatValue>
          </StatCard>
        </StatsWrapper>
      </Container>
    </div>
  );
}

export default Stats;
