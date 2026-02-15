import mongoose from "mongoose";
import Employee from "./employee.js";
import User from "./user.js";

const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

departmentSchema.pre("deleteOne", { document: true, query: false }, async function () {
  try {
    const employees = await Employee.find({ department: this._id })
    const userIds = employees.map(emp => emp.userId)

    await Employee.deleteMany({ department: this._id })
    await User.deleteMany({ _id: { $in: userIds } })
  } catch (error) {
    console.error("Department deleteOne hook error:", error.message);
    throw error;
  }

})
const Department = mongoose.model("Department", departmentSchema);

export default Department;