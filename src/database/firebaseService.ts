import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// ✅ Function to Add Expense
export const addExpense = async (expenseData: any) => {
  try {
    await addDoc(collection(db, "expenses"), expenseData);
    console.log("✅ Expense added successfully!");
  } catch (error) {
    console.error("❌ Error adding expense:", error);
  }
};

// ✅ Function to Fetch All Expenses
export const fetchExpenses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    let expenses: any[] = [];

    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });

    return expenses;
  } catch (error) {
    console.error("❌ Error fetching expenses:", error);
    return [];
  }
};


export const fetchTotalIncome = async () => {
  try {
    const incomeCollection = collection(db, "income");
    const snapshot = await getDocs(incomeCollection);
    let total = 0;
    snapshot.forEach((doc) => {
      total += doc.data().amount; // Ensure your document has an `amount` field
    });
    return total;
  } catch (error) {
    console.error("Error fetching income data:", error);
    return 0;
  }
};

export const fetchTotalExpenses = async () => {
  try {
    const expensesCollection = collection(db, "expenses");
    const snapshot = await getDocs(expensesCollection);
    let total = 0;
    snapshot.forEach((doc) => {
      total += doc.data().amount;
    });
    return total;
  } catch (error) {
    console.error("Error fetching expenses data:", error);
    return 0;
  }
};


