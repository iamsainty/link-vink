import React from 'react';
import styled from 'styled-components';
import { FaDollarSign, FaUserFriends, FaLock, FaLink, FaTags, FaChartBar } from 'react-icons/fa';

const BenefitsContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  height: auto;
  max-width: 300px;
  flex: 1 1 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 1rem 0;
  color: #333;
`;

const CardText = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

const Icon = styled.div`
  font-size: 2.5rem; /* Increased size for better visibility */
  color: #cc2b5e;
  margin-bottom: 1rem;
`;

function Benefits() {
  return (
    <div id="benefits">
      <BenefitsContainer>
        <Title>Benefits</Title>
        <CardsWrapper>
          <Card>
            <Icon><FaDollarSign /></Icon>
            <CardTitle>Free to Use</CardTitle>
            <CardText>Link Vink is completely free. No hidden costs or subscription fees.</CardText>
          </Card>
          <Card>
            <Icon><FaUserFriends /></Icon>
            <CardTitle>Easy and Simple</CardTitle>
            <CardText>Our tool is designed to be user-friendly, making the process of unifying and sharing links straightforward.</CardText>
          </Card>
          <Card>
            <Icon><FaLock /></Icon>
            <CardTitle>No Personal Information Required</CardTitle>
            <CardText>We respect your privacy. You can use Link Vink without providing any personal information.</CardText>
          </Card>
          <Card>
            <Icon><FaLink /></Icon>
            <CardTitle>One Place to Unify All Your Links</CardTitle>
            <CardText>Manage all your online profiles and social handles, making it easier for others to connect with you.</CardText>
          </Card>
          <Card>
            <Icon><FaTags /></Icon>
            <CardTitle>Categorize Your Links</CardTitle>
            <CardText>Easily categorize your links between social handles and other profiles for better organization.</CardText>
          </Card>
          <Card>
            <Icon><FaChartBar /></Icon>
            <CardTitle>Track Link Analytics</CardTitle>
            <CardText>Get insights into how your links are performing with detailed analytics and statistics.</CardText>
          </Card>
        </CardsWrapper>
      </BenefitsContainer>
    </div>
  );
}

export default Benefits;
