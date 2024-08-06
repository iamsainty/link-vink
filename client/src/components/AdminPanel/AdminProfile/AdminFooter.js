import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";

const Navigateto = [
  { page: "Home", link: "/admin" },
  { page: "Manage Links", link: "manage-links" },
  { page: "Social Handles", link: "manage-social" },
  { page: "Edit Profile", link: "edit-profile" },
  { page: "View Stats", link: "stats" },
];

const Contactme = [
  {
    platform: "Phone",
    value: " +91 8572937042",
    link: "tel:+918572937042",
  },
  {
    platform: "E-Mail",
    value: "ppriyanshuchaurasia@gmail.com",
    link: "mailto:ppriyanshuchaurasia@gmail.com",
  },
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

const pages = [
  {
    page: "Disclaimer",
    link: "/disclaimer",
  },
  {
    page: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    page: "Terms of Service",
    link: "/terms-of-service",
  },
  {
    page: "GDPR Compliance",
    link: "/gdpr-compliance",
  },
];

const FooterContainer = styled.div`
  background: linear-gradient(to right, #753a88, #cc2b5e);
  color: white;
  margin-top: 0;
  padding-top: 8vh;
  padding-bottom: 10vh;
`;

const FooterSection = styled.div`
  margin: 3vh;
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
  margin-top: 5vh;
`;

function AdminFooter() {
  return (
    <FooterContainer>
      <div className="container text-left">
        <div className="row align-items-start">
          <FooterSection className="col">
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
          <FooterSection className="col">
            <SectionTitle>Contact Me</SectionTitle>
            <ul className="list-group list-group-flush">
              {Contactme.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  <ExternalLink href={link.link}>
                    {link.platform}
                    <br />
                    {link.value}
                  </ExternalLink>
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
          <FooterSection className="col">
            <SectionTitle>Connect Me</SectionTitle>
            <ul className="list-group list-group-flush">
              {Connectme.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  <ExternalLink href={link.link}>{link.page}</ExternalLink>
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
          <FooterSection className="col">
            <SectionTitle>Legal Pages</SectionTitle>
            <ul className="list-group list-group-flush">
              {pages.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  <FooterLink to={link.link}>{link.page}</FooterLink>
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
        </div>
      </div>
      <div className="container">
        <FooterText>
          Designed and Developed with &hearts; by Priyanshu Chaurasiya
        </FooterText>
      </div>
    </FooterContainer>
  );
}

export default AdminFooter;
