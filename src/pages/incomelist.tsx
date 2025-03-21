import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

const IncomeListPage: React.FC = () => {
  const [incomeList, setIncomeList] = useState([]);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "income"));
      const incomeData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIncomeList(incomeData);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold text-primary">Income List</h1>
          <p className="text-muted fs-5">View all recorded income entries</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeList.length > 0 ? (
                    incomeList.map((income, index) => (
                      <tr key={income.id}>
                        <td>{index + 1}</td>
                        <td>{income.source}</td>
                        <td>${income.amount.toFixed(2)}</td>
                        <td>{income.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">No income records found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default IncomeListPage;
