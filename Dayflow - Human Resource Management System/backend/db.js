const mysql = require('mysql2');
require('dotenv').config();

/**
 * Database Connection Module
 * 
 * Why MySQL?
 * - Relational data (User -> Attendance, User -> Payroll) fits perfectly.
 * - Requested by hackathon rules.
 * - Simple column structure matches frontend requirements.
 */

// Create a connection pool for better performance
// Pool allows multiple concurrent queries without reconnecting every time.
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dayflow_hrms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection when this file is loaded
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err.message);
        console.error('   -> Check if MySQL is running.');
        console.error('   -> Check .env credentials.');
    } else {
        console.log('✅ Connected to MySQL Database');
        connection.release();
    }
});

// Export promise-based pool for easier async/await usage
module.exports = pool.promise();
