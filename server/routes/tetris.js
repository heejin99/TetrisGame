const express = require('express')
const router = express.Router()

const db = require('../config/db')
const axios = require('axios')

// const getJson = () => {
//     db.query('SELECT * FROM tetris', (err, row) => {
//         JSON.stringify({
//             'method':'get',
//             'score': row[0].highscore,
//             'name': req.session.nickname
//         })
//     })
// // }

// const getJson = () => {
//     db.query('SELECT * FROM tetris', (err, row) => {
//         axios.get('/')
//     })
// }

router.get('/', (req, res) => {
        console.log(req.session.loggedin+"tetris"+req.session.nickname)
        if(req.session.loggedin) {
            res.render('tetris', {
                loggedin: req.session.loggedin,
                nickname: req.session.nickname,
                user: req.session,
            })
        } else {
            console.log('hello')
            res.render('tetris', {
                loggedin: false
            })
        } 
    
})

router.post('/', (req, res) => {
    db.query('SELECT * FROM tetris WHERE userId=?', req.session.user, (err, row) => {
        if (row.length > 0 && (row.userId || row[0].userId) == req.session.user) {
            
                db.query('update tetris set highscore=? where userId=?', [req.query.score, req.session.user], (error, rows) => {
                    if(error) return res.json({updatesuccess: false, error})
                    console.log(row[0].highscore)
                    res.json({highScore: row[0].highscore})
                })
            
        }
        else {
            db.query('INSERT INTO tetris(`userId`, `highscore`) VALUES (?,?)', [req.session.user, req.query.score], (errr, rows) =>{
                if(err) return res.json({success: false, errr})
                console.log('post rows',rows,row)
                // console.log('data ', data)
                    res.json({highScore: row[0].highscore})
                        
                })
            }
    })
    
})

module.exports = router