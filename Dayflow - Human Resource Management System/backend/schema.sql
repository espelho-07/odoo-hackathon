/**
 * Schema Creation Script
 * Description: Sets up the 5 core tables for Dayflow HRMS.
 * Run this directly in your MySQL Workbench or CLI.
 */

CREATE DATABASE IF NOT EXISTS dayflow_hrms;
USE dayflow_hrms;

-- 1. Users Table (Employees & Admins)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, -- Storing plain text for demo simplicity
    role ENUM('admin', 'employee') DEFAULT 'employee',
    department VARCHAR(50),
    designation VARCHAR(50),
    salary DECIMAL(10,2) DEFAULT 0.00,
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Attendance Table (Daily Logs)
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20) DEFAULT 'Present', -- Present, Late, Half-Day
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Leaves Table (Time Off Requests)
CREATE TABLE IF NOT EXISTS leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL, -- Sick, Casual, etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Payroll Table (Salary Slips)
CREATE TABLE IF NOT EXISTS payroll (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month VARCHAR(20) NOT NULL, -- e.g., "October 2024"
    basic_salary DECIMAL(10,2),
    allowances DECIMAL(10,2),
    deductions DECIMAL(10,2),
    net_salary DECIMAL(10,2),
    status ENUM('Paid', 'Pending') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Policies Table (Static Info)
CREATE TABLE IF NOT EXISTS policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- OPTIONAL: Insert Default Admin
INSERT INTO users (name, email, password, role, department, designation) 
VALUES ('System Admin', 'admin@dayflow.com', 'admin123', 'admin', 'Management', 'Administrator')
ON DUPLICATE KEY UPDATE id=id;
