const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  DateOfJoining: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  EmployeeType: {
    type: String,
    required: true,
  },
  CurrentStatus: { type: Boolean, default: 1 },
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
