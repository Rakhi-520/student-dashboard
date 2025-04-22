import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import AddStudentForm from "./pages/AddStudentForm";
import About from "./pages/About";
import "./App.css";

// Import the provider
import { StudentsProvider } from "./pages/StudentsContext";


function App() {
  return (
    //Wrap your entire app in StudentsProvider
    <StudentsProvider>
      <Router>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <div className="page-container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/add-student" element={<AddStudentForm />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </StudentsProvider>
  );
}

export default App;
