import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "../App.css";

const Currency = () => {
  const { currency, dispatch } = useContext(AppContext);

  const changeCurrency = (val) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: val,
    });

    toast.success(`Currency change from [ ${currency} ]`, {
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
  };

  return (
    <div className="alert alert-info">
     {" "}
      <label htmlFor="currency">Currency </label>
      {
      <select
        id="currency"
        className="currency"
        value={currency}
        onChange={(event) => changeCurrency(event.target.value)}
      >
        <option className="money" value="$">($ USD)</option>
        <option className="money" value="£">(£ POUND)</option>
        <option className="money" value="€">(€ EURO)</option>
        <option className="money" value="C$">(C$ CAD)</option>
        <option className="money" value="JD">(JD JOD)</option>
        <option className="money" value="₹">(₹ RUPEE)</option>
        <option className="money" value="¥">(¥ JPY)</option>
        <option className="money" value="A$">(A$ AUD)</option>
        <option className="money" value="₦">(₦ NGN)</option>
        <option className="money" value="EC">($ EC)</option>
        <option className="money" value="֏">(֏ AMD)</option>
        <option className="money" value="J$">(J$ JMD)</option>
        <option className="money" value="TT$">(TT$ TTD)</option>
        <option className="money" value="BZ$">(BZ$ BZD)</option>
        <option className="money" value="CUC$">(CUC$ CUC)</option>
        <option className="money" value="$U">($U UYU)</option>
        <option className="money" value="Z$">(Z$ ZWL)</option>
      </select>
      }
    </div>
  );
};


export default Currency;
