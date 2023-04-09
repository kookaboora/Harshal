const employee = require("./model/employee");

//resolvers
const resolvers = {
  Query: {
    getAllEmployees: async () => {
      return await employee.find({});
    },

    getEmpById: async (parent, args, context, info) => {
      return employee.findOne({ _id: args.id });
    },

    getEmpByType: async (parent, args, context, info) => {
      if (args.empType === "") {
        return await employee.find({});
      } else {
        return await employee.find({ EmployeeType: args.empType });
      }
    },
  },

  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      const {
        FirstName,
        LastName,
        Age,
        DateOfJoining,
        Title,
        Department,
        EmployeeType,
        CurrentStatus,
      } = args.post;
      const post = await new employee({
        FirstName,
        LastName,
        Age,
        DateOfJoining,
        Title,
        Department,
        EmployeeType,
        CurrentStatus,
      }).save();
      return post;
    },

    deleteEmployeeById: async (parent, args, context, info) => {
      try {
        await employee.deleteOne({ _id: args.eid });
        return "Deletion successfull";
      } catch (error) {
        return "ERROR";
      }
    },

    updateUserById: async (parent, args, conext, info) => {
      const { id, title, department, currentStatus } = args;
      let updatedEmp = await employee.findByIdAndUpdate(
        { _id: id },
        {
          Title: title,
          Department: department,
          CurrentStatus: currentStatus,
        },
        {
          new: true,
        }
      );

      return updatedEmp;
    },
  },
};

module.exports = resolvers;
