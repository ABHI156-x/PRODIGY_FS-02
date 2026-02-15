import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/employeedashboard";

import PrivateRoutes from "./utils/privateroute";
import RoleBasedRoutes from "./utils/rolebasedroutes";

import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/departmentlist";
import AddDepartment from "./components/department/Adddepartment";
import EditDepartment from "./components/department/Editdepartment";
import EmployeeList from "./components/employee/EmployeeList";
import Addemp from "./components/employee/addemp";
import View from "./components/employee/View";
import Edit from "./components/employee/edit";
import Summary from "./components/empdashboard/Summary";
import Setting from "./components/empdashboard/Setting";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>


          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-departments" element={<AddDepartment />} />
          <Route path="departments/:id" element={<EditDepartment />} />

          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employees" element={<Addemp />} />
          < Route path="employees/:id" element={<View />} />
          < Route path="employees/edit/:id" element={<Edit />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<Summary />} />
          <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
          <Route path="/employee-dashboard/setting" element={<Setting />}></Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
