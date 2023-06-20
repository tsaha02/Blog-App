import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { auth } from "../firebase/firebase";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/blog" className="nav-link">
            Blogs
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          {isLoggedIn ? (
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          ) : null}

          {!isLoggedIn ? (
            <>
              <Link to="/registration" className="nav-link">
                Registration
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          ) : (
            <Link to="/" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
