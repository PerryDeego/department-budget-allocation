import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AllocationForm from "./components/AllocationForm";
import Budget from "./components/Budget";
import Currency from "./components/Currency";
import Department from "./components/Department";
import ExpenseChart from "./components/charts/ExpenseChart";
import ExpenseList from "./components/ExpenseList";
import ExpenseTotal from "./components/ExpenseTotal";
import PieChart from "./components/charts/PieChart"
import RemainingBudget from "./components/Remaining";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";
import money from "./assets/money.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <AppProvider>
      <div className="container-fluid">
        <ToastContainer />
        <div className="card">
          <div className="card-header">
            <h1 className="mt-3">
              <img src={money} alt="money" /> Monthly Budget Allocation{" "}
            </h1>
          </div>
          <div className="card-body">
            <div className="row mt-3">
              <div className="col-sm">
                {
                  /* Budget component */
                  <Budget />
                }
              </div>
              <div className="col-sm">
                {
                  /* RemainingBudget component */
                  <RemainingBudget />
                }
              </div>
              <div className="col-sm">
                {
                  /* ExpenseTotal component */
                  <ExpenseTotal />
                }
              </div>
              <div className="col-sm">
                {
                  /* Currency component */
                  <Currency />
                }
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm">
                <PieChart /> {/* Add the PieChart component here */}
              </div>
              <div className="col-sm">
              <ExpenseChart /> {/* Add the ExpenseChart component */}
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <h3>Allocation</h3>
              </div>
              <div className="col-12 col-sm-auto">
                {
                  /* Department component */
                  <Department />
                }
              </div>
            </div>

            <div className="row ">
              <div className="col-sm">
                {
                  /* ExpenseList component */
                  <ExpenseList />
                }
              </div>
            </div>
            <h3 className="mt-3">Change allocation</h3>
            <div className="row mt-3">
              <div className="col-sm">
                {
                  /* AllocationForm component */
                  <AllocationForm />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};
export default App;
