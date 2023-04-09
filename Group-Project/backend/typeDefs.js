const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type employee {
    id: ID
    FirstName: String
    LastName: String
    Age: String
    DateOfJoining: String
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: Boolean
  }

  type Query {
    getAllEmployees: [employee]!
    getEmpById(id: String): employee!
    getEmpByType(empType: String): [employee!]!
  }

  input empInput {
    FirstName: String
    LastName: String
    Age: String
    DateOfJoining: String
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: Boolean
  }

  type Mutation {
    createEmployee(post: empInput): employee!

    updateUserById(
      id: String
      title: String
      department: String
      currentStatus: Boolean
    ): employee!

    deleteEmployeeById(eid: String): [employee]!
  }
`;

module.exports = typeDefs;
