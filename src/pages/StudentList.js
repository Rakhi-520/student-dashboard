import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";

// Static demo data
const allDemoStudents = [
    { id: 1001, name: "Alice", email: "alice@example.com", course: "Math", status: "Active", isDemo: true },
    { id: 1002, name: "Bob", email: "bob@example.com", course: "Science", status: "Inactive", isDemo: true },
    { id: 1003, name: "Charlie", email: "charlie@example.com", course: "English", status: "Active", isDemo: true },
    { id: 1004, name: "Diana", email: "diana@example.com", course: "History", status: "Active", isDemo: true },
    { id: 1005, name: "Evan", email: "evan@example.com", course: "Physics", status: "Inactive", isDemo: true }
  ];

function StudentList() {
  const API_URL = "http://localhost:3500/students";

  const [apiStudents, setApiStudents] = useState([]);
  const [editedDemoStudents, setEditedDemoStudents] = useState(allDemoStudents);
  const [deletedDemoIds, setDeletedDemoIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchApiStudents();
  }, []);

  const fetchApiStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data;
      setApiStudents(apiData);

      // if API is empty, reset demo deletions
      if (apiData.length === 0) {
        setDeletedDemoIds([]);
        setEditedDemoStudents(allDemoStudents);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({ ...student });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      if (id < 1000) {
        // Save to API
        await axios.put(`${API_URL}/${id}`, editData);
        fetchApiStudents();
      } else {
        // Save demo edit
        setEditedDemoStudents((prev) =>
          prev.map((student) => (student.id === id ? { ...editData } : student))
        );
      }
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleDelete = async (id) => {
    // Check if it's a demo student
    const student = editedDemoStudents.find(s => s.id === id);
    const isDemo = student?.isDemo;
  
    try {
      if (isDemo) {
        setDeletedDemoIds(prev => [...prev, id]);
      } else {
        // Real student - delete from API
        await axios.delete(`${API_URL}/${id}`);
        await fetchApiStudents(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  

  // Final filtered demo students (excluding deleted)
  const visibleDemoStudents = editedDemoStudents.filter(
    (student) => !deletedDemoIds.includes(student.id)
  );

  const finalStudents = [...apiStudents, ...visibleDemoStudents];

  return (
    <div className="student-list">
      <h2 className="student-list-title">Student Records</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finalStudents.map((student) => (
            <tr key={student.id}>
              {editingId === student.id ? (
                <>
                  <td><input name="name" value={editData.name} onChange={handleChange} /></td>
                  <td><input name="email" value={editData.email} onChange={handleChange} /></td>
                  <td><input name="course" value={editData.course} onChange={handleChange} /></td>
                  <td>
                    <select name="status" value={editData.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-btn" onClick={() => handleSave(student.id)}>Save</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <span className={`status-badge ${student.status === "Active" ? "active" : "inactive"}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
