import React from "react";
import { Link } from "react-router-dom";
import ".././style/navStyle.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <Link to="/">Home</Link>
        <Link to="/employeeTable">Show Employees</Link>
        <Link to="/createEmployee">Create Employee</Link>
      </ul>
    </nav>
  );
};

export default NavBar;
