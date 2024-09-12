import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ExpenseTotal = () => {
  // useContext returns the context value for the context you passed
  // and store the values to expenses locally
  const { currency, expenses } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  return (
    <div className="alert alert-danger">
      <span>Spent so far: {currency}{totalExpenses.toLocaleString('en-US')}</span>
    </div>
  );
};
export default ExpenseTotal;
