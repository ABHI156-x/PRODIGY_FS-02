import { useAuth } from "../context/authcontext";

const EmployeeProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-bold">My Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Department: {user?.department?.dep_name || "Not Assigned"}</p>
    </div>
  );
};

export default EmployeeProfile;
