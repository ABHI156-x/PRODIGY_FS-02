import Department from "../models/department.js";

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description
    })
    await newDep.save()
    return res.status(200).json({ success: true, department: newDep })
  } catch (error) {
    console.error("CREATE DEPARTMENT ERROR:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id)
    return res.status(200).json({ success: true, department })
  } catch (error) {
    return res.status(500).json({ success: false, error: "get department server error" })
  }
}


export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(id, {
      dep_name,
      description
    }, { new: true })
    return res.status(200).json({ success: true, updateDep })
  } catch (error) {
    res.status(500).json({ success: false, error: "edit department server error" });
  }
}



export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findById(id)
    if (!deleteDep) {
      return res.status(404).json({ success: false, error: "Department not found" })
    }
    await deleteDep.deleteOne()
    return res.status(200).json({ success: true, deleteDep })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "delete department server error" });
  }
};
