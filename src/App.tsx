import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/header";
import HomePage from "./pages/home";
import ExpensesPage from "./pages/expense";
import ReportsPage from "./pages/report";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashborad";
import Register from "./pages/register";
import IncomePage from "./pages/income";
import ProfilePage from "./pages/profile";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/income" element={<IncomePage/>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
