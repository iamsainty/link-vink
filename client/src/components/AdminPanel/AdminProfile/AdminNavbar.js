import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaHome, FaLink, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";

const Navbar = styled.nav`
  background: linear-gradient(to right, #753a88, #cc2b5e);
  height: 7vh;
`;

const NavItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  width: 100%;
  text-align: center;
  &:hover {
    color: #ffffff; /* Maintain the text color on hover */
    text-decoration: none; /* Maintain no underline on hover */
    cursor: pointer; /* Change the cursor to pointer */
  }
`;

const NavScrollLink = styled(ScrollLink)`
  color: #ffffff;
  text-decoration: none;
  margin-right: 5vh;
  &:hover {
    color: #ffffff; /* Maintain the text color on hover */
    text-decoration: none; /* Maintain no underline on hover */
    cursor: pointer; /* Change the cursor to pointer */
  }
`;

const NavIcon = styled.div`
  color: #ffffff;
  text-align: center;
`;

const DesktopNav = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const MobileNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media (min-width: 992px) {
    display: none;
  }
`;

const Brand = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5vh;
  &:hover {
    color: #ffffff; /* Maintain the text color on hover */
    text-decoration: none; /* Maintain no underline on hover */
    cursor: pointer; /* Change the cursor to pointer */
  }
`;

function AdminNavbar() {
  const handleLogout = (navigate) => {
    localStorage.removeItem("authtoken");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();

  return (
    <Navbar className="navbar navbar-expand-lg">
      <MobileNav>
        <NavItem>
          <NavLink to="/admin">
            <NavIcon>
              <FaHome />
            </NavIcon>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin">
            <NavIcon>
              <FaLink />
            </NavIcon>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin">
            <NavIcon>
              <FaChartBar />
            </NavIcon>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/" onClick={() => handleLogout(navigate)}>
            <NavIcon>
              <FaSignOutAlt />
            </NavIcon>
          </NavLink>
        </NavItem>
      </MobileNav>

      <DesktopNav>
        <Brand to="/admin">Link Vink</Brand>
        <div>
          <NavScrollLink to="manage-links" smooth duration={500}>
            Links
          </NavScrollLink>
          <NavScrollLink to="manage-social" smooth duration={500}>
            Social
          </NavScrollLink>
          <NavScrollLink to="edit-profile" smooth duration={500}>
            Profile
          </NavScrollLink>
          <NavScrollLink to="stats" smooth duration={500}>
            Stats
          </NavScrollLink>
          <NavLink
            to="/"
            onClick={() => handleLogout(navigate)}
            style={{ marginRight: "5vh" }}
          >
            Logout
          </NavLink>
        </div>
      </DesktopNav>
    </Navbar>
  );
}

export default AdminNavbar;
