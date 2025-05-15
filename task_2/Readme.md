# Task 2 – Student Insight Portal  
_SPO Web Executive Recruitment (IIT Kanpur)_

This project implements a full-stack portal that allows **IITK students** to share their **placement or internship experiences** for the benefit of their juniors. It features secure login/signup, session persistence, form validation, and a PostgreSQL-backed backend.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (React, App Router)
- **Backend**: Go (Gin framework)
- **Database**: PostgreSQL (hosted on **Neon**)
- **Authentication**:
  - Email & Password based login/signup
  - Session maintained via **HTTP cookies**
- **Persistence**: React `useContext` + `sessionStorage`

---

## 👨‍💻 Features

### ✅ Login / Signup System

- Users can register with their IITK email and password.
- Authentication is handled by the **Go backend**.
- Upon successful login/signup:
  - A **cookie** is set on the client for authentication.
  - The logged-in user’s data is stored in **React Context**.
  - To persist the login state on page refresh, the user data is also saved in `sessionStorage`.

### 🧠 Submitting Insights

- After login/signup, users are presented with a **form** to submit their placement or internship experience.
- The form collects:
  - Company name
  - Role (intern/placement)
  - Shortlisted companies
  - Interview questions
  - Preparation resources
  - Advice to juniors
  - Any other relevant insights

- When the form is submitted:
  - The insight is saved in the **PostgreSQL database**.
  - A restriction is enforced: **each student can submit their insight only once**.

### 🔒 One Submission per User

- The backend checks whether the logged-in student has already submitted an insight.
- If done, then form is disabled for that user it will not accept any of his further submition.
- This ensures **data integrity** and prevents duplicate entries.

---

## 🔗 Integration with Task 1

- The data collected here is used in **Task 1’s "Insights" page**.
- When a student submits an insight, it becomes available (after verification) for juniors to read in the frontend clone made for Task 1.
- This ensures a **continuous loop** between data collection and presentation.

---

## 🧪 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shivangtg/SPO-Task.git
   cd task_2
2. **Setup Backend (Go)**  
   - Navigate to the backend directory:
     ```bash
     cd backend
     go run main.go
     ```
   - Ensure your `.env` file contains the necessary environment variables for:
     - PostgreSQL connection string
     - JWT secret key
     - Port configuration (optional)

3. **Setup Frontend (Next.js)**  
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

4. **Environment Variables**  
   Create a `.env.local` file inside the `frontend/` directory with the following content:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
