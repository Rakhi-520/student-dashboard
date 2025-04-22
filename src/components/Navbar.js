import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-section navbar-left">
        <NavLink to="/" className="navbar-title">Student Dashboard</NavLink>
      </div>

      <div className="navbar-section navbar-center">
        <NavLink to="/about" className="navbar-link">About</NavLink>
      </div>

      <div className="navbar-section navbar-right">
        <button className="add-student-button" onClick={() => navigate("/add-student")}>
          Add Student
        </button>
      </div>
    </div>
  );
}

export default Navbar;
