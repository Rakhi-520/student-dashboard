import React from 'react';
import './StudentListModal.css'; 

function StudentListModal({ isOpen, onClose, studentList, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email || 'N/A'}</td> {/* Add default if email is not available */}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default StudentListModal;
