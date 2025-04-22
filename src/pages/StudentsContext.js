import React, { createContext, useState, useEffect } from "react";

// Create the context
export const StudentsContext = createContext();

// LocalStorage key
const STORAGE_KEY = "studentData";

// Load students from localStorage
const loadStudents = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Save students to localStorage
const saveStudents = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Provider component
export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const localData = loadStudents();
    setStudents(localData);
  }, []);

  const addStudent = (newStudent) => {
    const id = Date.now().toString(); // create unique ID
    const updated = [...students, { ...newStudent, id }];
    setStudents(updated);
    saveStudents(updated);
    return true;
  };

  return (
    <StudentsContext.Provider value={{ students, setStudents, addStudent }}>
      {children}
    </StudentsContext.Provider>
  );
};
