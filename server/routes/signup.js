const express = require('express')
const router = express.Router()
const db = require('../config/db')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/',(req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    var param = [req.body.id, req.body.password, req.body.nickname]

    bcrypt.hash(param[1], saltRounds, (error, hash) => {
        param[1] = hash
        db.query('SELECT * FROM user WHERE id=?', param[0], (erro, data) =>{
            if(data.length == 0) {
                db.query('INSERT INTO user(`id`, `password`, `nickname`) VALUES (?, ?, ?)', param, (err, row) =>{
                    if(err) return res.json({success: false, err})
                    res.redirect('/api/login')
                })
            } else {
                res.send('<scirpt>alert("아이디가 존재합니다. 다시 입력해주세요")</script>')
            }
        })
    })
})

module.exports = router