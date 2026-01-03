# MySQL Database Schema – Dayflow HRMS

> **Hackathon Context**: This schema is designed to be **simple, frontend-driven, and explanation-friendly**. It avoids overengineering (no complex joins, no triggers) to ensure it is easy to present to judges.

---

## 1. Overview of Tables
We need **5 simple tables** to power the entire frontend.

| Table Name | Purpose | Linked Frontend Page |
| :--- | :--- | :--- |
| **`users`** | Stores employee login & profile info | Login, Profile, Directory |
| **`attendance`** | Tracks daily check-in/out times | Attendance, Dashboard |
| **`leaves`** | Stores leave requests & status | Time Off, Dashboard |
| **`payrolls`** | Stores monthly salary slip data | Payroll, Salary Page |
| **`policies`** | Stores static company rules | Policies Page |

---

## 2. Table Design & Explanations

### 1. `users` (The Central Table)
**Why:** Every feature revolves around an employee. This table stores who they are.
**Frontend Mapping:**
- **Login:** Check `email` and `password`.
- **Profile:** Display `name`, `role`, `department`, `salary`.
- **Directory:** List all rows where `role = 'employee'`.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store simple text for hackathon or hashed
    role ENUM('admin', 'employee') DEFAULT 'employee',
    department VARCHAR(50),         -- e.g., 'IT', 'HR', 'Sales'
    designation VARCHAR(50),        -- e.g., 'Developer', 'Manager'
    salary DECIMAL(10, 2) DEFAULT 0.00, -- Base monthly salary
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. `attendance`
**Why:** To calculate work hours and show "Present/Absent" status.
**Frontend Mapping:**
- **Dashboard:** Show "Present Today" if a record exists for `CURRENT_DATE`.
- **Attendance Page:** Show list of check-in/out times for the logged-in user.

```sql
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    check_in_time TIME,             -- e.g., '09:00:00'
    check_out_time TIME,            -- e.g., '18:00:00' (NULL if currently working)
    status VARCHAR(20) DEFAULT 'Present', -- 'Present', 'Late', 'Half-Day'
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
*Note: `ON DELETE CASCADE` means if you delete a user, their attendance logs are also deleted automatically. Keeps DB clean.*

### 3. `leaves`
**Why:** Employees need to ask for days off, and Admins need to approve them.
**Frontend Mapping:**
- **Time Off Page:** Employee fills form -> INSERT into `leaves` with status 'Pending'.
- **Admin Dashboard:** Admin sees 'Pending' requests -> UPDATE status to 'Approved'.

```sql
CREATE TABLE leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    leave_type VARCHAR(50),         -- 'Sick', 'Casual', 'Earned'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. `payrolls`
**Why:** To generate the payslip view on the Salary/Payroll page.
**Frontend Mapping:**
- **Payroll Page:** User selects a month -> SELECT from `payrolls` where `month` matches.
- **Admin:** Processes salary -> INSERT into `payrolls`.

```sql
CREATE TABLE payrolls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month VARCHAR(20),              -- e.g., 'October 2024'
    basic_salary DECIMAL(10, 2),    -- Copied from users table snapshot
    allowances DECIMAL(10, 2),      -- Rent, Transport, etc.
    deductions DECIMAL(10, 2),      -- Tax, PF
    net_salary DECIMAL(10, 2),      -- (Basic + Allowances) - Deductions
    status ENUM('Paid', 'Pending') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 5. `policies`
**Why:** Simple static content for the "Policies" page.
**Frontend Mapping:**
- **Policies Page:** SELECT * FROM `policies`.

```sql
CREATE TABLE policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
```

---

## 3. Example Queries (Backend Logic)

### Login Flow
**User enters email/password:**
```sql
SELECT * FROM users WHERE email = 'darpan@example.com' AND password = '123';
```

### Dashboard Stats (Admin)
**"How many employees are present today?"**
```sql
SELECT COUNT(*) FROM attendance WHERE date = CURDATE();
```

**"How many pending leave requests?"**
```sql
SELECT COUNT(*) FROM leaves WHERE status = 'Pending';
```

### Employee Profile
**Get my attendance history:**
```sql
SELECT * FROM attendance WHERE user_id = 1 ORDER BY date DESC LIMIT 30;
```

---

## 4. Why This Design for Hackathon?
1.  **Frontend-First:** Every table maps directly to a page you built.
2.  **Zero Complexity:** No join tables (like `user_roles`), no complex triggers.
3.  **Readability:** Column names (`check_in_time`, `full_name`) are self-explanatory.
4.  **Robust Enough:** Uses simple Foreign Keys to keep data linked correctly without crashing.
