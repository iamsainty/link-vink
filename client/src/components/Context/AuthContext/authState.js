import { useState, useEffect } from 'react';
import AuthContext from './authContext';
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
    const host = "http://localhost:5005";
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const token=localStorage.getItem('authtoken');
            if (token) {
                try {
                    const response = await fetch(`${host}/auth/userdetails`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authtoken': token,
                        },
                    });

                    const data = await response.json();
                    if (response.ok) {
                        setUser(data.data);
                        setIsAuthenticated(true);
                    } else {
                        console.error('Failed to load user:', data.message);
                        setError(data.message || 'Failed to load user');
                    }
                } catch (err) {
                    console.error('Error loading user:', err);
                    setError('Failed to load user');
                }
            } else {
                console.error('No auth token found');
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${host}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            console.log(response)

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authtoken', data.token);
                setUser(data.data);
                setIsAuthenticated(true);
                navigate('/admin');
            } else {
                setError(data.message || 'Failed to login');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Failed to login');
        }
    };

    const register = async (name, username, password) => {
        try {
            const response = await fetch(`${host}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authtoken', data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                navigate('/admin');
            } else {
                setError(data.message || 'Failed to register');
            }
        } catch (err) {
            console.error('Error registering:', err);
            setError('Failed to register');
        }
    };

    const logout = () => {
        localStorage.removeItem('authtoken');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
