import NavBar from "../components/dashboard/navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/empdashboard/Sidebar";


const EmployeeDashboard = () => {
  return (
    
      <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <NavBar />
                <Outlet /> 
            </div>
         </div>    
  );
};

export default EmployeeDashboard;
