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
import defaulimage from "../../../media/Link-Vink-share.png";

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
        <title>Admin Dashboard - Link Vink</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Admin Dashboard - Link Vink" />
        <meta
          name="description"
          content="Access and manage your Link Vink account from the Admin Dashboard. Update your profile, manage links, view user statistics, and more."
        />
        <meta
          name="keywords"
          content="Link Vink, Admin Dashboard, Manage Links, Profile, User Statistics"
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://link-vink.vercel.app/admin" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://link-vink.vercel.app/admin" />
        <meta property="og:title" content="Admin Dashboard - Link Vink" />
        <meta
          property="og:description"
          content="Manage your Link Vink account through the Admin Dashboard. Update your profile, manage links, view user statistics, and more."
        />
        <meta property="og:image" content={defaulimage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://link-vink.vercel.app/admin"
        />
        <meta property="twitter:title" content="Admin Dashboard - Link Vink" />
        <meta
          property="twitter:description"
          content="Manage your Link Vink account through the Admin Dashboard. Update your profile, manage links, view user statistics, and more."
        />
        <meta property="twitter:image" content={defaulimage} />
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
