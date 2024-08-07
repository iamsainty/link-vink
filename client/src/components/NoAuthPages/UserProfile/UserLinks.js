import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../Context/AuthContext/authContext";
import linkContext from "../../Context/LinkContext/linkContext";
import { FiCopy, FiCheck } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 75px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 0.5px solid black;
  margin: 20px 0;
  padding: 20px;
  display: flex;
  width: 60vw;
  align-items: center;
  justify-content: space-evenly;
  transition: transform 0.3s, box-shadow 0.3s;
  @media (max-width: 768px) {
    width: 90vw;
    flex-direction: column;
    align-items: flex-start;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.p`
  width: 40%;
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  padding-right: 10px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const CardLink = styled.div`
  width: 40%;
  text-decoration: none;
  color: #007bff;
  background-color: rgba(0, 0, 0, 0.075);
  padding: 10px 20px;
  border-radius: 20px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    width: 90%;
    background-color: white;
    padding-left: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

const CopyIcon = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  margin-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NoLinksMessage = styled.p`
  font-size: 1.25rem;
  color: white;
  margin-top: 20px;
`;

function UserLinks() {
  const { getUser, showuser } = useContext(AuthContext);
  const { links, fetchLinks, updatelinkclick } = useContext(linkContext);
  const [userid, setUserid] = useState(null);
  const [copiedLinkId, setCopiedLinkId] = useState(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser(username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    if (showuser) {
      setUserid(showuser.data._id);
    }
  }, [showuser]);

  useEffect(() => {
    if (userid) {
      fetchLinks(userid);
    }
    // eslint-disable-next-line
  }, [userid]);

  const handleLinkClick = async (url, id) => {
    try {
      await updatelinkclick(id);
      window.location.href = url;
    } catch (error) {
      console.error("Error updating click count or redirecting:", error);
    }
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkId(id);
    setTimeout(() => setCopiedLinkId(null), 1000);
  };

  return (
    <Container>
      {links && links.length > 0 ? (
        links.map((link) => (
          <Card key={link._id}>
            <CardTitle>{link.title}</CardTitle>
            <CardLink onClick={() => handleLinkClick(link.url, link._id)}>
              {link.url}
            </CardLink>
            <CopyIcon onClick={() => handleCopy(link.url, link._id)}>
              {copiedLinkId === link._id ? <FiCheck /> : <FiCopy />}
            </CopyIcon>
          </Card>
        ))
      ) : (
        <NoLinksMessage>No links available</NoLinksMessage>
      )}
    </Container>
  );
}

export default UserLinks;
