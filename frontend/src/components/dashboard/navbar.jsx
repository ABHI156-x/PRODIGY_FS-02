import { useAuth } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  

  return (
    <div className="flex items-center justify-between h-12 bg-teal-500 text-white px-6">
      <p>Welcome {user?.name}</p>
      <button
        onClick={logout}
        className="px-5 py-1 bg-teal-700 rounded hover:bg-teal-600"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
