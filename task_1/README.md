<!-- # SPO Web Executive Recruitment Tasks

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

Feel free to explore the codebase and share feedback or suggestions. Contributions welcome! -->
# Task 1 – SPO "For Students" Page Clone  
_SPO Web Executive Recruitment (IIT Kanpur)_

This project is a modern implementation of the **"For Students" page** from the [SPO IIT Kanpur website](https://spo.iitk.ac.in/), created using **Next.js** with clean file structuring, reusable components, and integration with a live database for parts of the data. The task aims to recreate the structure, layout, and purpose of the original site while improving maintainability and scalability.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Data Source**:
  - Static card content via **JSON files** in `app/data/`
  - Student insights via **PostgreSQL**, hosted on **Neon**
- **Rendering Strategy**:
  - **Server-Side Rendering (SSR)** for static content-heavy pages
  - **Client-Side Rendering (CSR)** where interactivity is essential
- **State Management**: React `useContext` API
- **Search Logic**: Custom substring-based filter

---
## 📄 Implementation Details

### 📚 Page Structure & Content

- The main page mimics the SPO "For Students" layout, where different **sections contain cards**, and each card has an associated **link**.
- These sections and cards are not hardcoded. Instead, all data is organized into **JSON files** under `src/data/`.
- These files are parsed into objects and then mapped to components using clean, modular code.
- This approach separates logic from content, making it **scalable and maintainable**.

### 🖥️ Rendering Strategy

- Since the homepage primarily displays structured, mostly-static information, it uses **Server-Side Rendering (SSR)** for better performance and SEO.
- On the other hand, more interactive pages like **"Insights"** involve **Client-Side Rendering (CSR)** to support user-driven interactions such as searching and navigation.

---

## 🔍 Insights Page and Student Experience (Connected to Task 2)

Though Task 1 is focused on the static page clone, one of the most dynamic parts is the **Insights section**, which is tightly coupled with the data model and logic from **Task 2**.

### 📦 Data Source for Student Insights

- Data is fetched from a **PostgreSQL** database hosted on **Neon**.
- Each student entry contains:
  - Name
  - Company (internship or placement)
  - Shortlisted companies
  - Interview questions
  - Advice to juniors
  - Other insights
  - Preparation resources

### 👨‍🎓 Student Subpage Navigation

- On the **Insights page**, only **name and company** are initially shown.
- Clicking on a student card:
  - Triggers the use of **React Context (`useContext`)** to store the complete student data in a global state.
  - The app navigates to a **dynamic subpage** (`/insights/[name]`) generated using **Next.js dynamic routing**.
  - The student subpage then accesses the full data via context, avoiding a second DB fetch.

> ⚡ This makes the transition fast and user-friendly, while preserving a consistent data model across the app.


#### 🧠 Context Persistence on Refresh

One challenge faced here is that **React context is cleared on page refresh**, which would otherwise result in an empty state on the student's subpage.

To solve this:

- The **full student data is also stored in `sessionStorage`** when the user clicks a student card.
- On the dynamic subpage, if the React context is empty (e.g. after a refresh), the app **retrieves the data from `sessionStorage`** and repopulates the context.
- This ensures smooth refresh handling **without needing another DB fetch**.

> ✅ This design avoids redundant queries and ensures a seamless user experience across navigation and refreshes.


---

## 🔍 Search Feature

- A **search box** is implemented on the Insights page to help users quickly locate specific student experiences.
- **Search Logic**:
  - For each student, a combined string is created using all fields (name, company, experience text, etc.).
  - This combined string is **lowercased** and checked against the **lowercased query string**.
  - If matched, the student card is displayed in the filtered result set.
- This is a simple but effective **substring-based search** that covers all relevant fields.

---

## 💡 Unique Challenges Solved

- **Data Integration Between Tasks**: Even though Task 1 is mostly static, it integrates seamlessly with dynamic data from Task 2 — particularly for the Insights section.
- **Efficient Page Generation**: Static and dynamic rendering is used where each fits best, optimizing for performance and responsiveness.
- **Context-Driven Routing**: Use of `useContext` enables passing large chunks of data between components without extra database calls.
- **Component Scalability**: Card and section generators are fully reusable and can accommodate content changes just by editing JSON files.

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Shivangtg/SPO-Task.git
cd task_1
npm install
npm run dev