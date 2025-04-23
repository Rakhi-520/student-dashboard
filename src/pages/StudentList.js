import React, { useContext, useState, useEffect } from "react";
import { StudentsContext } from "./StudentsContext";
import { FaSave, FaTimes, FaTrashAlt } from "react-icons/fa"; // Importing icons
import "./StudentList.css";

// Demo students for testing
const demoStudents = [
  { id: 1001, name: "Alice", email: "alice@example.com", course: "Math", status: "Active", isDemo: true },
  { id: 1002, name: "Bob", email: "bob@example.com", course: "Science", status: "Inactive", isDemo: true },
  { id: 1003, name: "Charlie", email: "charlie@example.com", course: "English", status: "Active", isDemo: true },
  { id: 1004, name: "Diana", email: "diana@example.com", course: "History", status: "Active", isDemo: true },
  { id: 1005, name: "Evan", email: "evan@example.com", course: "Physics", status: "Inactive", isDemo: true },
  { id: 1006, name: "Fiona", email: "fiona@example.com", course: "Chemistry", status: "Active", isDemo: true },
  { id: 1007, name: "George", email: "george@example.com", course: "Biology", status: "Inactive", isDemo: true },
  { id: 1008, name: "Hannah", email: "hannah@example.com", course: "Math", status: "Active", isDemo: true },
  { id: 1009, name: "Ian", email: "ian@example.com", course: "English", status: "Inactive", isDemo: true },
  { id: 1010, name: "Jack", email: "jack@example.com", course: "History", status: "Active", isDemo: true },
  { id: 1011, name: "Kara", email: "kara@example.com", course: "Physics", status: "Inactive", isDemo: true },
  { id: 1012, name: "Liam", email: "liam@example.com", course: "Computer", status: "Active", isDemo: true },
  { id: 1013, name: "Mona", email: "mona@example.com", course: "Chemistry", status: "Inactive", isDemo: true },
  { id: 1014, name: "Nate", email: "nate@example.com", course: "Math", status: "Active", isDemo: true },
  { id: 1015, name: "Olivia", email: "olivia@example.com", course: "Biology", status: "Inactive", isDemo: true }
];

function StudentList() {
  const { students, setStudents } = useContext(StudentsContext);
  const [editedStudents, setEditedStudents] = useState(demoStudents);
  const [deletedDemoIds, setDeletedDemoIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    localStorage.setItem("studentData", JSON.stringify(students));
  }, [students]);

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

  const handleSave = (id) => {
    if (editData.isDemo) {
      setEditedStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...editData } : s))
      );
    } else {
      const updatedList = students.map((s) =>
        s.id === id ? { ...editData } : s
      );
      setStudents(updatedList);
      localStorage.setItem("studentData", JSON.stringify(updatedList));
    }

    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    const isDemo = demoStudents.find((s) => s.id === id);

    if (isDemo) {
      setDeletedDemoIds((prev) => [...prev, id]);
    } else {
      const updatedList = students.filter((s) => s.id !== id);
      setStudents(updatedList);
      localStorage.setItem("studentData", JSON.stringify(updatedList));
    }
  };

  const visibleDemoStudents = editedStudents.filter(
    (s) => !deletedDemoIds.includes(s.id)
  );

  const finalList = [...students, ...visibleDemoStudents];

  // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = finalList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(finalList.length / studentsPerPage);

  const changePage = (number) => {
    setCurrentPage(number);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="student-list">
      <h2 className="student-list-title">Student Records</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={student.id}>
              {editingId === student.id ? (
                <>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>
                    <input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="course"
                      value={editData.course}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="action-buttons">
                    <FaSave className="save-btn" onClick={() => handleSave(student.id)} />
                    <FaTimes className="cancel-btn" onClick={handleCancel} />
                    <FaTrashAlt className="delete-btn" onClick={() => handleDelete(student.id)} />
                  </td>
                </>
              ) : (
                <>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <span className={`status-badge ${student.status === "Active" ? "active" : "inactive"}`} >
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

      <div className="pagination">
        {/* Previous Button */}
        <button
          className="page-btn"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &#8249; {/* Left Arrow */}
        </button>

        {/* Page Numbers */}
        {currentPage > 3 && (
          <button className="page-btn" onClick={() => changePage(1)}>
            1
          </button>
        )}
        {currentPage > 4 && <span className="ellipses">...</span>}

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-btn ${currentPage === index + 1 ? "active-page" : ""}`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {currentPage < totalPages - 3 && <span className="ellipses">...</span>}
        {currentPage < totalPages - 2 && (
          <button className="page-btn" onClick={() => changePage(totalPages)}>
            {totalPages}
          </button>
        )}

        {/* Next Button */}
        <button
          className="page-btn"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &#8250; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
}

export default StudentList;
