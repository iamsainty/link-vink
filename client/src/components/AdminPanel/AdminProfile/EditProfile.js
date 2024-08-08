import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FaUser, FaUserCircle, FaLock } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext/authContext";
import Loading from "../../UIcomponent/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60vh;
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
  margin-right: 15px;
  color: ${(props) => (props.hashandle ? props.themecolor : "#333")};
`;

const Field = styled.span`
  flex-shrink: 0;
  margin-right: 15px;
  font-size: 16px;
  color: #555;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px 0;
  font-size: 14px;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  color: #333;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

const SaveButton = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  margin-top: 5vh;
`;

function EditProfile() {
  const { user, checkUsernameAvailability, loadUser, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        username: user.username || "",
        password: "",
      });
    } else {
      loadUser();
    }
    // eslint-disable-next-line
  }, [user]);

  const validateUsername = (username) => /^[a-z0-9]{4,20}$/.test(username);
  const validatePassword = (password) => /^\S{6,15}$/.test(password);

  const handleChange = async (e, key) => {
    const value = e.target.value;
    setProfile({ ...profile, [key]: value });

    if (key === "username") {
      if (value.toLowerCase() === "admin") {
        setError('The username "admin" cannot be used.');
      } else if (!validateUsername(value)) {
        setError("Username should have 4 to 20 characters of only lowercase alphabets and numbers.");
      } else {
        setError("");
        if (value !== user.username) {
          const isAvailable = await checkUsernameAvailability(value);
          if (!isAvailable) {
            setError("Username is already taken.");
          }
        }
      }
    } else if (key === "password" && !validatePassword(value)) {
      setError("Password should have 6 to 15 characters and no spaces.");
    } else {
      setError("");
    }
  };

  const saveProfile = async (key) => {
    if (error) return; // Prevent saving if there's an error

    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await updateUserProfile({ [key]: profile[key] });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <Container id="edit-profile">
      <LeftColumn>
        <Title>Edit Profile</Title>
        <Description>Edit and manage your profile information.</Description>
      </LeftColumn>
      <RightColumn>
        {[
          { id: 1, icon: <FaUser />, placeholder: "Name", key: "name" },
          { id: 2, icon: <FaUserCircle />, placeholder: "Username", key: "username" },
          { id: 3, icon: <FaLock />, placeholder: "New Password", key: "password", type: "password" },
        ].map((item) => (
          <Card key={item.id}>
            <IconWrapper hashandle={profile[item.key]}>{item.icon}</IconWrapper>
            <Field>{item.placeholder}</Field>
            <Input
              type={item.type || "text"}
              placeholder={item.placeholder}
              value={profile[item.key]}
              onChange={(e) => handleChange(e, item.key)}
            />
            {loading[item.key] ? (
              <div>
                <Loading />
              </div>
            ) : (
              <SaveButton
                className="btn btn-outline-dark"
                onClick={() => saveProfile(item.key)}
              >
                Save
              </SaveButton>
            )}
          </Card>
        ))}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </RightColumn>
    </Container>
  );
}

export default EditProfile;
