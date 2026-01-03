require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function init() {
    console.log("🚀 Initializing Database...");

    try {
        // Connect to Server (without DB)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        });

        console.log("✅ Connected to MySQL Server");

        // Read Schema
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        // Run Queries
        console.log("⚙️ Running Schema...");
        await connection.query(schema);

        console.log("✅ Database and Tables created successfully!");

        await connection.end();
    } catch (error) {
        console.error("❌ Error initializing database:", error.message);
    }
}

init();
