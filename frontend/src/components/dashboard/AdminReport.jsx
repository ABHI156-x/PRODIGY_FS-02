import React from "react";
import Reportcard from "./Reportcard";
import { FaBuilding, FaUsers } from "react-icons/fa";

const AdminReport = ()  => {
    return (
        <div className="p-6">
            <h3 className="text-2x1 font-bold">DashBoard Overview </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Reportcard icon={ < FaUsers />} text = "Total Employees" number={10} color = "bg-teal-600" />
                <Reportcard icon={ < FaBuilding />} text = "Department" number={5} color="bg-yellow-600" />
            </div>
        </div>
    )
}

export default AdminReport