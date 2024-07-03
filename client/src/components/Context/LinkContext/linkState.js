import { useState, useEffect } from "react";
import LinkContext from "./linkContext";
import { useNavigate } from "react-router-dom";

const LinkState = (props) => {
    const host = "http://localhost:5005";
    const navigate = useNavigate();

    const [links, setLinks] = useState([]);
    const [fetchComplete, setFetchComplete] = useState(false);

    const fetchLinks = async () => {
        const token = localStorage.getItem('authtoken');
        if (!token) {
            navigate('/login');
        } else {
            try {
                const response = await fetch(`${host}/link/links`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authtoken": token
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setLinks(data.links);
                } else {
                    console.error('Failed to fetch links:', data.message);
                }
                setFetchComplete(true);
            } catch (error) {
                console.error("Error fetching links:", error);
            }
        }
    };

    useEffect(() => {
        if (!fetchComplete) {
            fetchLinks();
        }
        // eslint-disable-next-line
    }, [fetchComplete]);

    const addLink = async (link) => {
        try {
            const response = await fetch(`${host}/link/newlink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("authtoken")
                },
                body: JSON.stringify(link),
            });
            const newLink = await response.json();
            setLinks([...links, newLink.savedLink]);
        } catch (error) {
            console.error("Error adding link:", error);
        }
    };

    const deleteLink = async (id) => {
        try {
            await fetch(`${host}/link/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("authtoken")
                },
            });
            setLinks(links.filter(link => link._id !== id));
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    const editLink = async (id, title, url, category) => {
        try {
            const response = await fetch(`${host}/link/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("authtoken")
                },
                body: JSON.stringify({ title, url, category }),
            });
            const updatedLink = await response.json();
            setLinks(links.map(link => link._id === id ? updatedLink.updatedLink : link));
        } catch (error) {
            console.error("Error editing link:", error);
        }
    };

    const updateLinkOrder = async (updatedLinks) => {
        try {
            const response = await fetch(`${host}/link/updateOrder`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem("authtoken")
                },
                body: JSON.stringify({ links: updatedLinks }),
            });
            if (response.ok) {
                setLinks(updatedLinks);
            } else {
                const data = await response.json();
                console.error('Failed to update link order:', data.message);
            }
        } catch (error) {
            console.error("Error updating link order:", error);
        }
    };

    return (
        <LinkContext.Provider value={{ links, addLink, deleteLink, editLink, fetchLinks, updateLinkOrder }}>
            {props.children}
        </LinkContext.Provider>
    );
};

export default LinkState;
