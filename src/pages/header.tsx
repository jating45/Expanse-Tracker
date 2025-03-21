import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHome, FaMoneyBillWave, FaChartBar, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // ✅ Import NavLink
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg py-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/dashboard" className="fw-bold fs-4 text-uppercase">
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/home" className="mx-2 text-light fw-semibold">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/expenses" className="mx-2 text-light fw-semibold">
              <FaMoneyBillWave className="me-1" /> Expenses
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reports" className="mx-2 text-light fw-semibold">
              <FaChartBar className="me-1" /> Reports
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="mx-2 text-light fw-semibold">
              <FaUser className="me-1" /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
