import User from "../models/user.js";
import Employee from "../models/employee.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from '../models/department.js'
import { error } from "console";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({ storage: storage })



/**
 * CREATE EMPLOYEE (ADMIN)
 */
export const addEmployee = async (req, res) => {
  try {
    const { name, email, employeeId, dob, gender, maritalStatus, designation, department, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password are required",
      });
    }

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        error: "Employee already exists",
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create employee
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      profileImage: req.file ? req.file.filename : ""

    });
    const saveduser = await user.save()

    const newEmployee = new Employee({
      userId: saveduser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department
    })

    await newEmployee.save()
    return res.status(200).json({ success: true, message: "employee created" })



  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * GET ALL EMPLOYEES (ADMIN)
 */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', { password: 0 })
      .populate("department")
    // .select("-password");

    res.json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


export const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({
      $or: [
        { _id: id },
        { userId: id }
      ]
    })
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    res.json({ success: true, employee });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};



export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department } = req.body;
    const employee = await Employee.findById({ id })
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" })
    }

    const user = await User.findById({ _id: employee.userId })
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" })
    }

    const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name })
    const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
      maritalStatus, designation, department
    })

    if (!updateEmployee || !updateUser) {
      return res.status(404).json({ success: false, error: "document not found" })
    }

    return res.status(200).json({ success: true, message: "employee update" })

  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error.message);
    res.status(500).json({
      success: false,

      error: error.message,
    });

  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById({ _id: id })
    if (!employee) {
      return res.status(404).json({ success: false, error: "employee not found" })
    }

    const user = await User.findById({ _id: employee.userId })
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" })
    }

    await User.findByIdAndDelete({ _id: employee.userId })
    await Employee.findByIdAndDelete({ _id: id })


    return res.status(200).json({ success: true, message: "employee deleted" })

  } catch (error) {
    console.error("delete EMPLOYEES ERROR:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
}