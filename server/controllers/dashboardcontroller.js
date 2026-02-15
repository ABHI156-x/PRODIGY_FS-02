import Employee from "../models/employee.js"
import Department from "../models/department.js"



const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();

        const totalDeparments = await Department.countDocuments();

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments: totalDeparments
        })

    } catch (error) {
        return res.status(500).json({ success: false, error: "dashboard summary error" })
    }
}

export default getSummary