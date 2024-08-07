import { useState } from "react";
import LinkContext from "./linkContext";

const LinkState = (props) => {
  // const host = "http://localhost:5005";
  const host = 'https://link-vink-server.vercel.app';
  const [links, setLinks] = useState([]);
  const [userlinkcount, setUserlinkcount] = useState(0);
  const [userclickcount, setUserclickcount] = useState(0);
  const [linkcount, setLinkcount] = useState(0);
  const [clickcount, setClickcount] = useState(0);

  const fetchLinks = async (userId) => {
    try {
      const response = await fetch(`${host}/link/userlinks/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLinks(data.links);
        setUserlinkcount(data.linkcount);
        setUserclickcount(data.clickcount);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const addLink = async (link) => {
    try {
      const response = await fetch(`${host}/link/newlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("authtoken"),
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
          authtoken: localStorage.getItem("authtoken"),
        },
      });
      setLinks(links.filter((link) => link._id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const editLink = async (id, title, url) => {
    try {
      const response = await fetch(`${host}/link/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({ title, url }),
      });
      const updatedLink = await response.json();
      setLinks(
        links.map((link) => (link._id === id ? updatedLink.updatedLink : link))
      );
    } catch (error) {
      console.error("Error editing link:", error);
    }
  };

  const fetchAllLinks = async () => {
    try {
      const response = await fetch(`${host}/link/links`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const linksData = await response.json();
      setLinkcount(linksData.linkcount);
      setClickcount(linksData.clickcount);
    } catch (error) {
      console.error("Error fetching all links:", error);
    }
  };

  const updatelinkclick = async (linkid) => {
    try {
      const response = await fetch(`${host}/link/click/${linkid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedLink = await response.json();
      return updatedLink.clickCount;
      
    } catch (error) {
      console.error("Error updating click count:", error);
      return null; // or handle error as needed
    }
  }
  

  return (
    <LinkContext.Provider
      value={{
        links,
        addLink,
        deleteLink,
        editLink,
        fetchLinks,
        userlinkcount,
        userclickcount,
        linkcount,
        clickcount,
        fetchAllLinks,
        updatelinkclick
      }}
    >
      {props.children}
    </LinkContext.Provider>
  );
};

export default LinkState;
