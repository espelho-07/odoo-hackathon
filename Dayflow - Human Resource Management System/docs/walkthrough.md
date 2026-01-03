# Dayflow HRMS - Setup & Run Instructions

## Project Structure
The project has been restructured as requested:
- **Root:** `Dayflow - Human Resource Management System/`
  - `backend/`: Node.js Express Server + MySQL Logic
  - `frontend/`: React + Vite Application (formerly `ui-manav`)

## 1. Database Setup
1. Open **MySQL Workbench**.
2. Run the script found in: `backend/schema.sql`.
   - This creates the `dayflow_hrms` database and all 5 tables.
3. Verify tables: `users`, `attendance`, `leaves`, `payroll`, `policies`.

## 2. Backend Setup
1. Navigate to the backend folder:
   ```powershell
   cd "d:\BTech\Darshan University\Hackathon's\Odoo X GCET Hackathon\Dayflow - Human Resource Management System\backend"
   ```
2. Configure Environment:
   - Rename `.env.example` to `.env`.
   - Open `.env` and enter your **DB_PASSWORD**.
3. Install Dependencies (if not done):
   ```powershell
   npm install
   ```
4. Start Server:
   ```powershell
   npm start
   ```
   - You should see: `✅ Connected to MySQL Database` and `🚀 Server running on port 5000`.

## 3. Frontend Setup
1. Open a **new terminal**.
2. Navigate to the frontend folder:
   ```powershell
   cd "d:\BTech\Darshan University\Hackathon's\Odoo X GCET Hackathon\Dayflow - Human Resource Management System\frontend"
   ```
3. Install Dependencies (if not done):
   ```powershell
   npm install
   ```
4. Start Application:
   ```powershell
   npm run dev
   ```
5. Click the link (usually http://localhost:5173) to open Dayflow.

## 4. Testing the App
- **Login:** Use `admin@dayflow.com` / `admin123` (Admin) or your created employee credentials.
- **Dashboard:** Now fetching live data from MySQL.
- **Employees:** Add/Delete employees directly affects the MySQL `users` table.
- **Attendance:** Check-In/Out updates the `attendance` table.
- **Leaves:** Apply for leave updates the `leaves` table.

> **Note:** The old `project-name` folder contains unused experiments (`ui-darpan`) and can be deleted once you close your editor.
