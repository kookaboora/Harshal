import React from "react";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeCreate from "../components/EmployeeCreate";

function EmployeeDirectory() {
  return (
    <div>
      <EmployeeCreate />

      <EmployeeTable />
    </div>
  );
}

export default EmployeeDirectory;
