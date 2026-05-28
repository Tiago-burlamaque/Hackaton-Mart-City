import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql2.createPool({
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "senai",
    database: process.env.DB_NAME || "hackaton_smart_city",
    host: process.env.DB_HOST || "localhost"
})

export default db;