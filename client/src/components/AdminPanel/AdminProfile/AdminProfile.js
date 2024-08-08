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
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>{`Admin - Link Vink`}</title>
        <meta name="description" content={"Admin Profile on Link Vink."} />
        <meta
          name="keywords"
          content={`Admin, Link Vink, Profile, Social Links`}
        />
        <meta property="og:title" content={`Admin Profile - Link Vink`} />
        <meta
          property="og:description"
          content={"Admin Profile on Link Vink."}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Admin Profile - Link Vink`} />
        <meta
          name="twitter:description"
          content={"Admin Profile on Link Vink."}
        />
      </Helmet>
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
