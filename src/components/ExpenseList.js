import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";

const ExpenseList = () => {
  // useContext returns the context value for the context you passed
  // and store the values to expenses locally
  const { expenses } = useContext(AppContext);

  return (
    <table className="table table-hover">
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Department</th>
          <th scope="col">Allocated Budget</th>
          <th scope="col">Increase by 10,000</th>
          <th scope="col">Decrease by 10,000</th>
          <th scope="col">Clear</th>
          <th scope="col">Delete</th>
          <th scope="col">Disable</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <ExpenseItem
            id={expense.id}
            key={expense.id}
            row={index + 1}
            name={expense.name}
            cost={expense.cost.toLocaleString('en-US')}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
