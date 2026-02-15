import express from "express";
import authmiddleware from "../middleware/authmiddleware.js";
import {
  getDepartments,
  deleteDepartment,
  addDepartment,
  updateDepartment,
  getDepartment,
  
} from "../controllers/departmentcontroller.js";

const router = express.Router();

router.get("/", authmiddleware, getDepartments);
router.post("/add", authmiddleware, addDepartment);
router.get("/:id", authmiddleware, getDepartment);

router.put("/:id", authmiddleware, updateDepartment);

router.delete("/:id", authmiddleware, deleteDepartment);

export default router;
