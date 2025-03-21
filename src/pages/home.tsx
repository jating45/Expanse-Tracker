import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle, FaListAlt, FaChartPie } from "react-icons/fa";


const Home: React.FC = () => {
  return (
    <>
      
      <Container className="mt-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="fw-bold text-primary display-4">Welcome to Expense Tracker</h1>
            <p className="text-secondary fs-4">Manage your expenses efficiently with ease.</p>
          </Col>
        </Row>
        <Row className="g-4 d-flex justify-content-center">
          <Col md={4}>
            <Card className="shadow-lg border-0 rounded-4 text-center p-5 bg-light">
              <Card.Body>
                <FaPlusCircle size={60} className="text-primary mb-3" />
                <Card.Title className="fw-bold fs-3">Add Expense</Card.Title>
                <Card.Text className="text-muted fs-5">Quickly add a new expense to your list.</Card.Text>
                <Button variant="primary" href="/expenses" className="px-5 py-3 fw-bold rounded-pill shadow-sm">
                  Add Expense
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg border-0 rounded-4 text-center p-5 bg-light">
              <Card.Body>
                <FaListAlt size={60} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-3">View Income</Card.Title>
                <Card.Text className="text-muted fs-5">Track all your recorded Income in one place.</Card.Text>
                <Button variant="success" href="/income" className="px-5 py-3 fw-bold rounded-pill shadow-sm">
                  View All Income
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg border-0 rounded-4 text-center p-5 bg-light">
              <Card.Body>
                <FaChartPie size={60} className="text-warning mb-3" />
                <Card.Title className="fw-bold fs-3">Reports & Insights</Card.Title>
                <Card.Text className="text-muted fs-5">Analyze your spending patterns with detailed reports.</Card.Text>
                <Button variant="warning" href="/reports" className="px-5 py-3 fw-bold rounded-pill shadow-sm">
                  View Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
