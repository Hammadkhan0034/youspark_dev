import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice"; // Import the logoutUser action

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("formData");

    // Dispatch the logoutUser action to update Redux state
    dispatch(logoutUser());

    // Redirect to login page or home page
    navigate("/signin-socials"); // Change this to your desired route
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
