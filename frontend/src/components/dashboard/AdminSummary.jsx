import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaUser } from "react-icons/fa";

const AdminSummary = () => {

    const [summary, setSummary] = useState(null)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setSummary(summary.data)
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error)
                }
                console.log(error.message)
            }
        }
        fetchSummary()
    }, [])

    if (!summary) {
        return <div> Loading... </div>
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard icon={<FaUser />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />

                <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-teal-600" />

            </div>

        </div>
    )
}

export default AdminSummary