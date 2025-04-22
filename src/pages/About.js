import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">🎓 About Student Management Dashboard</h2>
      <p className="about-description">
        This dashboard is a simple and powerful tool to help manage student information.
        Whether you're keeping track of new enrollments, updating student details,
        or reviewing records — this app makes everything quick and easy.
      </p>

      <div className="about-features">
        <h3>🚀 Key Features:</h3>
        <ul>
          <li>Add new students with one click</li>
          <li>Edit details inline directly in the table</li>
          <li>Delete records instantly</li>
          <li>Demo students appear automatically for testing</li>
          <li>Responsive design for all screen sizes</li>
        </ul>
      </div>

      <div className="about-footer">
        <p>
          This application was built using <strong>React</strong> and <strong>json-server</strong>, and is
          proudly deployed on <strong>Vercel</strong>.
        </p>
        <p className="signature">Created with ❤️ by Rakhi</p>
      </div>
    </div>
  );
}

export default About;
