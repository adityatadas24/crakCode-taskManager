import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("Logged out successfully!");
  };
  
  return (
    <div
      className="w-full p-2 px-8 flex justify-between items-center
     bg-slate-600 text-white"
    >
      <h1 className="text-2xl font-bold">Task Managers</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
