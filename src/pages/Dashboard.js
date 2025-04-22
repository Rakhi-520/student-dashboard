import React from "react";
import "./Dashboard.css";
import { FaUserGraduate, FaUserCheck, FaUserTimes } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">👋 Welcome to the Student Dashboard</h2>
      <p className="dashboard-subtitle">Manage your students efficiently and effortlessly!</p>

      <div className="stats-container">
        <div className="stat-card">
          <FaUserGraduate className="stat-icon" />
          <h3>Total Students</h3>
          <p>50</p>
        </div>
        <div className="stat-card">
          <FaUserCheck className="stat-icon" />
          <h3>Active Students</h3>
          <p>35</p>
        </div>
        <div className="stat-card">
          <FaUserTimes className="stat-icon" />
          <h3>Inactive Students</h3>
          <p>15</p>
        </div>
      </div>

      <div className="motivation-box">
        <h4>💡 Tip of the Day</h4>
        <p>"A good education is a foundation for a better future. Help students thrive!"</p>
      </div>
    </div>
  );
}

export default Dashboard;
