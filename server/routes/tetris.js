const express = require('express')
const router = express.Router()

const db = require('../config/db')
router.get('/', (req, res) => {
    db.query('SELECT * FROM TETRIS', (err, row) => {
        if(err) return res.json({success: false, err})
        console.log(row[0])
        res.render('tetris', {
            highScore: row[0]
        })
    })
})

router.post('/', (req, res) => {
    db.query('SELECT * FROM tetris', (err, row) => {
        
        db.query('INSERT INTO tetris(`userId`) VALUES (?)', req.session.userId, (errr, rows) =>{
            if(err) return res.json({success: false, errr})
            console.log(rows)
            res.redirect('/api')
            
        })
    }) 
})

module.exports = router;