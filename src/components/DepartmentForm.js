import React,  { useContext, useState }  from "react";
import { AppContext } from "../context/AppContext";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css'; 
import "./Department.css";

const DepartmentForm = ( ) => {

  const { currency, dispatch, expenses } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  //const [action, setAction] = useState(null);

 
 const addDept = (event) => {
  const expense = {
    id: name,
    name: name,
    cost: parseInt(cost),
  };

  if(expense && cost > 0 &&  name) {

    if (expenses.find((obj) => obj.name === name))
    {
      Swal.fire({
      position: "top",
      title: `${name}`,
      text:`Already exist.`,
      icon: "error",
    });

    return;
  } 
    dispatch({
      type: "ADD_DEPARTMENT",
      payload: expense,
    });

  toast.success(`${expense.name} added successfully.`, {
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

    setName("");
    setCost(0);
 
  } else {
    Swal.fire({
      position: "top",
      title: `Invalid Input`,
      text:`Please check your values.`,
      icon: "error",
    });
  }

}

    return (
        <Container>
        <Form id="departmentForm">
          <Form.Group controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Department"
              name="name"
              value={name}
              onChange={(e) => (setName(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCost">
            <Form.Label>Cost {currency}</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cost"
              name="cost"
              value={cost}
              onChange={(e) => (setCost(e.target.value))}
              step="10000"
            />
          </Form.Group>
          <Form.Group controlId="formBasicSuccess">
          <Button variant="success"  onClick={addDept} style={{ marginBottom: "1rem" }}>Submit</Button>
          </Form.Group>
        </Form>
      </Container>
    );
};

export default DepartmentForm