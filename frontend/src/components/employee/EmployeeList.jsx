import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/emphelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/emphelper";
import axios from "axios";
import { useEffect } from "react";



const EmployeeList = () => {
  const [employees, setEmpolyees] = useState([]);
  const [empLoading, setEmploading] = useState([false])
  const [filteremp, setFilteremp] = useState([])


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmploading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department?.dep_name || emp.department,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img width={40} className="rounded-full" src={`http://localhost:5000/${emp.userId.profileImage}`} />,
              action: (<EmployeeButtons Id={emp._id} onEmployeeDelete={fetchEmployees} />),

            }
          ))
          setEmpolyees(data);
          setFilteremp(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmploading(false)
      }
    };

    fetchEmployees();
  }, []);

  const handlefliter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteremp(records)
  }


  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center">
        <input type="text" placeholder="Search By Employee Name" className="px-4 py-0.5 border " onChange={handlefliter} />
        <Link to="/admin-dashboard/add-employees" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Employee</Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteremp} pagination />
      </div>

    </div>
  );
};

export default EmployeeList;
