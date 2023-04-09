import { gql } from "@apollo/client";
export const CREATE_EMPLOYEE = gql`
  mutation createEmployee(
    $FirstName: String
    $LastName: String
    $Age: String
    $DateOfJoining: String
    $Title: String
    $Department: String
    $EmployeeType: String
  ) {
    createEmployee(
      post: {
        FirstName: $FirstName
        LastName: $LastName
        Age: $Age
        DateOfJoining: $DateOfJoining
        Title: $Title
        Department: $Department
        EmployeeType: $EmployeeType
      }
    ) {
      id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateUserById(
    $id: String
    $title: String
    $department: String
    $currentStatus: Boolean
  ) {
    updateUserById(
      id: $id
      title: $title
      department: $department
      currentStatus: $currentStatus
    ) {
      id
      FirstName
      LastName
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployeeById($eid: String) {
    deleteEmployeeById(eid: $eid) {
      id
    }
  }
`;
