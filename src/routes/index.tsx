import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../components/login&signup";
import SignupForm from "../components/login&signup/SignupForm";
import Header from "../components/Header/Header";
import Sidebar from "../components/Header/Sidebar";
import Dashboard from "../components/dashboard";
import Finance from "../components/finance";
import { CiSettings } from "react-icons/ci";
import Logout from "../components/logout";
import Settings from "../components/settings";
import Notifications from "../components/notifications";
import Teachers from "../components/teacher_staff";
import TaskManagement from "../components/tasks";
import Student from "../components/students/students";
function AppRoutes() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

  };
  const hideHeaderAndSidebar = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className={darkMode ? "dark" : ""}>
      
      <div className={``}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/register" element={<SignupForm />} />
        </Routes>
      </div>
      {!hideHeaderAndSidebar && (<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} />)} {!hideHeaderAndSidebar && <Sidebar isSidebarOpen={isSidebarOpen} />}
      <div className={`transition-all mt-16 duration-300 flex-1 ${isSidebarOpen ? "ml-0 pl-0" : "ml-32 pl-16"}`}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/teacher_staff" element={<Teachers />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/students" element={<Student />} />
        </Routes>
      </div>
    </div>

  );
}
export default AppRoutes;


