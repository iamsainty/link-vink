import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.25rem;
  color: #333;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 2rem auto;
`;

const Button = styled.button`
  background: linear-gradient(to right, #753a88, #cc2b5e);
  color: white;
  font-weight: 600;
  border: none;
  padding: 10px 50px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function About() {
  return (
    <div id="about">
      <AboutContainer>
        <Title>About</Title>
        <Text>
          Link Vink is a powerful tool designed to simplify the process of
          sharing multiple links and social handles. Managing numerous profiles
          across various platforms can be overwhelming. Link Vink allows you to
          consolidate all your profiles, accounts, and handles into one place.
          By sharing a single, unified link, you provide easy access to all your
          connections.
        </Text>
        <Text>
          Our mission is to resolve the hassle of managing multiple links by
          unifying them in one accessible place. This approach makes it more
          efficient for you to manage and share your online presence seamlessly.
        </Text>
        <Text>Curios to know more about Link Vink? Read the blog.</Text>
        <a
          href="https://hey-sainty.vercel.app/blog/link-vink"
          className="text-white"
        >
          <Button>Read Blog</Button>
        </a>
      </AboutContainer>
    </div>
  );
}

export default About;
