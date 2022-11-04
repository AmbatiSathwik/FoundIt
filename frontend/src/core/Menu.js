import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "./logo-new.png";
import { isAuthenticated, signout } from "../auth/helper";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const showLogin = () => {
    if (!isAuthenticated()) {
      return (
        <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">SignUp</Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link>
            <span
              className="text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Sign Out
            </span>
          </Nav.Link>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <Navbar bg="#2C3337" variant="dark">
        <Container>
          <Navbar.Brand to="/">
            <Nav.Link href="/">
              <img width="130" src={Logo} alt="logo" />
            </Nav.Link>
          </Navbar.Brand>
          <Nav className="mr-0">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/foundItems">Found Items</Nav.Link>
            <Nav.Link href="/lostItems">Lost Items</Nav.Link>
            {showLogin()}
            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Menu;
