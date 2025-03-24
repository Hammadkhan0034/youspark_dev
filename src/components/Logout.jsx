import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Use the logoutUser action to clear everything
    dispatch(logoutUser());
    
    // Redirect to login page
    navigate("/signin-socials");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700"
    >
      Logout
    </button>
  );
};

export default Logout;
