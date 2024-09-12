import React, { useContext, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import { AppContext } from "../context/AppContext";
import { FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import "../App.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AllocationForm = (props) => {
  // useContext returns the context value for the context you passed
  // and store the values to expenses locally
  const { currency, dispatch, expenses, remaining } = useContext(AppContext);

  // Retrieve departments for dropdown selection
  const option = expenses.map((obj) => ({"value":obj.name, "label": obj.id }));

  const [name, setName] = useState(null);
  const [cost, setCost] = useState(0);
  const [action, setAction] = useState(null);

  const actions = [
    { value: "Add", label: "Add" },
    { value: "Reduce", label: "Reduce" },
  ];

  const handleReset = () => {
    setName("departmentSelect", { value: "", label: "" });
    setAction("actionSelect", { value: "", label: "" });
    setCost(0);
  };

  const submitEvent = () => {
    // validate if allocation cost is for than remaining; if so set clear cost value
    if (cost < 1 || !name) {
      Swal.fire({
        position: "top",
        title: `Department or Allocation`,
        text: `Can not be empty or $0`,
        icon: "error",
      });

      return;
    }else if (!action) {
      Swal.fire({
        position: "top",
        title: `Allocation Type Required`,
        text:`Please select type`,
        icon: "error",
      });

      return;
    } else if (cost > remaining && name) {
      Swal.fire({
        position: "top",
        title: `Invalid Allocation ${currency}` + cost,
        text:
          `The value can not exceed remaining budget ${currency}` + remaining,
        icon: "error",
      });

      return;
    }

    const expense = {
      name: name.value,
      cost: parseInt(cost),
    };

    if (action.value === "Reduce" && name && cost) {
      // Filtering based on multiple properties
      const filteredCost = expenses.find((obj) => obj.name === name.value);

      if (parseInt(filteredCost.cost) < parseInt(cost)) {
        Swal.fire({
          position: "top",
          title: `Allocation Reduce ${currency}` + cost,
          text:
            `Can not exceed ${filteredCost.name} budget of ${currency}` + filteredCost.cost,
          icon: "error",
        });
  
        console.log(filteredCost.cost);
        return;
      } 

      dispatch({
        type: "RED_EXPENSE",
        payload: expense,
      });

      toast.success(`Allocation Decrease ${currency}` + cost, {
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

    } else if (action.value === "Add" && name && cost)  {
      dispatch({
        type: "ADD_EXPENSE",
        payload: expense,
      });

      toast.success(`Allocation Increase ${currency}` + cost, {
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

    } else {
      Swal.fire({
        position: "top",
        title: `Oops...`,
        text: "Please check inputs",
        icon: "question",
        showConfirmButton: false,
        timer: 1500,
      });
    }

  };

  return (
    <div className="budge-panel">
      <div className="row">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="departmentSelect" style={{ color: "#3E8DA8" }}>
              Department
            </label>
          </div>
          {" "}
          {/* Dropdown item to select department */}
          <Select
            isClearable
            className="select-option"
            id="departmentSelect"
            name="departmentSelect"
            value={name}
            options={option}
            onChange={(department) => setName(department)}
          />
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="actionSelect" style={{ color: "#3E8DA8" }}>
              Allocation-Type
            </label>
          </div>
           {/* Dropdown item to choose allocation action type */}
          <Select
            isClearable
            className="select-option"
            id="actionSelect"
            name="actionSelect"
            value={action}
            options={actions}
            onChange={(newAction) => setAction(newAction)}
          />
          <div className="allocate-input">
            <span style={{ marginLeft: "2rem" }}>{currency}</span>
             {/* Currency input box for entering allocation cost */}
            <CurrencyInput
              className="number"
              id="cost"
              name="cost"
              step={1000}
              defaultValue={0}
              value={cost}
              allowDecimals={true}
              decimalsLimit={2}
              onValueChange={(newCost) => setCost(newCost)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={submitEvent}
            style={{ marginLeft: "2rem" }}
          >
            Save <FaSave />
          </button>
          <button type="button" className="btn btn-warning" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllocationForm;
