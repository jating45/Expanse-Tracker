import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/loginbase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user"); // Remove stored session
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col md={12}>
          <Card className="shadow-lg p-4 rounded-4 text-center bg-light">
            <Card.Body>
              <FaUser size={50} className="text-primary mb-3" />
              <h2 className="fw-bold text-primary">Profile</h2>

              {user ? (
                <>
                  <p className="text-muted">
                    <FaEnvelope className="me-2" /> {user.email}
                  </p>
                  <Button
                    variant="danger"
                    className="fw-bold w-100 py-2 rounded-pill shadow"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <p className="text-danger">No user found</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
