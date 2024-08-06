import React, { useContext, useEffect, useState } from "react";
import LinkContext from "../../../Context/LinkContext/linkContext";
import AddLink from "./AddLink";
import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaSadTear } from "react-icons/fa";
import AuthContext from "../../../Context/AuthContext/authContext";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s ease-in-out;

  .card {
    border: none;
  }

  .card-title,
  .card-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 2rem;
  text-align: center;
`;

const NoLinksMessage = styled.div`
  text-align: center;
  margin: 20px;
  padding: 20px;
  font-size: 18px;
  border-radius: 10px;
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .icon {
    font-size: 3em;
    margin-bottom: 10px;
  }
`;

const EditButton = styled(FiEdit)`
  cursor: pointer;
  margin-right: 15px;
`;

const DeleteButton = styled(FiTrash2)`
  cursor: pointer;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 768px) {
    > * {
      flex: 1 1 calc(50% - 20px);
      margin: 10px;
    }
  }

  @media (max-width: 767px) {
    > * {
      flex: 1 1 100%;
      margin: 10px 0;
    }
  }
`;

const ManageLinks = () => {
  const { links, userlinkcount, fetchLinks, deleteLink, editLink } =
    useContext(LinkContext);
  const { user, loadUser } = useContext(AuthContext);
  const [editingLink, setEditingLink] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  useEffect(() => {
    const fetchUserLinks = async () => {
      if (user) {
        await fetchLinks(user._id);
      }
      else{
        loadUser();
      }
    };
    fetchUserLinks();
    // eslint-disable-next-line
  }, [user]);

  const handleSaveLink = () => {
    if (!editingLink.title || !editingLink.url) {
      alert("Title and URL cannot be empty.");
      return;
    }
    editLink(editingLink._id, editingLink.title, editingLink.url);
    setEditingLink(null);
    setShowEditModal(false);
  };

  const handleDeleteLink = () => {
    if (linkToDelete) {
      deleteLink(linkToDelete._id);
      setShowDeleteModal(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setShowEditModal(false);
  };

  const renderLinks = (links) => {
    if (userlinkcount === 0) {
      return (
        <NoLinksMessage>
          <FaSadTear className="icon" />
          No links to display <br /> Add one now
        </NoLinksMessage>
      );
    }

    return links.map((link) => (
      <Card key={link._id}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {link.title.length > 20
                ? `${link.title.substring(0, 20)}...`
                : link.title}
            </h5>
            <p className="card-text">
              {link.url.length > 30
                ? `${link.url.substring(0, 30)}...`
                : link.url}
            </p>
            <div className="d-flex">
              <EditButton
                onClick={() => {
                  setEditingLink(link);
                  setShowEditModal(true);
                }}
              />
              <DeleteButton
                onClick={() => {
                  setShowDeleteModal(true);
                  setLinkToDelete(link);
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <Container id="manage-links">
      <Title>Manage Links</Title>

      <AddLink />

      <LinksContainer>{renderLinks(links)}</LinksContainer>

      <EditLink
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        link={editingLink}
        setEditingLink={setEditingLink}
        handleSaveLink={handleSaveLink}
        handleCancelEdit={handleCancelEdit}
      />

      <DeleteLink
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        handleDeleteLink={handleDeleteLink}
      />
    </Container>
  );
};

export default ManageLinks;
