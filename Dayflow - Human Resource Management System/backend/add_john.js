require('dotenv').config();
const mysql = require('mysql2/promise');

async function addJohn() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Check if exists
        const [existing] = await connection.query('SELECT * FROM users WHERE email = ?', ['john@dayflow.com']);
        if (existing.length > 0) {
            console.log("⚠️ John already exists. Updating password...");
            await connection.query('UPDATE users SET password = ? WHERE email = ?', ['123456', 'john@dayflow.com']);
        } else {
            console.log("➕ Adding John...");
            await connection.query(
                `INSERT INTO users (name, email, password, role, department, designation, salary, join_date) 
                 VALUES (?, ?, ?, 'employee', 'Engineering', 'Software Engineer', 60000, CURDATE())`,
                ['John Doe', 'john@dayflow.com', '123456']
            );
        }

        console.log("✅ User 'John' is ready: john@dayflow.com / 123456");
        await connection.end();
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

addJohn();
