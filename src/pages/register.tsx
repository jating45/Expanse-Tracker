import React, { useState } from "react";
import { auth, db } from "../database/loginbase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { 
  CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CForm, 
  CFormInput, CButton, CAlert, CSpinner, CInputGroup, CInputGroupText 
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!firstName || !lastName) {
      setError("Please enter your first and last name.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      console.log("User Registered & Data Stored:", user);
      alert("Registration Successful!");

      // Clear input fields after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Registration Error:", err);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CContainer className="d-flex justify-content-center align-items-center vh-400">
      <CRow>
        <CCol md={12}>
          <CCard className="shadow-lg border-0 p-4">
            <CCardBody>
              <CCardTitle className="text-center fw-bold fs-3 text-primary">
                Create an Account
              </CCardTitle>
              
              {error && <CAlert color="danger">{error}</CAlert>}

              <CForm onSubmit={handleRegister}>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CInputGroup>
                      <CInputGroupText>
                        <FaUser />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={6}>
                    <CInputGroup>
                      <CInputGroupText>
                        <FaUser />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <FaEnvelope />
                  </CInputGroupText>
                  <CFormInput
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <FaLock />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <FaLock />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CButton type="submit" color="primary" className="w-100" disabled={loading}>
                  {loading ? <CSpinner size="sm" /> : "Register"}
                </CButton>
              </CForm>

              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
