import { React, useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../GraphQL/mutation";
import { DELETE_EMPLOYEE } from "../GraphQL/mutation";
import "../style/empDetails.css";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const EmployeeDetails = (location) => {
  console.log(location);
  let history = useHistory();
  const [empId, setempId] = useState(location.match.params.id);
  const [isEditing, setisEditing] = useState(false);
  const [updateUserById, { err }] = useMutation(UPDATE_EMPLOYEE);
  const [deleteEmployeeById, { err1 }] = useMutation(DELETE_EMPLOYEE);
  const [newDetails, setnewDetails] = useState({
    Department: "",
    Title: "",
    CurrentStatus: null,
  });

  const editEmployee = () => {
    // when it's in editing modei , the browser wont show the delete,done editing and cancel button.
    // when edit button is click the emp details span will be converted into select tag  to edit the field
    setisEditing(true);
  };

  const doneEditing = () => {
    updateUserById({
      variables: {
        id: empId,
        title: newDetails.Title,
        department: newDetails.Department,
        currentStatus: newDetails.CurrentStatus === "false" ? false : true,
      },
    });

    window.location.reload();

    if (loading) return <p>Loading</p>;
    setisEditing(false);
  };

  const cancelEditing = () => {
    setisEditing(false);
  };

  const deleteEmployee = () => {
    // browser will ask the user to confirm the delete proceess
    let confirmDelete = window.confirm(
      "Are you sure you want to delete ? " +
        data.getEmpById.FirstName +
        "(" +
        empId +
        ")"
    );

    if (confirmDelete) {
      console.log(data.getEmpById.CurrentStatus);
      if (data.getEmpById.CurrentStatus === true) {
        alert("Can not delete active employee.");
        return;
      }
      // if user click on yes
      deleteEmployeeById({
        variables: {
          eid: empId,
        },
      });
      setisEditing(false);
      // redirected to employeedelete page since there is no emp with that id
      history.push("/employeeDeleted");
    } else {
      setisEditing(false);
    }
  };

  const getEmpByIdQuery = gql`
    query {
      getEmpById(id: "${empId}") {
        id
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;

  const { loading, error, data } = useQuery(getEmpByIdQuery);

  if (loading) return <p>Fetching data</p>;

  return (
    <div className="employee-details-container">
      <header>
        {" "}
        <span> Employee Details </span>{" "}
        {!isEditing ? <button onClick={editEmployee}>Edit</button> : ""}
      </header>
      <div className="empDetail">
        <label> First Name </label>
        <span className="emp-detail-value"> {data.getEmpById.FirstName} </span>
      </div>

      <div className="empDetail">
        <label> Last Name </label>
        <span className="emp-detail-value"> {data.getEmpById.LastName} </span>
      </div>

      <div className="empDetail">
        <label> Age </label>
        <span className="emp-detail-value"> {data.getEmpById.Age} </span>
      </div>

      <div className="empDetail">
        <label> DateOfJoining </label>
        <span className="emp-detail-value">
          {" "}
          {data.getEmpById.DateOfJoining}{" "}
        </span>
      </div>

      <div className="empDetail">
        <label> Title </label>
        {!isEditing ? (
          <span className="emp-detail-value"> {data.getEmpById.Title} </span>
        ) : (
          <div>
            {" "}
            <select
              value={
                newDetails.Title === ""
                  ? data.getEmpById.Title
                  : newDetails.Title
              }
              onChange={(e) =>
                setnewDetails({
                  ...newDetails,
                  Title: e.target.value,
                })
              }
            >
              <option>Select Title</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>{" "}
          </div>
        )}
      </div>

      <div className="empDetail">
        <label> Department </label>

        {!isEditing ? (
          <span className="emp-detail-value">
            {" "}
            {data.getEmpById.Department}{" "}
          </span>
        ) : (
          <div>
            {" "}
            <select
              value={
                newDetails.Department === ""
                  ? data.getEmpById.Department
                  : newDetails.Department
              }
              onChange={(e) =>
                setnewDetails({
                  ...newDetails,
                  Department: e.target.value,
                })
              }
            >
              <option>Select Department</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>{" "}
          </div>
        )}
      </div>

      <div className="empDetail">
        <label> Employee Type </label>
        <span className="emp-detail-value">
          {" "}
          {data.getEmpById.EmployeeType}{" "}
        </span>
      </div>

      <div className="empDetail">
        <label> Current Status </label>
        {!isEditing ? (
          data.getEmpById.CurrentStatus ? (
            "Working"
          ) : (
            "Not Working"
          )
        ) : (
          <div>
            {" "}
            <select
              value={
                newDetails.CurrentStatus === null
                  ? data.getEmpById.CurrentStatus
                  : newDetails.CurrentStatus
              }
              onChange={(e) =>
                setnewDetails({
                  ...newDetails,
                  CurrentStatus: e.target.value,
                })
              }
            >
              <option>Select Employee Type</option>
              <option value="true">Working</option>
              <option value="false">Not Working</option>
            </select>{" "}
          </div>
        )}
        <span> </span>
      </div>

      {isEditing ? (
        <div>
          {" "}
          <Button onClick={cancelEditing} color="secondary">
            Cancel
          </Button>
          <Button onClick={doneEditing} variant="contained" color="success">
            Done
          </Button>
          <Button onClick={deleteEmployee} variant="outlined" color="error">
            Delete
          </Button>
          {/* <button onClick={deleteEmployee}> Delete </button>{" "}
          <button onClick={doneEditing}>Done Editing</button>{" "}
          <button onClick={cancelEditing}>Cancel</button>{" "} */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeDetails;
