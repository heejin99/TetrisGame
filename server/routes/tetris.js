const express = require('express')
const router = express.Router()

const db = require('../config/db')
const axios = require('axios')

router.get('/', (req, res) => {
    db.query('SELECT * FROM tetris WHERE userId=?', req.session.user, (err, row) => {
        console.log(req.session.loggedin+"tetris"+req.session.nickname)
        if(req.session.loggedin) {
            if(row.length > 0) {
                res.json({
                    highScore: row[0].highscore,
                    loggedin: req.session.loggedin,
                    nickname: req.session.nickname,
                    user: req.session
                })
            }
            else {
                res.json({
                    highScore: 0,
                    loggedin: req.session.loggedin,
                    nickname: req.session.nickname,
                    user: req.session
                })
            }

        } else {
            console.log('hello')
            res.render('tetris', {
                loggedin: false
            })
        } 
    })
})

router.get('/tetris', (req, res) => {
        console.log(req.session.loggedin+"tetris"+req.session.nickname)
        if(req.session.loggedin) {
            res.render('main', {
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
router.get('/main', (req, res) => {
    res.render('tetris', {
        loggedin: req.session.loggedin,
        nickname: req.session.nickname,
        user: req.session,
    })
})
router.get('/leader', (req, res) => {
    db.query('SELECT * FROM tetris LEFT JOIN user ON tetris.userId = user.user_id ORDER BY tetris.highscore desc',(err, row) => {
        res.json({
            user: row
        })
    })
})

router.post('/', (req, res) => {
    // db.query
    db.query('SELECT * FROM tetris WHERE userId=?', req.session.user, (err, row) => {
        if (row.length === 0) {
            db.query('INSERT INTO tetris(`userId`, `highscore`) VALUES (?,?)', [req.session.user, req.query.score], (errr, rows) =>{
                if(err) return res.json({success: false, errr})
                console.log('post rows',rows,row)
                // console.log('data ', data)
                        
                res.json({highScore: req.query.score})
            })
        }
        else if (row[0].userId === req.session.user) {
            db.query('update tetris set highscore=? where userId=?', [req.query.score, req.session.user], (error, rows) => {
                if(error) return res.json({updatesuccess: false, error})
                console.log(row)
                console.log(row[0].highscore)
            })
            res.json({highScore: row[0].highscore})
        }
    })
    console.log(req.session.user)
})

module.exports = router