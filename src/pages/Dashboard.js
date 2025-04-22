import React, { useContext } from "react";
import "./Dashboard.css";
import { FaUserGraduate, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { StudentsContext } from "./StudentsContext";

// Same demo students used in StudentList
const demoStudents = [
  { id: 1001, name: "Alice", status: "Active" },
  { id: 1002, name: "Bob", status: "Inactive" },
  { id: 1003, name: "Charlie", status: "Active" },
  { id: 1004, name: "Diana", status: "Active" },
  { id: 1005, name: "Evan", status: "Inactive" }
];

function Dashboard() {
  const { students } = useContext(StudentsContext);

  // Combine API students with demo (if demo not deleted)
  const deletedDemoIds = JSON.parse(localStorage.getItem("deletedDemoIds")) || [];

  const visibleDemoStudents = demoStudents.filter(
    (s) => !deletedDemoIds.includes(s.id)
  );

  const allStudents = [...students, ...visibleDemoStudents];

  const total = allStudents.length;
  const active = allStudents.filter((s) => s.status === "Active").length;
  const inactive = total - active;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">👋 Welcome to the Student Dashboard</h2>
      <p className="dashboard-subtitle">Manage your students efficiently and effortlessly!</p>

      <div className="stats-container">
        <div className="stat-card">
          <FaUserGraduate className="stat-icon" />
          <h3>Total Students</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <FaUserCheck className="stat-icon" />
          <h3>Active Students</h3>
          <p>{active}</p>
        </div>
        <div className="stat-card">
          <FaUserTimes className="stat-icon" />
          <h3>Inactive Students</h3>
          <p>{inactive}</p>
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
