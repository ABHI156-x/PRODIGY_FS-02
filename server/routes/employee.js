import express from "express";
import authmiddleware from "../middleware/authmiddleware.js";
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employeecontroller.js";

const router = express.Router();

router.get("/", authmiddleware, getEmployees);
router.post("/add", authmiddleware, upload.single('image'), addEmployee);
router.get("/:id", authmiddleware, getEmployee);

router.put("/:id", authmiddleware, updateEmployee);

router.delete("/:id", authmiddleware, deleteEmployee);

export default router;
