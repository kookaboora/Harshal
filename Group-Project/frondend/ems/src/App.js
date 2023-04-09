import "./index.css";
import React from "react";
import ".././src/App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeDelete from "./components/EmployeeDelete";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>

        <Switch>
          <Route exact path="/" component={Home}></Route>

          <Route exact path="/employeeTable" component={EmployeeTable}></Route>

          <Route
            exact
            path="/createEmployee"
            component={EmployeeCreate}
          ></Route>

          <Route
            exact
            path="/employeedetails/:id"
            component={EmployeeDetails}
          ></Route>

          <Route
            exact
            path="/employeeDeleted"
            component={EmployeeDelete}
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
