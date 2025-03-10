import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigateTo = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigateTo(`/products/${keyword}`);
    } else {
      navigateTo(`/products`);
    }
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/#home">
                Home
              </Nav.Link>
              {isAuthenticated ? (
                <Nav.Link as={Link} to="/account">
                  Account
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/signin">
                  Sign In
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                onChange={(e) => handleKeyword(e)}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-info" onClick={(e) => handleClick(e)}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
