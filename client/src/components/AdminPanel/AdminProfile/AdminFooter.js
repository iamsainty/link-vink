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

const Connectme = [
  {
    page: "Instagram",
    link: "https://www.instagram.com/its_shiviika/",
  },
  {
    page: "X (Twitter)",
    link: "https://x.com/Shiviika23",
  },
  {
    page: "Linkedin",
    link: "https://www.linkedin.com/in/janhvipandey/",
  },
  {
    page: "GitHub",
    link: "https://github.com/janhvi-pandey",
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
            <SectionTitle>Connect Me</SectionTitle>
            <ul className="list-group list-group-flush">
              {Connectme.map((link, index) => (
                <ListGroupItem key={index} className="list-group-item">
                  <ExternalLink href={link.link}>{link.page}</ExternalLink>
                </ListGroupItem>
              ))}
            </ul>
          </FooterSection>
        </div>
      </div>
    </FooterContainer>
  );
}

export default AdminFooter;
