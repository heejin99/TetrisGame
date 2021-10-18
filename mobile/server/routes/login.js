const express = require('express')
const router = express.Router()
const db = require('../config/db')

// db 보안
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/login', (req, res)=>{
    console.log('login '+req.session.nickname+req.session)
        res.render('main.ejs', {
            user:req.session, 
            loggedin: req.session.loggedin, 
            nickname: req.session.nickname
        })
})
// 로그인
router.post('/login', (req, res) => {
    const param = [req.body.id, req.body.password]
    
    db.query('SELECT * FROM user WHERE id=?', param[0], (err, row) => {
        if(err) return res.json({success: false, err})
        if(row.length > 0) { // ID exists
            bcrypt.compare(param[1], row[0].password, (error, result) => {
                // 비밀번호 불일치
                if(!result) {
                    return res.send('<script>alert("비밀번호가 틀렸습니다.다시 입력하세요");location.href="/api"</script>')
                    
                }
                // 비밀번호 일치
                req.session.loggedin = true;
                req.session.id = param[0]
                req.session.nickname = row[0].nickname
                req.session.user = row[0].user_id
                req.session.save(() => {
                    req.session.loggedin = true;
                    req.session.id = param[0]
                    req.session.nickname = row[0].nickname
                    req.session.user = row[0].user_id
                    console.log(req.session.loggedin+req.session.nickname)
                    res.render('main', {
                        nickname: req.session.nickname,
                        id: row[0].id,
                        user: row[0].user_id,
                        loggedin: true
                    })
                })
            })
        } else { // ID not exists
            return res.send('<script>alert("아이디가 존재하지 않습니다.회원가입을 먼저 진행해주세요.");location.href="/api"</script>')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.loggedin = false
    req.session.destroy((err) => {
        // req.session
        console.log('세션삭제')
    })
    // res.status(200).json({logoutSucess: true})
    res.redirect('/api')
})

module.exports = router