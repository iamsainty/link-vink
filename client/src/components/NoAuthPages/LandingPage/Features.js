import React from 'react';
import styled from 'styled-components';
import { FaLink, FaUser, FaChartLine } from 'react-icons/fa';

// Container for Features section
const FeaturesContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;

// Title for Features section
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

// Wrapper for the feature cards
const FeaturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

// Card styling for each feature
const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem; /* Updated to match Benefits section */
  padding: 1.5rem; /* Reduced padding for consistency */
  max-width: 300px; /* Updated max-width to match Benefits section */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px); /* Updated to match Benefits section */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Updated to match Benefits section */
  }
`;

// Title of each feature card
const FeatureTitle = styled.h4`
  font-size: 1.1rem; /* Updated font size to match Benefits section */
  font-weight: 700;
  margin: 1rem 0;
  color: #333;
`;

// Description text of each feature card
const FeatureText = styled.p`
  font-size: 0.9rem; /* Updated font size to match Benefits section */
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

// Icon styling for each feature card
const Icon = styled.div`
  font-size: 2.5rem; /* Updated size for consistency */
  color: #cc2b5e;
  margin-bottom: 1rem; /* Updated margin for consistency */
`;

function Features() {
  return (
    <div id="features">
      <FeaturesContainer>
        <Title>Key Features</Title>
        <FeaturesWrapper>
          <FeatureCard>
            <Icon><FaLink /></Icon>
            <FeatureTitle>Simple Link Management</FeatureTitle>
            <FeatureText>Easily manage and share all your links from a single unified URL.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <Icon><FaUser /></Icon>
            <FeatureTitle>Customizable User Profiles</FeatureTitle>
            <FeatureText>Create a personalized profile with your unique username and link list.</FeatureText>
          </FeatureCard>
          <FeatureCard>
            <Icon><FaChartLine /></Icon>
            <FeatureTitle>Real-Time Analytics</FeatureTitle>
            <FeatureText>Track the performance of your shared links with real-time click statistics.</FeatureText>
          </FeatureCard>
        </FeaturesWrapper>
      </FeaturesContainer>
    </div>
  );
}

export default Features;
