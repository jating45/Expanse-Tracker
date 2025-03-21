import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaMoneyBillWave } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase"; // ✅ Firebase
import IncomeListPage from "./incomelist";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomePage: React.FC = () => {
  const [income, setIncome] = useState("");
  const [source, setSource] = useState("");
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  // ✅ Fetch Income from Firestore
  const fetchIncomeData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "income"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncomeData(fetchedData);
    } catch (error) {
      console.error("❌ Error fetching income:", error);
    }
  };

  // ✅ Add Income to Firestore
  const handleAddIncome = async () => {
    if (!income || !source) {
      alert("❌ Please enter both income amount and source.");
      return;
    }

    const newIncome = {
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      amount: parseFloat(income),
      source,
    };

    try {
      await addDoc(collection(db, "income"), newIncome);
      console.log("✅ Income added:", newIncome);

      setIncome("");
      setSource("");
      fetchIncomeData(); // Refresh Data
    } catch (error) {
      console.error("❌ Firestore write error:", error);
    }
  };

  // ✅ Chart Data
  const chartData = {
    labels: incomeData.map((entry) => entry.date),
    datasets: [
      {
        label: "Income",
        data: incomeData.map((entry) => entry.amount),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold text-primary">Income Tracker</h1>
          <p className="text-muted fs-5">Track your income sources effectively</p>
        </Col>
      </Row>

      {/* Income Form */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 p-4 bg-light">
            <Card.Body>
              <h3 className="fw-bold mb-4 text-success">Add Income</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Source of Income</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter income source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" className="fw-bold w-100 py-2" onClick={handleAddIncome}>
                  Add Income <FaMoneyBillWave className="ms-2" />
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Income Chart */}
      <Row className="mt-5">
        <Col>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <Card.Body>
              <h3 className="fw-bold mb-4 text-info">Income Report</h3>
              <Bar data={chartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <Card.Body>
              <h3 className="fw-bold mb-4 text-info">Income List</h3>
              <IncomeListPage/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default IncomePage;
