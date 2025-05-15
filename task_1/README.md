# SPO Web Executive Recruitment Tasks

This repository contains the tasks submitted for the **SPO Web Executive** recruitment process at IIT Kanpur.

---

## ✅ Task 1: Recreate "For Students" Page of IITK SPO

- Built using **Next.js**.
- Mimics the original "For Students" page on the [IITK SPO website](https://spo.iitk.ac.in/), structured with multiple **card-based sections**, each linking to specific resources or information.
- Card data (title, link, section, etc.) is stored as **JSON files** in the `app/data/` folder.
- These JSON files are loaded to dynamically render the content using arrays of components.
- Since there is minimal interactivity, the **Home page uses mostly Server-Side Rendering (SSR)** for better performance and SEO.

---

## ✅ Task 2: Placement and Internship Experience Portal

A platform for **IITK students who are placed or have interned** to **share their experiences** and insights for the benefit of their juniors.

### 🔧 Tech Stack:
- **Frontend**: Next.js with React (Client + Server Components)
- **Backend/Database**: PostgreSQL hosted on **Neon**
- **State Management**: React's `useContext` API for global student data handling

### 📄 Functionality:
- The **Insights page** displays a list of students with basic info (name + company).
- When a user clicks on a student's bio card:
  - Full experience data (like shortlisted companies, interview questions, advice, prep resources, etc.) is **fetched from the database**.
  - This data is stored in a **React Context** and passed to the **dynamic subpage** rendered using Next.js routing (`/insights/[studentId]`).
- The **student-specific page** shows detailed experience using the shared context state, avoiding redundant fetching.

### 🔍 Search Feature:
- A **search box** is provided on the Insights page.
- Implementation:
  - For each student entry, relevant strings (e.g., name, company, role, experience, etc.) are concatenated and converted to lowercase.
  - If the **search query** matches any part of this combined string, the entry is shown in the filtered results.
  - This allows for simple but effective **full-text-like search**.

---

## 🗃️ Data Handling Summary

| Page        | Data Source       | Rendering | Notes |
|-------------|-------------------|-----------|-------|
| Home        | JSON (`app/data/`) | SSR       | Static cards with links |
| Insights    | PostgreSQL (Neon) | CSR       | Dynamic content + search |
| Student Page | React Context     | CSR       | Context prefilled on click |

---

Feel free to explore the codebase and share feedback or suggestions. Contributions welcome!
