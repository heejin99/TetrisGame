require('dotenv').config()

var mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
})

db.connect()
module.exports = db