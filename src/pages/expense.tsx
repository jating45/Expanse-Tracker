import React, { useState } from "react";
import { CContainer, CRow, CCol, CCard, CCardBody, CForm, CFormLabel, CFormInput, CFormSelect, CButton } from "@coreui/react";
import { addExpense } from "../database/firebaseService"; // ✅ Import Firebase function
import ExpenseListPage from "./expenselist";
import { Row, Col, Card } from "react-bootstrap";
const Expense: React.FC = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    otherCategory: "",
    icon: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date || !formData.category) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      // ✅ Ensure category is set properly
      const expenseData = {
        ...formData,
        category: formData.category === "Other" ? formData.otherCategory : formData.category,
        amount: Number(formData.amount), // Ensure amount is a number
        date: new Date(formData.date).toISOString(), // Convert date to ISO format
      };

      await addExpense(expenseData); // 🔥 Save to Firebase
      alert("✅ Expense Added Successfully!");
      setFormData({ description: "", amount: "", category: "", otherCategory: "", icon: "", date: "" });
    } catch (error) {
      console.error("❌ Error saving expense:", error);
      alert("❌ Failed to add expense.");
    }
  };

  return (
    <CContainer className="mt-5" style={{ maxWidth: "800px" }}>
      <CRow className="text-center mb-4">
        <CCol>
          <h1 className="fw-bold text-primary">Add New Expense</h1>
        </CCol>
      </CRow>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="shadow-lg border-0 rounded-4 p-4 bg-light">
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CFormLabel>Description</CFormLabel>
                <CFormInput type="text" name="description" value={formData.description} onChange={handleChange} required />

                <CFormLabel className="mt-3">Amount</CFormLabel>
                <CFormInput type="number" name="amount" value={formData.amount} onChange={handleChange} required />

                <CFormLabel className="mt-3">Category</CFormLabel>
                <CFormSelect name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </CFormSelect>

                {formData.category === "Other" && (
                  <>
                    <CFormLabel className="mt-3">Other Category</CFormLabel>
                    <CFormInput type="text" name="otherCategory" value={formData.otherCategory} onChange={handleChange} required />
                  </>
                )}

                <CFormLabel className="mt-3">Date</CFormLabel>
                <CFormInput type="date" name="date" value={formData.date} onChange={handleChange} required />

                <CButton color="primary" type="submit" className="w-100 py-3 rounded-pill shadow mt-4">
                  Add Expense
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Row className="mt-5">
        <Col>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <Card.Body>
              <h3 className="fw-bold mb-4 text-info"> Expense List</h3>
              <ExpenseListPage/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </CContainer>
  );
};

export default Expense;
