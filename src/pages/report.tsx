import { useEffect, useState } from "react";
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { FaChartLine, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { fetchTotalIncome, fetchTotalExpenses } from "../database/firebaseService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportPage = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const income = await fetchTotalIncome();
      const expenses = await fetchTotalExpenses();
      setTotalIncome(income);
      setTotalExpenses(expenses);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Daily", "Weekly", "Monthly", "Yearly"],
    datasets: [
      {
        label: "Income",
        data: [totalIncome * 0.1, totalIncome * 0.25, totalIncome * 0.5, totalIncome],
        backgroundColor: "#28a745",
      },
      {
        label: "Expenses",
        data: [totalExpenses * 0.1, totalExpenses * 0.25, totalExpenses * 0.5, totalExpenses],
        backgroundColor: "#dc3545",
      },
    ],
  };

  return (
    <CContainer className="mt-5">
      <CRow className="mb-4 text-center">
        <CCol>
          <h1 className="fw-bold text-primary">Expense Report</h1>
          <p className="text-muted">Visualize your spending trends</p>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={4}>
          <CCard className="shadow border-0 bg-success text-white">
            <CCardBody>
              <FaMoneyBillWave size={40} className="mb-2" />
              <CCardTitle>Total Income</CCardTitle>
              <h2>${totalIncome.toFixed(2)}</h2> {/* ✅ Fixed income display */}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="shadow border-0 bg-danger text-white">
            <CCardBody>
              <FaWallet size={40} className="mb-2" />
              <CCardTitle>Total Expenses</CCardTitle>
              <h2>${totalExpenses.toFixed(2)}</h2>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol>
          <CCard className="shadow-lg border-0">
            <CCardBody>
              <h4 className="text-center fw-bold text-dark">
                Expense Flow Chart <FaChartLine className="ms-2" />
              </h4>
              <Bar data={chartData} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ReportPage;
