import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  background: linear-gradient(to right, #753a88, #cc2b5e);
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  margin-left: 3vh;
  &:hover {
    color: #ffffff; /* Maintain the text color on hover */
    text-decoration: none; /* Maintain no underline on hover */
    cursor: pointer; /* Change the cursor to pointer */
  }
`;

const MobileView = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  @media (min-width: 992px) {
    display: none;
  }
`;

const DesktopView = styled.div`
  display: none;
  width: 100%;
  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
  }
`;

const NavItem = styled.div`
  display: flex;
  justify-content: ${({ justifycontent }) => justifycontent || "start"};
  align-items: center;
  margin: ${({ margin }) => margin || "0"};
`;

function ErrorNavbar() {
    return (
        <NavbarContainer className="navbar navbar-expand-lg">
          {/* Mobile view */}
          <MobileView className="navbar-nav d-lg-none">
            <NavItem className="nav-item">
              <NavLink to="/" className="nav-link" style={{fontWeight: 'bold'}}>
                Link Vink
              </NavLink>
            </NavItem>
          </MobileView>
    
          {/* Desktop view */}
          <DesktopView className="navbar-nav d-lg-flex row">
            <NavItem className="col align-items-start mx-5">
              <NavLink to="/" className="nav-link" style={{fontWeight: 'bold'}}>
                Link Vink
              </NavLink>
            </NavItem>
            <NavItem className="col-md-auto" justifycontent="end">
              <NavLink to="/register" className="nav-link text-center">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link text-center">
                Login
              </NavLink>
            </NavItem>
          </DesktopView>
        </NavbarContainer>
      );
}

export default ErrorNavbar
