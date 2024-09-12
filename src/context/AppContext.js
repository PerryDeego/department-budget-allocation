import React, { createContext, useReducer, useEffect } from "react";
import Swal from "sweetalert2";
import { loadInitialState, saveState } from "./LocalStorage";

// 1. The reducer - this is used to update the state based on the action
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE": {
      const totalExpenses = state.expenses.reduce((total, exp) => total + exp.cost, 0) + action.payload.cost;

      if (totalExpenses <= state.budget) {
        const updatedExpenses = state.expenses.map(exp => 
          exp.name === action.payload.name 
            ? { ...exp, cost: exp.cost + action.payload.cost } 
            : exp
        );

        return { ...state, expenses: updatedExpenses };
      } else {
        Swal.fire({
          position: "top",
          title: "Cannot increase the allocation!",
          text: "Out of funds, or empty allocation.",
          icon: "error",
        });
        return state;
      }
    }
    case "RED_EXPENSE": {
      const updatedExpenses = state.expenses.map(exp => {
        if (exp.name === action.payload.name && exp.cost >= action.payload.cost) {
          return { ...exp, cost: exp.cost - action.payload.cost };
        }
        return exp;
      });

      return { ...state, expenses: updatedExpenses };
    }
    case "CLEAR_EXPENSE": {
      const updatedExpenses = state.expenses.map(exp => 
        exp.name === action.payload ? { ...exp, cost: 0 } : exp
      );

      return { ...state, expenses: updatedExpenses };
    }
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    case "CHG_CURRENCY":
      return { ...state, currency: action.payload };
    case "ADD_DEPARTMENT":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "DELETE_DEPARTMENT":
      return { ...state, expenses: state.expenses.filter(exp => exp.id !== action.payload) };
      case 'SEARCH_EXPENSES':
        return {
          ...state,
          expenses: state.expenses.filter((expense) =>
            expense.name.toLowerCase().includes(action.payload.toLowerCase())
          ),
        };      
    default:
      return state;
  }
};

// 2. Sets the initial state when the app loads
const defaultState = {
  budget: 999999,
  expenses: [
    { id: "Marketing", name: "Marketing", cost: 50000 },
    { id: "Finance", name: "Finance", cost: 99500 },
    { id: "Sales", name: "Sales", cost: 77000 },
    { id: "Human Resource", name: "Human Resource", cost: 40500 },
    { id: "Research & Development", name: "Research & Development", cost: 19900 },
    { id: "IT", name: "IT", cost: 84000 },
    { id: "Logistic", name: "Logistic", cost: 33000 },
    { id: "Engineering", name: "Engineering", cost: 62000 },
    { id: "Production", name: "Production", cost: 144000 },
    { id: "Customer service", name: "Customer service", cost: 81000 },
    { id: "DevOps", name: "DevOps", cost: 49000 },
    { id: "Procurement", name: "Procurement", cost: 559000 },
  ],
  currency: "$",
};

// Load initialState from LocalStorage
const initialState = loadInitialState("LocalStorageKey", defaultState);

// 3. Creates the context
export const AppContext = createContext();

// 4. Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Calculate remaining budget
  const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);
  const remaining = state.budget - totalExpenses;

  // Save state to LocalStorage
  useEffect(() => {
    saveState("LocalStorageKey", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ ...state, remaining, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
