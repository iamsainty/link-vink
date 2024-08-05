import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaSnapchatGhost,
} from "react-icons/fa";
import AuthContext from "../../Context/AuthContext/authContext";
import Loading from "../../UIcomponent/Loading"; // Import the loader component

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #753a88, #cc2b5e);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-align: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  margin-top: 25px;
  border-radius: 8px;
  width: 90%;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  font-size: 24px;
  margin-right: 10px;
  color: ${(props) => (props.hashandle ? props.themecolor : "#333")};
`;

const Domain = styled.span`
  flex-shrink: 0;
  margin-right: 10px;
  font-size: 15px;
  color: #333;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px 0;
  font-size: 15px;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  color: #333;
`;

const SaveButton = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
`;

const socialMediaData = [
  {
    id: 1,
    icon: <FaWhatsapp />,
    domain: "https://wa.me/",
    placeholder: "+91xxxxxxxxxx",
    themecolor: "#25D366",
    key: "whatsapp",
  },
  {
    id: 2,
    icon: <FaInstagram />,
    domain: "https://instagram.com/",
    placeholder: "username",
    themecolor: "#E1306C",
    key: "instagram",
  },
  {
    id: 3,
    icon: <FaTwitter />,
    domain: "https://twitter.com/",
    placeholder: "username",
    themecolor: "#1DA1F2",
    key: "x",
  },
  {
    id: 4,
    icon: <FaTelegramPlane />,
    domain: "https://t.me/",
    placeholder: "username",
    themecolor: "#0088cc",
    key: "telegram",
  },
  {
    id: 5,
    icon: <FaSnapchatGhost />,
    domain: "https://snapchat.com/add/",
    placeholder: "username",
    themecolor: "#FFFC00",
    key: "snapchat",
  },
];

function UserSocial() {
  const { user, loadUser, updatesocial } = useContext(AuthContext);
  const [loading, setLoading] = useState({});
  const [handles, setHandles] = useState({
    whatsapp: "",
    instagram: "",
    x: "",
    telegram: "",
    snapchat: "",
  });

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setHandles({
        whatsapp: user.socialHandles.whatsapp || "",
        instagram: user.socialHandles.instagram || "",
        x: user.socialHandles.x || "",
        telegram: user.socialHandles.telegram || "",
        snapchat: user.socialHandles.snapchat || "",
      });
    }
  }, [user]);

  const handleChange = (e, key) => {
    setHandles({ ...handles, [key]: e.target.value });
  };

  const saveHandle = async (key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await updatesocial({ [key]: handles[key] });
      setLoading((prev) => ({ ...prev, [key]: false }));
    } catch (error) {
      console.error(error);
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <Container id="manage-social">
      <LeftColumn>
        <Title>Social Handles</Title>
        <Description>
          Add your social media handles to keep all your connections in one
          place.
        </Description>
      </LeftColumn>
      <RightColumn>
        {socialMediaData.map((item) => (
          <Card key={item.id}>
            <IconWrapper
              themecolor={item.themecolor}
              hashandle={handles[item.key]}
            >
              {item.icon}
            </IconWrapper>
            <Domain>{item.domain}</Domain>
            <Input
              type="text"
              placeholder={item.placeholder}
              value={handles[item.key]}
              onChange={(e) => handleChange(e, item.key)}
            />
            {loading[item.key] ? (
              <div>
                <Loading /> {/* Render the loader component */}
              </div>
            ) : (
              <SaveButton
                className="btn btn-outline-dark"
                onClick={() => saveHandle(item.key)}
              >
                Save
              </SaveButton>
            )}
          </Card>
        ))}
      </RightColumn>
    </Container>
  );
}

export default UserSocial;
