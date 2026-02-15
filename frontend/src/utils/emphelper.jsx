import axios from "axios";
import { useNavigate } from "react-router-dom";



export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"

    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Departments",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: " true "


    }



]

export const fetchDepartments = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/departments', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        if (response.data.success) {
            return response.data.departments;
        } else {
            return [];
        }

    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }

};

export const EmployeeButtons = ({ Id, onEmployeeDelete }) => {
    const navigate = useNavigate();


    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const response = await axios.delete(
                    `http://localhost:5000/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    onEmployeeDelete();
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    };


    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >View</button>


            <button className="px-3 py-1 bg-blue-600 text-white" onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >Edit</button>


            <button className="px-3 py-1 bg-red-600 text-white" onClick={() => handleDelete(Id)}
            >Delete</button>
        </div>
    )
}