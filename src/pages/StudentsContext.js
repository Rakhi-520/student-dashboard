import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const StudentsContext = createContext();

// Create the provider component
export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const API_URL = "http://localhost:3500/students";

  // Fetch students from mock server
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch students:", error.message);
    }
  };

  // Run once when app loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to add a new student
  const addStudent = async (newStudentData) => {
    try {
      const response = await axios.post(API_URL, newStudentData);
      const savedStudent = response.data;
      setStudents((prev) => [...prev, savedStudent]);
      return true;
    } catch (error) {
      console.error("❌ Failed to add student:", error.message);
      return false;
    }
  };

  return (
    <StudentsContext.Provider value={{ students, setStudents, addStudent }}>
      {children}
    </StudentsContext.Provider>
  );
};
