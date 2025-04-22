# 🎓 Student Management Dashboard

A modern, responsive React SPA to manage student data. Built as a front-end assessment project with full CRUD support using a mock API.

🌐 **Live Site:**  
👉 [https://student-dashboard-jet.vercel.app](https://student-dashboard-jet.vercel.app)

---

## ✨ Features

- 📌 Sidebar & top navbar navigation
- 📋 View all student records in a table
- ➕ Add new student
- 🖊️ Inline Edit with Save, Cancel, Delete buttons
- 🧪 Demo students auto-appear when API is empty
- ⚡ Fully responsive UI
- 🚀 Hosted on Vercel

---

## 🚀 Tech Stack

- **React**
- **Axios**
- **React Router DOM**
- **JSON Server** (Mock REST API)
- **Vercel** (Hosting)

---

## 📂 Folder Structure

src/ ├── components/ │ ├── Sidebar.js / Sidebar.css │ └── Navbar.js / Navbar.css ├── pages/ │ ├── Dashboard.js │ ├── StudentList.js │ ├── AddStudentForm.js │ └── EditStudentForm.js ├── App.js └── index.js


---

## How to Run Locally

1. **Clone the repo**

```bash
git clone https://github.com/Rakhi-520/student-dashboard.git
cd student-dashboard

2. Install dependencies

npm install

3. Start the mock API server

npx json-server --watch db.json --port 3500

4. Run the app

npm start

---

 Git Commands Used

Initialize a new Git repository

```bash
git init

Add all project files to Git

    git add .

Commit the added files

    git commit -m "Initial commit"

    

