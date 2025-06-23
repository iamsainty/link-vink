import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";

const Navigateto = [
  { page: "Home", link: "/" },
  { page: "About", link: "about" },
  { page: "Benefits", link: "benefits" },
  { page: "Features", link: "features" },
  { page: "Use Guide", link: "guide" },
  { page: "Stats", link: "stats" },
];

const Connectme = [
  {
    page: "Instagram",
    link: "https://www.instagram.com/iam__sainty",
  },
  {
    page: "X (Twitter)",
    link: "https://twitter.com/iam__sainty",
  },
  {
    page: "Linkedin",
    link: "https://www.linkedin.com/in/iamsainty/",
  },
  {
    page: "GitHub",
    link: "https://github.com/iamsainty",
  },
  {
    page: "WhatsApp",
    link: "https://wa.me/918572937042",
  },
];

const otherProjects = [
  {
    page: "Hey Sainty",
    link: "https://hey-sainty.vercel.app/",
  },
  {
    page: "The Vidyapeeth Library",
    link: "https://the-vidyapeeth-library.web.app/",
  },
  {
    page: "Blinc Tac Toe",
    link: "https://blinc-tac-toe.vercel.app",
  },
];
const FooterContainer = styled.div`
  background: linear-gradient(to right, #753a88, #cc2b5e);
  color: white;
  margin-top: 0;
  padding-top: 8vh;
  padding-bottom: 10vh;
`;

const FooterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterSection = styled.div`
  margin: 5vh;
`;

const SectionTitle = styled.h2`
  font-size: 3vh;
  font-weight: bold;
  margin: 1vh 0 2vh;
`;

const ListGroupItem = styled.li`
  background: transparent;
  font-size: 2vh;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
`;

const ScrollFooterLink = styled(ScrollLink)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
`;

const FooterText = styled.p`
  font-size: 1.75vh;
  padding-left: 5vh;
`;

function Footer() {
  return (
    <FooterContainer>
      <div className="container text-left">
        <FooterGroup>
          <FooterSection>
            <SectionTitle>Navigate to</SectionTitle>
            <ul className="list-group list-group-flush">
              {Navigateto.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  {link.page === "Home" ? (
                    <FooterLink to={link.link}>{link.page}</FooterLink>
                  ) : (
                    <ScrollFooterLink
                      to={link.link}
                      smooth={true}
                      duration={500}
                      offset={-70}
                    >
                      {link.page}
                    </ScrollFooterLink>
                  )}
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
          <FooterSection>
            <SectionTitle>Connect Me</SectionTitle>
            <ul className="list-group list-group-flush">
              {Connectme.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  <ExternalLink href={link.link}>{link.page}</ExternalLink>
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
          <FooterSection>
            <SectionTitle>Other Projects</SectionTitle>
            <ul className="list-group list-group-flush">
              {otherProjects.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  <ExternalLink href={link.link}>{link.page}</ExternalLink>
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
        </FooterGroup>
      </div>
      <div className="container">
        <FooterText>
          Designed and Developed with &hearts; by{" "}
          <a
            href="https://hey-sainty.vercel.app/page/about"
            className="text-white"
          >
            Priyanshu Chaurasiya
          </a>
        </FooterText>
      </div>
    </FooterContainer>
  );
}

export default Footer;
