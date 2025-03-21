import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";


const Dashboard: React.FC = () => {
  return (
    <>

      <Container className="mt-5">
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="fw-bold text-primary">Dashboard</h1>
            <p className="text-muted fs-5">Overview of your financial activities</p>
          </Col>
        </Row>

        {/* Summary Cards */}
        <Row className="g-4 justify-content-center">
          <Col md={4}>
            <Card className="shadow-lg border-0 rounded-4 text-center p-4 bg-white">
              <Card.Body>
                <FaWallet size={50} className="text-primary mb-3" />
                <Card.Title className="fw-bold fs-5">Total Balance</Card.Title>
                <Card.Text className="fs-4 fw-semibold text-dark">$5,000</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg border-0 rounded-4 text-center p-4 bg-white">
              <Card.Body>
                <FaArrowUp size={50} className="text-success mb-3" />
                <Card.Title className="fw-bold fs-5">Total Income</Card.Title>
                <Card.Text className="fs-4 fw-semibold text-success">$7,500</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg border-0 rounded-4 text-center p-4 bg-white">
              <Card.Body>
                <FaArrowDown size={50} className="text-danger mb-3" />
                <Card.Title className="fw-bold fs-5">Total Expenses</Card.Title>
                <Card.Text className="fs-4 fw-semibold text-danger">$2,500</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Transactions */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-lg border-0 rounded-4 p-4 bg-light">
              <Card.Body>
                <h3 className="fw-bold mb-4 text-primary">Recent Transactions</h3>
                <Table responsive striped hover className="table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Salary</td>
                      <td className="fw-semibold">Income</td>
                      <td className="text-success fw-bold">$3,000</td>
                      <td>2025-03-17</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Groceries</td>
                      <td className="fw-semibold">Expense</td>
                      <td className="text-danger fw-bold">-$200</td>
                      <td>2025-03-16</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Electricity Bill</td>
                      <td className="fw-semibold">Expense</td>
                      <td className="text-danger fw-bold">-$100</td>
                      <td>2025-03-15</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="text-center">
                  <Button variant="primary" href="/transactions" className="fw-bold px-5 py-2 rounded-pill">
                    View All Transactions
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
