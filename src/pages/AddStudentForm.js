import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudentForm.css";

function AddStudentForm() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3500/students";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post(API_URL, {
        name: formData.name,
        email: formData.email,
        course: formData.course,
        status: formData.status
      });
      navigate("/students"); // redirect after success
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Course</label>
        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
