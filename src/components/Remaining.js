import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  // useContext returns the context value for the context you passed
  // and store the values to expenses and budget locally
  const { currency, expenses, budget } = useContext(AppContext);
  

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  // display alert-danger if totalExpenses more than budget
  // else display
  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: {currency}{(budget - totalExpenses).toLocaleString('en-US')}</span>
    </div>
  );
};
export default Remaining;
