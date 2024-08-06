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
  height: 90vh;
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
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-left: 10px;
`;

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
  const [errors, setErrors] = useState({}); // State for errors

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && user.socialHandles) {
      setHandles({
        whatsapp: user.socialHandles.whatsapp || "",
        instagram: user.socialHandles.instagram || "",
        x: user.socialHandles.x || "",
        telegram: user.socialHandles.telegram || "",
        snapchat: user.socialHandles.snapchat || "",
      });
    } else {
      setHandles({
        whatsapp: "",
        instagram: "",
        x: "",
        telegram: "",
        snapchat: "",
      });
    }
  }, [user]);
  

  const handleChange = (e, key) => {
    setHandles({ ...handles, [key]: e.target.value });
  };

  const saveHandle = async (key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: null })); // Reset error state for this key
    try {
      await updatesocial(handles);
      setLoading((prev) => ({ ...prev, [key]: false }));
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, [key]: "Failed to save. Please try again." }));
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <Container id="manage-social">
      <LeftColumn>
        <Title>Social Handles</Title>
        <Description>
          Add your social media handles to keep all your connections in one place.
        </Description>
      </LeftColumn>
      <RightColumn>
        <Card>
          <IconWrapper themecolor="#25D366" hashandle={handles.whatsapp}>
            <FaWhatsapp />
          </IconWrapper>
          <Domain>https://wa.me/</Domain>
          <Input
            type="text"
            placeholder="+91xxxxxxxxxx"
            value={handles.whatsapp}
            onChange={(e) => handleChange(e, "whatsapp")}
          />
          {loading.whatsapp ? (
            <div>
              <Loading /> {/* Render the loader component */}
            </div>
          ) : (
            <SaveButton className="btn btn-outline-dark" onClick={() => saveHandle("whatsapp")}>
              Save
            </SaveButton>
          )}
          {errors.whatsapp && <ErrorText>{errors.whatsapp}</ErrorText>} {/* Display error message */}
        </Card>
        
        <Card>
          <IconWrapper themecolor="#E1306C" hashandle={handles.instagram}>
            <FaInstagram />
          </IconWrapper>
          <Domain>https://instagram.com/</Domain>
          <Input
            type="text"
            placeholder="username"
            value={handles.instagram}
            onChange={(e) => handleChange(e, "instagram")}
          />
          {loading.instagram ? (
            <div>
              <Loading /> {/* Render the loader component */}
            </div>
          ) : (
            <SaveButton className="btn btn-outline-dark" onClick={() => saveHandle("instagram")}>
              Save
            </SaveButton>
          )}
          {errors.instagram && <ErrorText>{errors.instagram}</ErrorText>} {/* Display error message */}
        </Card>
        
        <Card>
          <IconWrapper themecolor="#1DA1F2" hashandle={handles.x}>
            <FaTwitter />
          </IconWrapper>
          <Domain>https://twitter.com/</Domain>
          <Input
            type="text"
            placeholder="username"
            value={handles.x}
            onChange={(e) => handleChange(e, "x")}
          />
          {loading.x ? (
            <div>
              <Loading /> {/* Render the loader component */}
            </div>
          ) : (
            <SaveButton className="btn btn-outline-dark" onClick={() => saveHandle("x")}>
              Save
            </SaveButton>
          )}
          {errors.x && <ErrorText>{errors.x}</ErrorText>} {/* Display error message */}
        </Card>
        
        <Card>
          <IconWrapper themecolor="#0088cc" hashandle={handles.telegram}>
            <FaTelegramPlane />
          </IconWrapper>
          <Domain>https://t.me/</Domain>
          <Input
            type="text"
            placeholder="username"
            value={handles.telegram}
            onChange={(e) => handleChange(e, "telegram")}
          />
          {loading.telegram ? (
            <div>
              <Loading /> {/* Render the loader component */}
            </div>
          ) : (
            <SaveButton className="btn btn-outline-dark" onClick={() => saveHandle("telegram")}>
              Save
            </SaveButton>
          )}
          {errors.telegram && <ErrorText>{errors.telegram}</ErrorText>} {/* Display error message */}
        </Card>
        
        <Card>
          <IconWrapper themecolor="#FFFC00" hashandle={handles.snapchat}>
            <FaSnapchatGhost />
          </IconWrapper>
          <Domain>https://snapchat.com/add/</Domain>
          <Input
            type="text"
            placeholder="username"
            value={handles.snapchat}
            onChange={(e) => handleChange(e, "snapchat")}
          />
          {loading.snapchat ? (
            <div>
              <Loading /> {/* Render the loader component */}
            </div>
          ) : (
            <SaveButton className="btn btn-outline-dark" onClick={() => saveHandle("snapchat")}>
              Save
            </SaveButton>
          )}
          {errors.snapchat && <ErrorText>{errors.snapchat}</ErrorText>} {/* Display error message */}
        </Card>
      </RightColumn>
    </Container>
  );
}

export default UserSocial;
