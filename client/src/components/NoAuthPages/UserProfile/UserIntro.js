import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../Context/AuthContext/authContext";
import Loading from "../../UIcomponent/Loading";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaSnapchatGhost,
} from "react-icons/fa";

const UserName = styled.h1`
  padding-top: 15vh;
  color: white;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10vh;
`;

const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  border: 0.5px solid black;
  padding: 10px 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.themecolor};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1em;

  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  font-size: 1.2em;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  @media (max-width: 600px) {
    display: none;
  }
`;

function UserIntro() {
  const [user, setUser] = useState(null);
  const username = localStorage.getItem("username");

  const { getUser, showuser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        await getUser(username);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    if (showuser) {
      setUser(showuser.data);
    }
  }, [showuser]);

  const socialHandles = [
    {
      handle: "whatsapp",
      platform: "Whatsapp",
      icon: <FaWhatsapp className="icon" />,
      url: "https://wa.me/",
    },
    {
      handle: "instagram",
      platform: "Instagram",
      icon: <FaInstagram className="icon" />,
      url: "https://instagram.com/",
    },
    {
      handle: "x",
      platform: "Twitter / X",
      icon: <FaTwitter className="icon" />,
      url: "https://x.com/",
    },
    {
      handle: "telegram",
      platform: "Telegram",
      icon: <FaTelegramPlane className="icon" />,
      url: "https://t.me/",
    },
    {
      handle: "snapchat",
      platform: "Snapchat",
      icon: <FaSnapchatGhost className="icon" />,
      url: "https://snapchat.com/add/",
    },
  ];

  const handleRedirect = (url, username) => {
    window.open(url + username, "_blank");
  };

  return (
    <div>
      {user ? (
        <div>
          <UserName>{user.name}</UserName>
          <SocialIcons className="container">
            {socialHandles.map((handle, index) => {
              const userHandle =
                user.socialHandles?.[handle.handle.toLowerCase()];
              return (
                userHandle && (
                  <Card
                    key={index}
                    onClick={() => handleRedirect(handle.url, userHandle)}
                    themecolor={
                      handle.platform === "Whatsapp"
                        ? "rgba(37, 211, 102, 0.75)"
                        : handle.platform === "Instagram"
                        ? "rgba(225, 48, 108, 0.75)"
                        : handle.handle === "x"
                        ? "rgba(29, 161, 242, 0.75)"
                        : handle.platform === "Telegram"
                        ? "rgba(0, 136, 204, 0.75)"
                        : handle.platform === "Snapchat"
                        ? "rgba(255, 252, 0, 0.75)"
                        : "#ddd"
                    }
                  >
                    <IconWrapper>
                      <IconContainer>{handle.icon}</IconContainer>
                      <IconText>{handle.platform}</IconText>
                    </IconWrapper>
                  </Card>
                )
              );
            })}
          </SocialIcons>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserIntro;
