# Dayflow - Human Resource Management System (HRMS)

A comprehensive Employee Management System built for the Odoo x GCET Hackathon.
This full-stack application enables users (Employees & Admins) to handle Attendance, Leaves, Payroll, and Policies seamlessly.

## 🚀 Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Icons:** Lucide React

## 📂 Project Structure
- `frontend/` - React Application Source Code
- `backend/` - Express Server & API Logic
- `database/` - MySQL Schema Files
- `docs/` - Project Documentation & Designs

## 🛠️ How to Run

### 1. Database Setup
1. Open **MySQL Workbench**.
2. Run the script located in `database/schema.sql`.
3. This creates the `dayflow_hrms` database and tables.

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env file with your MySQL Password
npm start
```
*Server runs on Port 5000*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*App runs on Port 5173*

## ✨ Features
- **Admin Dashboard:** Visual charts & employee oversight.
- **Attendance:** Daily Check-in/Check-out with timestamps.
- **Leave Management:** Apply for leaves & Admin approval system.
- **Payroll:** Automated basic payslip generation.
- **Responsive:** Fully mobile-friendly UI.

---
*Created by Team Dayflow*
