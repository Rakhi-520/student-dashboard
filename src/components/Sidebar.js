import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/" className="sidebar-link">Dashboard</NavLink>
      <NavLink to="/students" className="sidebar-link">Students</NavLink>
      <NavLink to="/add-student" className="sidebar-link">Add Student</NavLink>
      <NavLink to="/about" className="sidebar-link">About</NavLink>
    </div>
  );
}

export default Sidebar;
