import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import UserNotExist from './UserNotExist'; // Import the component for non-existent users
import UserLinks from './UserLinks';
import UserIntro from './UserIntro';

const UserProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [userExists, setUserExists] = useState(false); // State to check if user exists
    
    useEffect(() => {
        if (username === 'admin') {
            navigate('/admin'); // redirect to admin page if username is admin
            return;
        }


        const fetchUserProfile = async () => {
            try {
                const userDetailsResponse = await fetch(`http://localhost:5005/auth/user/${username}`);

                const userData = await userDetailsResponse.json();
                if (userData.exists) {
                    setUserExists(true);
                }
                else {
                    return <UserNotExist />
                } // If user does not exist, display the UserNotExist component
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };
        fetchUserProfile();
    }, [username, navigate]);

    if (username === 'admin') {
        return null; // Prevent rendering of UserProfile component if username is admin
    }

    if (!userExists) {
        return <UserNotExist />; // Render the UserNotExist component if user does not exist
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <UserIntro username={username}/>
            <UserLinks username={username}/>
        </>
    );
};

export default UserProfile;
