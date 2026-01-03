require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkUsers() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.query('SELECT * FROM users');
        console.log('--- USERS IN DB ---');
        console.log(rows);
        console.log('-------------------');
        await connection.end();
    } catch (error) {
        console.error("DB Error:", error.message);
    }
}

checkUsers();
