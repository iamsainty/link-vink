import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUserAlt, FaLink, FaChartLine } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext/authContext';
import linkContext from '../../Context/LinkContext/linkContext';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-align: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  margin-top: 25px;
  border-radius: 8px;
  width: 90%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`;

const IconWrapper = styled.div`
  margin-right: 15px;
  font-size: 1.5rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InteractiveText = styled.span`
  font-size: 1rem;
  color: #333;
`;

const NumberText = styled.span`
  font-size: 1.25rem;
  margin: 0 5px;
  font-weight: bold;
`;

function UserStats() {
  const [userStats, setUserStats] = useState({
    profileviews: 0,
    linkcount: 0,
    linkclicks: 0,
  });

  const { user, loadUser } = useContext(AuthContext);
  const { fetchLinks, userlinkcount, userclickcount } = useContext(linkContext);

  useEffect(() => {
    if (user) {
      fetchLinks(user._id);
      setUserStats({
        profileviews: user.profileViews,
        linkcount: userlinkcount,
        linkclicks: userclickcount,
      });
    } else {
      loadUser();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Container id="stats">
      <LeftColumn>
        <Title>Your Stats</Title>
        <Description>
          View your progress and quick analytics here, including your link count, profile views, link clicks.
        </Description>
      </LeftColumn>
      <RightColumn>
        <Card>
          <IconWrapper>
            <FaUserAlt />
          </IconWrapper>
          <TextWrapper>
            <InteractiveText>Your profile has been viewed <NumberText>{userStats.profileviews}</NumberText> times!</InteractiveText>
          </TextWrapper>
        </Card>
        <Card>
          <IconWrapper>
            <FaLink />
          </IconWrapper>
          <TextWrapper>
            <InteractiveText>You've created <NumberText>{userStats.linkcount}</NumberText> links!</InteractiveText>
          </TextWrapper>
        </Card>
        <Card>
          <IconWrapper>
            <FaChartLine />
          </IconWrapper>
          <TextWrapper>
            <InteractiveText>Your links have been clicked <NumberText>{userStats.linkclicks}</NumberText> times!</InteractiveText>
          </TextWrapper>
        </Card>
      </RightColumn>
    </Container>
  );
}

export default UserStats;
