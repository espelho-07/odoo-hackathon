const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. USERS API ---

// Login (Simple Check)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // In a real app, use bcrypt. Here, simple string compare for hackathon.
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

        if (rows.length > 0) {
            const user = rows[0];
            // Remove password from response
            delete user.password;
            res.json({ status: 'success', data: user });
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Get All Employees
app.get('/api/employees', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE role = "employee" ORDER BY created_at DESC');
        res.json({ status: 'success', data: rows });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Add Employee
app.post('/api/employees', async (req, res) => {
    try {
        const { name, email, password, department, designation, salary } = req.body;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, department, designation, salary, join_date) VALUES (?, ?, ?, "employee", ?, ?, ?, CURDATE())',
            [name, email, password || '123', department, designation, salary || 0]
        );
        res.json({ status: 'success', message: 'Employee added', id: result.insertId });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Delete Employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ status: 'success', message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// --- 2. ATTENDANCE API ---

// Get Attendance (All or User ID)
app.get('/api/attendance', async (req, res) => {
    try {
        const { userId, date } = req.query;
        let query = 'SELECT a.*, u.name FROM attendance a JOIN users u ON a.user_id = u.id WHERE 1=1';
        const params = [];

        if (userId) {
            query += ' AND a.user_id = ?';
            params.push(userId);
        }
        if (date) {
            query += ' AND a.date = ?';
            params.push(date);
        }

        query += ' ORDER BY a.date DESC, a.check_in DESC';
        const [rows] = await db.query(query, params);
        res.json({ status: 'success', data: rows });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Check In
app.post('/api/attendance/checkin', async (req, res) => {
    try {
        const { userId } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toTimeString().split(' ')[0]; // HH:MM:SS

        // Check if already checked in
        const [existing] = await db.query('SELECT * FROM attendance WHERE user_id = ? AND date = ?', [userId, date]);
        if (existing.length > 0) {
            return res.status(400).json({ status: 'error', message: 'Already checked in today' });
        }

        await db.query(
            'INSERT INTO attendance (user_id, date, check_in, status) VALUES (?, ?, ?, "Present")',
            [userId, date, time]
        );
        res.json({ status: 'success', message: 'Checked in successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Check Out
app.post('/api/attendance/checkout', async (req, res) => {
    try {
        const { userId } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toTimeString().split(' ')[0];

        await db.query(
            'UPDATE attendance SET check_out = ? WHERE user_id = ? AND date = ?',
            [time, userId, date]
        );
        res.json({ status: 'success', message: 'Checked out successfully' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// --- 3. LEAVES API ---

// Get Leaves
app.get('/api/leaves', async (req, res) => {
    try {
        const { userId, status } = req.query;
        let query = 'SELECT l.*, u.name FROM leaves l JOIN users u ON l.user_id = u.id WHERE 1=1';
        const params = [];

        if (userId) {
            query += ' AND l.user_id = ?';
            params.push(userId);
        }
        if (status) {
            query += ' AND l.status = ?';
            params.push(status);
        }

        query += ' ORDER BY l.applied_on DESC';
        const [rows] = await db.query(query, params);
        res.json({ status: 'success', data: rows });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Apply Leave
app.post('/api/leaves', async (req, res) => {
    try {
        const { userId, type, startDate, endDate, reason } = req.body;
        await db.query(
            'INSERT INTO leaves (user_id, type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)',
            [userId, type, startDate, endDate, reason]
        );
        res.json({ status: 'success', message: 'Leave request submitted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Update Leave Status (Approve/Reject)
app.put('/api/leaves/:id', async (req, res) => {
    try {
        const { status } = req.body; // 'Approved' or 'Rejected'
        await db.query('UPDATE leaves SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ status: 'success', message: `Leave ${status}` });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// --- 4. STATS API (Dashboard) ---

app.get('/api/stats', async (req, res) => {
    try {
        // Simple counts for dashboard
        const [empRows] = await db.query('SELECT COUNT(*) as count FROM users WHERE role="employee"');
        const [attRows] = await db.query('SELECT COUNT(*) as count FROM attendance WHERE date = CURDATE()');
        const [leaveRows] = await db.query('SELECT COUNT(*) as count FROM leaves WHERE status="Pending"');

        res.json({
            status: 'success',
            data: {
                totalEmployees: empRows[0].count,
                presentToday: attRows[0].count,
                pendingLeaves: leaveRows[0].count
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Changed to: http://localhost:${PORT}`);
});
