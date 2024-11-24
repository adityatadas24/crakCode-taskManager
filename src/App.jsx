import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import LoginAndSignupAuth from "./components/LoginAndSignupAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <div className="min-h-screen">
      <AuthProvider>
        <ToastContainer />
        <TaskProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginAndSignupAuth />} />
              <Route path="/tasks" element={<Task />} />
            </Routes>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
