import { useState } from "react";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  // const host = "http://localhost:5005";

  const host = 'https://link-vink-server.vercel.app';

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showuser, setShowuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usercount, setUsercount] = useState(0);
  const [profileViews, setProfileViews] = useState(0);

  const loadUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("link-vink-authtoken");
    if (token) {
      try {
        const response = await fetch(`${host}/auth/userdetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authtoken: token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.data);
          setProfileViews(data.data.profileViews);
          localStorage.setItem("username", data.data.username);
          setIsAuthenticated(true);
        } else {
          console.error("Failed to load user:", data.message);
          setError(data.message || "Failed to load user");
        }
      } catch (err) {
        console.error("Error loading user:", err);
        setError("Failed to load user");
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("link-vink-authtoken", data.token);
        setUser(data.data);
        setIsAuthenticated(true);
        navigate("/admin");
        window.location.reload();
      } else {
        setError(data.message || "Failed to login");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Failed to login");
    }
    setLoading(false);
  };

  const register = async (name, username, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("link-vink-authtoken", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        navigate("/admin");
        window.location.reload();
      } else {
        setError(data.message || "Failed to register");
      }
    } catch (err) {
      console.error("Error registering:", err);
      setError("Failed to register");
    }
    setLoading(false);
  };

  const checkUsernameAvailability = async (username) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/auth/username/${username}`);
      const data = await response.json();
      setLoading(false);
      return data.available;
    } catch (error) {
      setError("Error checking username");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authtoken");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const fetchUserCount = async () => {
    try {
      const response = await fetch(`${host}/auth/usercount`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsercount(data.usercount);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Function to update social media handles
const updatesocial = async (socialHandles) => {
  setLoading(true); // Set loading state to true when starting the update
  const token = localStorage.getItem("link-vink-authtoken"); // Get the auth token
  if (!token) {
    setError("No authentication token found");
    setLoading(false); // Set loading state to false if no token
    return;
  }

  try {
    const response = await fetch(`${host}/auth/updatesocial`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: token,
      },
      body: JSON.stringify({ socialHandles }),
    });

    const data = await response.json();

    if (response.ok) {
      // Update the local user state with new social handles
      setUser((prevUser) => ({
        ...prevUser,
        socialHandles: data.socialHandles,
      }));
      setError(null); // Clear any previous error
    } else {
      setError(data.message || "Failed to update social handles");
    }
  } catch (err) {
    console.error("Error updating social handles:", err);
    setError("Failed to update social handles");
  } finally {
    setLoading(false); // Ensure loading state is set to false in all cases
  }
};

// function to update user profile 
const updateUserProfile = async (updates) => {
  setLoading(true);
  try {
    const response = await fetch(`${host}/auth/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authtoken: localStorage.getItem('link-vink-authtoken')
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setUser(data); // Update user state with new data
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error; // Re-throw error to handle it in the component
  } finally {
    setLoading(false);
  }
};


const getUser = async (username) => {
  try {
    const response = await fetch(`${host}/auth/getuser/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if(!response.ok){
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setShowuser(data);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
  return (
    <AuthContext.Provider
      value={{
        loadUser,
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        fetchUserCount,
        usercount,
        profileViews,
        updatesocial,
        checkUsernameAvailability, // Add this line
        updateUserProfile,
        getUser,
        showuser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
