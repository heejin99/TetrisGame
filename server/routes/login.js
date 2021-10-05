const express = require('express')
const router = express.Router()

// const db = require('../o')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/login', (req, res) => {
    res.render('login', {user: req.session})
})

router.post('/login', (req,res) => {
    const param = [req.body.id, req.body.password]

    db.query('SELECT * FROM user WHERE id=?', param[0], (err, row) => {
        if (err) return res.json({success: false, err})
        if (row.length > 0) {
            bcrypt.compare(param[1], row[0].password, (error, rows) => {
                if(!rows) {
                    return res.send('<script>alert("비밀번호가 틀렸습니다. 다시 시도해주세요")</script>')
                }
                req.session.loggedIn = true
                req.session.id = param[0]
                req.session.nickname = row[0].nickname
                req.session.user = row[0].user_id
                req.session.save(() => {
                    res.render('tetris', {
                        nickname: row[0].nickname,
                        id: row[0].id,
                        user: row[0].user_id,
                        loggedIn: true
                    })
                })
            })
        } else {
            return res.send('<script>alert("아이디가 존재하지 않습니다. 회원가입을 먼저 진행해주세요")</script>')
        }
    })
})

router.get('/logout', (req,res) => {
    req.session.loggedIn = false
    req.session.destroy((err) => {
    })
    res.redirect('/api')
})

module.exports = router