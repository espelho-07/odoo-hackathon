# Backend Design & Frontend Analysis

## 1. Frontend Analysis & Data Requirements

| Page | Actions | Data Needed | API Endpoint | DB Table |
| :--- | :--- | :--- | :--- | :--- |
| **Login** | User enters email/pass | User details (Role, Name, ID) | `POST /api/login` | `users` |
| **Dashboard** | View Stats, Charts, Recent items | User counts, Attendance counts, Leave counts, Recent logs | `GET /api/dashboard/stats` (Aggregated for simplicity) | `users`, `attendance`, `leaves` |
| **Employees** | List, Add, Edit, Delete | List of all employees | `GET /api/employees`, `POST /api/employees`, `PUT/DELETE` | `users` |
| **Attendance** | View logs, Check-in/out | List of logs, specific user logs | `GET /api/attendance`, `POST /api/attendance/checkin`, `POST /api/attendance/checkout` | `attendance` |
| **Leaves** | View requests, Apply, Approve/Reject | List of leaves, Status updates | `GET /api/leaves`, `POST /api/leaves`, `PUT /api/leaves/:id` | `leaves` |
| **Payroll** | View Payslip, Edit Salary | Salary details, generated slips | `GET /api/payroll/:userId`, `POST /api/payroll` | `payrolls`, `users` |

## 2. Database Schema (MySQL)
*Based on `database_schema.md`*

```sql
-- Simple User Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, -- Plain text for hackathon simplicity
    role ENUM('admin', 'employee') DEFAULT 'employee',
    department VARCHAR(50),
    designation VARCHAR(50),
    salary DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    date DATE,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20) DEFAULT 'Present',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Leaves
CREATE TABLE leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Payroll
CREATE TABLE payroll (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    month VARCHAR(20),
    basic_salary DECIMAL(10,2),
    allowances DECIMAL(10,2),
    deductions DECIMAL(10,2),
    net_salary DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'Paid',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 3. Project Structure
```
backend/
├── db.js             # Database connection (mysql2)
├── server.js         # Main Express app & Routes
├── package.json      # Dependencies
└── .env              # DB Credentials
```
*Note: Keeping it extremely simple (all routes in server.js or minimal route files) to adhere to "No complex architecture".*
