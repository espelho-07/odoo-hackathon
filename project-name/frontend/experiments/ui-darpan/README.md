# Dayflow HRMS - Frontend Demo

> Odoo X GCET Hackathon Submission

This is a **Frontend-only** demonstration of the Dayflow Human Resource Management System. It simulates a professional, enterprise-grade HR ERP system using React and Tailwind CSS.

## 🚀 Features Implemented

1.  **Role-Based Access**:
    *   **Admin View**: Access to Payroll, Salary breakdowns, Time Off approvals.
    *   **Employee View**: Access to personal Check-in/out, Leave requests.
2.  **Dashboard**: Real-time stats overview.
3.  **Employee Management**: Searchable directory and detailed profiles.
4.  **Attendance**: Simulated check-in/out logic.
5.  **Payroll (Admin)**: Salary breakdown with HRA/PF calculations.
6.  **Leave Management**: Request and Approval workflows.

## 🛠️ Tech Stack

*   **React (Vite)**: Fast, modular component architecture.
*   **Tailwind CSS**: Professional, clean UI with consistent design tokens.
*   **Lucide React**: Modern, consistent iconography.
*   **Plain JS State**: No complex external libraries (Redux/Context not needed for demo).

## ⚠️ Hackathon Limitations

*   **No Backend**: All data is simulated in `src/data/`.
*   **No Real Auth**: Login is a role-selector demo.
*   **No Database**: Changes (like new leaves) persist only until refresh.

## 🏃 How to Run

1.  Navigate to this folder:
    ```bash
    cd frontend/experiments/ui-darpan
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`).

---

**Designed for Odoo Hackathon** - Focus on Clean UI & Database Logic (Simulated).
