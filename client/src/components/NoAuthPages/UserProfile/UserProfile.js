import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/authContext";
import UserNotExist from "./UserNotExist";
import Loading from "../../UIcomponent/Loading";
import UserIntro from "./UserIntro";
import UserLinks from "./UserLinks";
import GetYours from "./GetYours";
import { Helmet } from "react-helmet-async";
import defaulimage from "../../../media/Link-Vink-share.png";

function UserProfile() {
  const { username } = useParams();
  const { getUser, showuser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  localStorage.setItem("username", username);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        await getUser(username);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    if (showuser) {
      setUser(showuser);
    }
  }, [showuser]);

  if (loading) {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Loading />
      </div>
    );
  }

  if (user && !user.exists) {
    return <UserNotExist />;
  }

  const profileImage = user ? user.data.profileImage : defaulimage;

  return (
    <>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(to right, #753a88, #cc2b5e)",
        }}
      >
        <Helmet>
          <title>
            {user
              ? `${user.data.name}'s Profile on Link Vink`
              : "User Profile - Link Vink"}
          </title>
          <meta
            name="description"
            content={
              user
                ? `Connect with ${user.data.name} through their Link Vink profile and social links.`
                : "Explore user profiles on Link Vink and connect through social links."
            }
          />
          <meta
            name="keywords"
            content={`${
              user ? `${user.data.name}, ${user.data.username},` : "User"
            } Link Vink, Profile, Social Links`}
          />
          <meta
            property="og:title"
            content={
              user
                ? `${user.data.name}'s Profile on Link Vink`
                : "User Profile - Link Vink"
            }
          />
          <meta
            property="og:description"
            content={
              user
                ? `Check out ${user.data.name}'s profile on Link Vink. Connect with ${user.data.name} through their social links and more.`
                : "User Profile on Link Vink."
            }
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:image" content={profileImage} />
          <meta property="og:site_name" content="Link Vink" />
          <meta property="og:locale" content="en_US" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={
              user
                ? `${user.data.name}'s Profile on Link Vink`
                : "User Profile - Link Vink"
            }
          />
          <meta
            name="twitter:description"
            content={
              user
                ? `Check out ${user.data.name}'s profile on Link Vink. Connect with ${user.data.name} through their social links and more.`
                : "User Profile on Link Vink."
            }
          />
          <meta name="twitter:image" content={profileImage} />
          <link rel="canonical" href={window.location.href} />
          <script type="application/ld+json">
            {`{
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "${user ? user.data.name : "User"}",
              "url": "${window.location.href}"
            }`}
          </script>
        </Helmet>
        <GetYours />
        <UserIntro />
        <UserLinks />
      </div>
    </>
  );
}

export default UserProfile;
