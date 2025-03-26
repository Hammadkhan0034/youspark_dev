import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { logoutUser } from "../redux/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Dispatch logout action
    dispatch(logoutUser());
    
    // Navigate to login page
    navigate('/signin-socials');
  };

  return (
    <button 
      onClick={handleLogout}
      className="p-2 hover:bg-teal-light/10 rounded-full transition-colors"
      title="Logout"
    >
      <LogOut className="text-teal-dark" size={24} />
    </button>
  );
};

export default Logout;
