import React, { useState, useContext, useCallback } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Fill, RiChatDeleteFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseItem = ({ row, name, cost, id }) => {
  const { currency, dispatch } = useContext(AppContext);
  const [disabledRows, setDisabledRows] = useState([]);

  // Function to show toast notifications
  const showToast = useCallback((message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      showConfirmButton: false,
    });
  }, []);

  // Function to handle confirmation dialogs
  const handleConfirmation = useCallback((title, text, confirmText, cancelText, action) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      position: "top",
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          position: "top",
          title: "Cancelled",
          text: "Action cancelled.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }, []);

  // Function to clear the expense allocation
  const handleClearExpense = () => {
    handleConfirmation(
      "Are you sure?",
      "You won't be able to recover allocation!",
      "Yes, clear it!",
      "No, cancel!",
      () => {
        showToast(`Allocation Removed`, 'success');
        dispatch({ type: "CLEAR_EXPENSE", payload: id });
      }
    );
  };

  // Function to update the expense allocation
  const updateAllocation = useCallback((type, message) => {
    const expense = { name, cost: 1000 }; // Assuming a fixed cost increment/decrement
    dispatch({ type, payload: expense });
    showToast(message, type === "ADD_EXPENSE" ? 'success' : 'warning');
  }, [dispatch, name, showToast]);

  // Functions to increase and decrease the expense allocation
  const increaseAllocation = () => updateAllocation("ADD_EXPENSE", `Expense increased by +${currency}1,000`);
  const decreaseAllocation = () => updateAllocation("RED_EXPENSE", `Expense decreased by -${currency}1,000`);

  // Function to delete the department
  const handleDeleteDepartment = () => {
    handleConfirmation(
      "Are you sure?",
      "Department won't be recover!",
      "Yes, Delete it!",
      "No, cancel!",
      () => {
        showToast(`Department Deleted`, 'success');
        dispatch({ type: "DELETE_DEPARTMENT", payload: id });
      }
    );
  };

  // Toggle the disabled state of a row
  const toggleDisabledRow = (rowId) => {
    setDisabledRows((prev) => 
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  const isDisabled = disabledRows.includes(id); // Check if the current row is disabled

  return (
    <tr>
      <td>{row}</td>
      <td>{name}</td>
      <td>{currency}{cost}</td>
      <td>
        <FaPlusCircle 
          size="2.2em" 
          color="SpringGreen" 
          onClick={isDisabled ? null : increaseAllocation} // Disable click if row is disabled
        />
      </td>
      <td>
        <FaMinusCircle 
          size="2.2em" 
          color="red" 
          onClick={isDisabled ? null : decreaseAllocation} // Disable click if row is disabled
        />
      </td>
      <td>
        <RiChatDeleteFill 
          color="orange" 
          size="1.5em" 
          onClick={isDisabled ? null : handleClearExpense} // Disable click if row is disabled
        />
      </td>
      <td>
        <RiDeleteBin6Fill 
          size="1.5em" 
          color="red" 
          onClick={isDisabled ? null : handleDeleteDepartment} // Disable click if row is disabled
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={isDisabled} // Check if the current row is disabled
          onChange={() => toggleDisabledRow(id)} // Toggle the disabled state
        />
      </td>
    </tr>
  );
};

export default ExpenseItem;