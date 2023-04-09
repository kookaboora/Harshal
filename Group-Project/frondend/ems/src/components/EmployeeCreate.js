import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EMPLOYEE } from "../GraphQL/mutation";
import { getAllEmployees } from "../GraphQL/query";
import { useState } from "react";
import React from "react";
import "../style/formStyle.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import Select, { SelectChangeEvent } from "@mui/material/Select";

function EmployeeCreate() {
  const { loading } = useQuery(getAllEmployees);
  const [createEmployee, { err }] = useMutation(CREATE_EMPLOYEE);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
  const [DateOfJoining, setDateOfJoining] = useState("");
  const [Title, setTitle] = useState("");
  const [Department, setDepartment] = useState("");
  const [EmployeeType, setEmployeeType] = useState("");
  const [errorMessage, seterrorMessage] = useState(null);
  const [CurrentStatus, setCurrentStatus] = useState(null);

  const addPost = (e) => {
    e.preventDefault();
    if (loading) return "loading";

    if (FirstName === "") {
      seterrorMessage("Please Enter First Name.");
      return;
    }

    if (LastName === "") {
      seterrorMessage("Please Enter Last Name.");
      return;
    }

    if (Age === "") {
      seterrorMessage("Please Enter age.");
      return;
    } else {
      if (Age < 20 || Age > 70) {
        seterrorMessage("Age Should Be Between 20-70.");
        return;
      }
    }

    if (Title === "") {
      seterrorMessage("Please Enter title");
      return;
    }

    if (DateOfJoining === "") {
      seterrorMessage("Please Enter DateOfJoining");
      return;
    }

    if (Department === "") {
      seterrorMessage("Please Enter Department");
      return;
    }

    if (EmployeeType === "") {
      seterrorMessage("Please Enter Employee Type");
      return;
    }

    createEmployee({
      variables: {
        FirstName: FirstName,
        LastName: LastName,
        Age: Age,
        DateOfJoining: DateOfJoining,
        Title: Title,
        Department: Department,
        EmployeeType: EmployeeType,
        CurrentStatus: CurrentStatus,
      },
    });

    // reloading page after the employee is created
    window.location.reload();
  };

  return (
    <div className="employee-create-form-container">
      <form className="empolyee-create-form" onSubmit={(e) => addPost(e)}>
        <header>Add New Employee</header>

        {/* SHOWING ERRROR */}
        {errorMessage ? (
          <span className="error-message">{errorMessage} </span>
        ) : (
          ""
        )}

        <div className="form-input-div">
          <TextField
            id="filled-basic"
            label="First Name"
            variant="filled"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-input-div">
          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-input-div">
          {" "}
          <TextField
            id="filled-basic"
            label="Age"
            variant="filled"
            placeholder="Enter Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-input-div">
          <InputLabel id="Date Of Joining">Date Of Joining</InputLabel>
          <input
            type="Date"
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "3rem" }}>
          <div className="form-input-div">
            {" "}
            <InputLabel id="Title">Title</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="Title"
              onChange={(e) => setTitle(e.target.value)}
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Director">Director</MenuItem>
              <MenuItem value="VP">VP</MenuItem>
            </Select>
            {/* <select onChange={(e) => setTitle(e.target.value)}>
            <option>Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select> */}
          </div>
          <div className="form-input-div">
            {" "}
            <InputLabel id="department">Department</InputLabel>
            <Select
              labelId="department"
              id="Department"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
            </Select>
          </div>

          <div className="form-input-div">
            <InputLabel id="Employee Type">Employee Type</InputLabel>
            <Select
              labelId="Employee Type"
              id="Employee Type"
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <MenuItem value="IT">Seasonal</MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </div>
        </div>

        {/* <input type="submit" value="submit"></input> */}
        <Button
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
          onClick={(e) => addPost(e)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default EmployeeCreate;
