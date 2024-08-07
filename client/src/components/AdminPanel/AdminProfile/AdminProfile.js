import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "./AdminNavbar";
import MainIntro from "./MainIntro";
import ManageLinks from "./CRUDoperations/ManageLinks";
import UserStats from "./UserStats";
import UserSocial from "./UserSocial";
import EditProfile from "./EditProfile";
import AdminFooter from "./AdminFooter";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 15px;
`;

function AdminProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("link-vink-authtoken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <AdminNavbar />
      <Container>
        <MainIntro />
        <ManageLinks />
        <UserSocial />
        <EditProfile />
        <UserStats />
      </Container>
      <AdminFooter />
    </>
  );
}

export default AdminProfile;
