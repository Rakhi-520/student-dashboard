import React from 'react';
import './StudentListModal.css'; // Make sure the CSS file is linked correctly

function StudentListModal({ isOpen, onClose, studentList, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>×</button> {/* Close button */}
        </div>
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
                <td>{student.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default StudentListModal;
