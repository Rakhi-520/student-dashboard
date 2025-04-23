import React, { useContext, useState } from "react";  
import "./Dashboard.css";
import { FaUserGraduate, FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa"; 
import { StudentsContext } from "./StudentsContext";

// Same demo students used in StudentList
const demoStudents = [
  { id: 1001, name: "Alice", email: "alice@example.com", status: "Active" },
  { id: 1002, name: "Bob", email: "bob@example.com", status: "Inactive" },
  { id: 1003, name: "Charlie", email: "charlie@example.com", status: "Active" },
  { id: 1004, name: "Diana", email: "diana@example.com", status: "Active" },
  { id: 1005, name: "Evan", email: "evan@example.com", status: "Inactive" },
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

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentList, setStudentList] = useState([]);

  // Handle the pop-up modal display logic
  const handleStudentClick = (type) => {
    if (type === 'Total') {
      setStudentList(allStudents); // Show all students
    } else if (type === 'Active') {
      setStudentList(allStudents.filter(s => s.status === 'Active')); // Filter active students
    } else if (type === 'Inactive') {
      setStudentList(allStudents.filter(s => s.status === 'Inactive')); // Filter inactive students
    }
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">👋 Welcome to the Student Dashboard</h2>
      <p className="dashboard-subtitle">Manage your students efficiently and effortlessly!</p>

      <div className="stats-container">
        <div className="stat-card" onClick={() => handleStudentClick('Total')}>
          <FaUserGraduate className="stat-icon" />
          <h3>Total Students</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card" onClick={() => handleStudentClick('Active')}>
          <FaCheckCircle className="stat-icon" color="green" /> {/* Green check mark */}
          <h3>Active Students</h3>
          <p>{active}</p>
        </div>
        <div className="stat-card" onClick={() => handleStudentClick('Inactive')}>
          <FaTimesCircle className="stat-icon" color="red" /> {/* Red cross mark */}
          <h3>Inactive Students</h3>
          <p>{inactive}</p>
        </div>
      </div>

      {/* Modal for displaying student list */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              <FaTimes size={20} /> {/* Cancel button */}
            </span>
            <h3>Student List</h3>
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="motivation-box">
        <h4> Tip of the Day</h4>
        <p>"A good education is a foundation for a better future. Help students thrive!"</p>
      </div>
    </div>
  );
}

export default Dashboard;
