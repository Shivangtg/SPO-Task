# SPO Web Executive Recruitment Tasks

This repository contains tasks for the recruitment of the **SPO Web Executive** post.

## Task 1: Recreate "For Students" Page

- Create a **copy of the "For Students" page** from the [IIT Kanpur SPO website](https://spo.iitk.ac.in/).
- Ensure the design, structure, and content closely match the original.
- You may use any front-end technology (HTML/CSS/JS or a framework like React) to replicate the page.
- Suggest changes for insights section if you have any.

## Task 2: Experience Portal

- Build a **web portal** where **IITK students** (placed in companies or having internships) can **share their experiences**.
- Features to include:
  - Form for students to submit their placement/internship experience.
  - Backend should be created with go for frontend you can use anything it is not even nessecary but just like cherry on cake

- Link1(frontend of task1)-->https://spo-task.vercel.app/
- Link2(backend of task2)-->https://spo-task.onrender.com

## Task 3: Docker Task (Bonus)
For Task 3, you are required to deploy the solutions from Task 1 (SPO student page clone with insights redesign) and Task 2 (Structured Insight Collector in Golang) using Docker containers on an AWS EC2 instance. Ensure that both the frontend (React/Next.js) and backend (Golang) applications are properly Dockerized, with the Dockerfiles correctly set up for smooth execution within the containers. Deploy the containers on an EC2 instance, ensuring both applications are accessible and running properly.
#### This task is optional, but if you take it on, it will definitely set you apart!

--------

# 📘 App Setup Guidelines

Follow these steps carefully to get the app running smoothly.

---

## 🔧 Step 1: Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Shivangtg/SPO-Task.git
cd SPO-Task
```
---
### 🌐 Task 1: Frontend Setup (task_1/frontend)
1. Create a .env File
At the root level of the task_1/frontend folder, create a file named .env and add the following content:
```bash
NEXT_PUBLIC_API_URL=http://localhost:6789
```
This is the URL where your backend server (in task_2/backend) will be running.

---

### 🛠️ Task 2: Backend Setup (task_2/backend)
1. Create .env File
In the task_2/backend folder, create a .env file for every session with the following content:

```bash
AUTH_SECRET_KEY=dynamoAuthSecret
PORT=6789
FRONTEND_URL=http://localhost:3002
FRONTEND_URL_1=http://localhost:3000
FRONTEND_URL_2=http://localhost:3001
DB_USER=mydatabase_owner
DB_PASSWORD=npge_SceefvfmfvkfvcffmfdL6KaMGvF5
DB_NAME=mydatabase
DB_HOST=ep-grey-eeking-a4y9q02d-poofefekfeijfduhnc.dkdidec
DB_PORT=5432
DB_SSLMODE=require
```

This is a sample

###I would prefer running backend server with compile deamon

2. Run Backend with Compile Daemon
🔄 Install Compile Daemon
Install CompileDaemon using Go:

```bash
go install github.com/githubnemo/CompileDaemon@latest
```

Make sure the Go bin folder is in your system PATH.

##▶️ Start Backend with Compile Daemon (PowerShell)
Run the following in PowerShell from the task_2/backend directory:

```bash
$env:AUTH_SECRET_KEY="dynamoAuthSecret"
$env:PORT="6789"
$env:FRONTEND_URL="http://localhost:3002"
$env:FRONTEND_URL_1="http://localhost:3000"
$env:FRONTEND_URL_2="http://localhost:3001"
$env:DB_USER="mydatabase_owner"
$env:DB_PASSWORD="npge_SceefvfmfvkfvcffmfdL6KaMGvF5"
$env:DB_NAME="mydatabase"
$env:DB_HOST="ep-grey-eeking-a4y9q02d-poofefekfeijfduhnc.dkdidec"
$env:DB_PORT="5432"
$env:DB_SSLMODE="require"

CompileDaemon -command="go run main.go"
```

💡 Note: Replace main.go with your actual backend entry file if different.

---
.

##🌐 Task 2: Frontend Setup (task_2/frontend)
Repeat the same step as task_1/frontend:

Create a .env File
In the root of task_2/frontend, add:

```bash
NEXT_PUBLIC_API_URL=http://localhost:6789
```
