import React from 'react';
import styled from 'styled-components';
import { FaDesktop, FaUser, FaLink } from 'react-icons/fa';

// Container for How It Works section
const Container = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;

// Title for How It Works section
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

// Wrapper for the step cards
const StepsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

// Card styling for each step
const StepCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem; /* Updated border-radius for consistency */
  padding: 1.5rem; /* Adjusted padding for uniformity */
  width: 300px; /* Consistent max-width with Benefits and Features sections */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px); /* Updated hover effect for consistency */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Updated shadow for consistency */
  }
`;

// Title of each step card
const StepTitle = styled.h4`
  font-size: 1.1rem; /* Updated font size to match Benefits and Features sections */
  font-weight: 700;
  margin: 1rem 0;
  color: #333;
`;

// Description text of each step card
const StepText = styled.p`
  font-size: 0.9rem; /* Updated font size to match Benefits and Features sections */
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

// Icon styling for each step card
const Icon = styled.div`
  font-size: 2.5rem; /* Consistent icon size with Benefits and Features sections */
  color: #cc2b5e;
  margin-bottom: 1rem; /* Updated margin for uniform spacing */
`;

function HowItWorks() {
  return (
    <div id="guide">
      <Container>
        <Title>Get Started</Title>
        <StepsWrapper>
          <StepCard>
            <Icon><FaDesktop /></Icon>
            <StepTitle>Visit Link Vink</StepTitle>
            <StepText>
              Go to <a href="https://link-vink.vercel.app" target="_blank" rel="noopener noreferrer">link-vink.vercel.app</a>
            </StepText>
          </StepCard>
          <StepCard>
            <Icon><FaUser /></Icon>
            <StepTitle>Register and Choose a Username</StepTitle>
            <StepText>
              Create your account by registering and picking a unique username.
            </StepText>
          </StepCard>
          <StepCard>
            <Icon><FaLink /></Icon>
            <StepTitle>Add Your Links</StepTitle>
            <StepText>
              Scroll down to add your social handles and other profile links. Share your unified link with others.
            </StepText>
          </StepCard>
        </StepsWrapper>
      </Container>
    </div>
  );
}

export default HowItWorks;
