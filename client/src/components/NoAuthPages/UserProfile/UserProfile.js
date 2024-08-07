import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/authContext";
import UserNotExist from "./UserNotExist";
import Loading from "../../UIcomponent/Loading";
import UserIntro from "./UserIntro";
import UserLinks from "./UserLinks";
import GetYours from "./GetYours";

function UserProfile() {
  const { username } = useParams();
  const { getUser, showuser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  localStorage.setItem( "username", username);

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
  }, [username ]);

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

  return (
    <>
      <div style={{width: '100vw', minHeight: '100vh', backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)'}}>
        <GetYours />
        <UserIntro />
        <UserLinks />
      </div>
    </>
  );
}

export default UserProfile;
