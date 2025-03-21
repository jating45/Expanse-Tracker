import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { auth } from "../database/loginbase"; // Ensure correct Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error messages

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("Login Successful:", user);

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === "auth/wrong-password") {
        setError("Invalid password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col md={12}>
          <Card className="shadow-lg p-4 rounded-4 text-center bg-light">
            <Card.Body>
              <h2 className="fw-bold text-primary mb-4">Expense Tracker Login</h2>

              {error && <Alert variant="danger">{error}</Alert>} {/* Display Error Message */}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start">
                  <Form.Label className="fw-bold">
                    <FaUser className="me-2" /> Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 text-start">
                  <Form.Label className="fw-bold">
                    <FaLock className="me-2" /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 text-start d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                </Form.Group>

                <Button type="submit" className="fw-bold w-100 py-2 rounded-pill shadow">
                  Login
                </Button>
              </Form>

              <p className="mt-3">
                Don't have an account?{" "}
                <a href="/register" className="text-primary fw-bold">
                  Sign Up
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
