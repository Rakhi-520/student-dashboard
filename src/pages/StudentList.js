import React, { useContext, useState } from "react";
import { StudentsContext } from "./StudentsContext"; // Adjust if needed
import "./StudentList.css";

const demoStudents = [
  { id: 1001, name: "Alice", email: "alice@example.com", course: "Math", status: "Active", isDemo: true },
  { id: 1002, name: "Bob", email: "bob@example.com", course: "Science", status: "Inactive", isDemo: true },
  { id: 1003, name: "Charlie", email: "charlie@example.com", course: "English", status: "Active", isDemo: true },
  { id: 1004, name: "Diana", email: "diana@example.com", course: "History", status: "Active", isDemo: true },
  { id: 1005, name: "Evan", email: "evan@example.com", course: "Physics", status: "Inactive", isDemo: true }
];

function StudentList() {
  const { students, setStudents } = useContext(StudentsContext);
  const [editedStudents, setEditedStudents] = useState(demoStudents);
  const [deletedDemoIds, setDeletedDemoIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({ ...student });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async (id) => {
    try {
      if (editData.isDemo) {
        setEditedStudents((prev) =>
          prev.map((student) => (student.id === id ? { ...editData } : student))
        );
      } else {
        const updated = await fetch(`http://localhost:3500/students/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData)
        });
        if (updated.ok) {
          const updatedStudent = await updated.json();
          setStudents((prev) =>
            prev.map((s) => (s.id === id ? updatedStudent : s))
          );
        }
      }
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleDelete = async (id) => {
    const student = [...students, ...editedStudents].find((s) => s.id === id);
    const isDemo = student?.isDemo;

    try {
      if (isDemo) {
        setDeletedDemoIds((prev) => [...prev, id]);
      } else {
        const res = await fetch(`http://localhost:3500/students/${id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          setStudents((prev) => prev.filter((s) => s.id !== id));
        } else {
          alert("Failed to delete student from API.");
        }
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const visibleDemoStudents = editedStudents.filter(
    (s) => !deletedDemoIds.includes(s.id)
  );

  const finalList = [...students, ...visibleDemoStudents];

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
          {finalList.map((student) => (
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
