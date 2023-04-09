import { React, useState, useEffect } from "react";
import { getAllEmployees } from "../GraphQL/query";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "../style/empTable.css";

function EmployeeTable() {
  const [employeeType, setemployeeType] = useState("");
  const [isRetierment, setisRetierment] = useState(false);

  const getUserById = gql`
  query {
    getEmpByType(empType: "${employeeType}") {
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

  // whenever emptype changes this useeffect will take place and refreshes the page to get
  // particular information
  useEffect(() => {}, [employeeType, isRetierment]);

  // query to get user by id
  const { loading, error, data } = useQuery(getUserById);
  // const [employyesData, setemployyesData] = useState(data.getEmpByType);

  // when the getUserById is not done, means it's in process to fetch the data it will show loading
  if (loading) return `${employeeType} , This Type of employee is being load `;
  if (error) return "error";

  const getRetirementStatus = (age, doj) => {
    console.log(age);
    console.log(doj);

    // get current date
    const currentDate = new Date();

    // convert doj into date object
    const dateOfJoining = new Date(doj);

    // const remainingYearForRetirement = dateOfJoining.getFullYear()  + (65 - age)

    const retirementDate = new Date(dateOfJoining);
    // getting date of retirement by adding remaining years to the joining date
    retirementDate.setFullYear(dateOfJoining.getFullYear() + (65 - age));

    if (retirementDate.getFullYear() > currentDate.getFullYear()) {
      return `${retirementDate.getDate()}/${retirementDate.getMonth()}/${retirementDate.getFullYear()}`;
    } else {
      if (retirementDate.getMonth() - currentDate.getMonth() <= 6) {
        if (retirementDate.getMonth() - currentDate.getMonth() < 0) {
          return "Retired";
        }
        return "Retiring Soon";
      }
      return `${retirementDate.getDate()}/${
        retirementDate.getMonth() + 1
      }/${retirementDate.getFullYear()}}`;
    }
  };

  return (
    <div className="employee-table-container">
      <div className="filter-option">
        <label className="employeetype-label">Select Employee Type </label>
        <select
          value={employeeType}
          onChange={(e) => setemployeeType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Seasonal">Seasonal</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <Button
          style={{ backgroundColor: "black", color: "white" }}
          onClick={() => setisRetierment(!isRetierment)}
        >
          {" "}
          {!isRetierment ? "Get Upcoming Retirement" : "All Employee"}{" "}
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>DOJ</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
            <th>Retirement Status</th>
          </tr>
        </thead>
        <tbody>
          {/* looping through data from the backend */}

          {data.getEmpByType.map((data) => (
            <tr>
              {isRetierment ? (
                getRetirementStatus(data.Age, data.DateOfJoining) ===
                "Retiring Soon" ? (
                  <>
                    <td> {data.FirstName} </td>
                    <td> {data.LastName} </td>
                    <td> {data.Age} </td>
                    <td> {data.DateOfJoining} </td>
                    <td> {data.Title} </td>
                    <td> {data.Department} </td>
                    <td> {data.EmployeeType} </td>
                    {/* if CurrentStatuss is false it will show not working otherwise working */}
                    <td>{data.CurrentStatus ? "Working" : "Not Workig"}</td>
                    <th>
                      {" "}
                      {getRetirementStatus(data.Age, data.DateOfJoining)}{" "}
                    </th>

                    <td>
                      <Link
                        style={{ color: "black" }}
                        to={`/employeedetails/${data.id}`}
                      >
                        {data.FirstName}
                        Details
                      </Link>
                    </td>
                  </>
                ) : (
                  <></>
                )
              ) : (
                <>
                  {" "}
                  <td> {data.FirstName} </td>
                  <td> {data.LastName} </td>
                  <td> {data.Age} </td>
                  <td> {data.DateOfJoining} </td>
                  <td> {data.Title} </td>
                  <td> {data.Department} </td>
                  <td> {data.EmployeeType} </td>
                  {/* if CurrentStatuss is false it will show not working otherwise working */}
                  <td>{data.CurrentStatus ? "Working" : "Not Workig"}</td>
                  <th> {getRetirementStatus(data.Age, data.DateOfJoining)} </th>
                  <td>
                    <Link
                      style={{ color: "black" }}
                      to={`/employeedetails/${data.id}`}
                    >
                      {data.FirstName}
                      Details
                    </Link>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
