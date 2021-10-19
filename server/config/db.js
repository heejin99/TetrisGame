require('dotenv').config()

var mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
})

function handleDisconnect() {
    var intervalId
    db.connect(function (err) {
        if (err) {
            console.log('db error: ',err)
            setTimeout(handleDisconnect, 2000)
        }
    })
    
    const preventClosingConnection= ()=>{ 
        db.query('SELECT 1').catch(e=> console.error(e)); 
    }; 
    db.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            return handleDisconnect()
        } else if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){
            intervalId = setInterval(preventClosingConnection, 5* 1000) 
            clearInterval(intervalId);            
        } else {
            throw err
        }
    })
}

// db.connect()
handleDisconnect()
module.exports = db