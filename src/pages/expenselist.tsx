import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

const ExpenseListPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const expenseData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setExpenses(expenseData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-primary text-center">Expense List</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ExpenseListPage;
