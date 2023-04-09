import { gql } from "@apollo/client";

export const getAllEmployees = gql`
  {
    getAllEmployees {
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
