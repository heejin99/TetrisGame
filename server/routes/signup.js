const express = require('express')
const router = express.Router()
const db = require('../config/db')

// db 보안
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', (req, res)=>{
    res.render('tetris.ejs')
})
// 회원가입
router.post('/', (req, res) => {
    var param = [req.body.id, req.body.password, req.body.nickname]
        // 비밀번호 암호화
        bcrypt.hash(param[1], saltRounds, (error, hash) => {
            param[1] = hash
            db.query('SELECT * FROM user WHERE id=?', req.body.id, (errr, data) => {
                if (data.length === 0) {
                    // 아이디와 비밀번호 db에 추가
                    db.query('INSERT INTO user(`id`,`password`,`nickname`) VALUES (?,?,?)', param, (err, row) => {
                        if(err) return res.json({success: false, err})
                        res.redirect('/api')
                    })
                } else {
                    res.send('<script>alert("아이디가 존재합니다.");location.href="/api"</script>')
                }
            })
        })
        
})

module.exports = router