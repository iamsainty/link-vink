import React, { useEffect, useState } from 'react';
import Loading from '../../UIcomponent/Loading';

const UserIntro = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = props.username;
                // Fetch user details
                const userDetailsResponse = await fetch(`http://localhost:5005/auth/user/${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!userDetailsResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await userDetailsResponse.json();
                setUser(userData.data);

                // Wait for at least 1 second
                await new Promise(resolve => setTimeout(resolve, 800));
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Handle the error case and stop loading
            }
        };

        fetchUserData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loading />
            </div>
        );
    }

    return (
        <>
            {/* Large Screen Layout */}
            <div className="d-none d-lg-block container" style={{ marginTop: '10vh' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '5vh' }}>
                    Hey, I am
                </h1>
                <h1 style={{
                    fontSize: '7vh',
                    fontWeight: '900',
                    backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: '5vh'
                }}>{user.name}</h1>
                <p className="lead" style={{ fontSize: '3.5vh', fontWeight: '500' }}>Let's connect to grow together!</p>
            </div>

            {/* Small Screen Layout */}
            <div className="d-lg-none container" style={{ marginTop: '5vh' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '4vh', textAlign: 'center' }}>
                    Hey, I am
                </h1>
                <h1 style={{
                    fontSize: '7vw',
                    fontWeight: '900',
                    backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: '3vh',
                    textAlign: 'center'
                }}>{user.name}</h1>
                <p className="lead" style={{ fontSize: '2.5vh', fontWeight: '600', textAlign: 'center' }}>Let's connect to grow together!</p>
            </div>
        </>
    );
};

export default UserIntro;
