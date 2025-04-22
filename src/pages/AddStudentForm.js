import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentsContext } from "./StudentsContext"; 
import "./AddStudentForm.css";

function AddStudentForm() {
  const navigate = useNavigate();
  const { addStudent } = useContext(StudentsContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    status: "Active"
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = addStudent(formData); 
    if (success) {
      alert("Student added successfully!");
      navigate("/students");
    } else {
      alert("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Course</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
