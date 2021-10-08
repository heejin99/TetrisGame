const express = require('express')
const router = express.Router()

const db = require('../config/db')
router.get('/', (req, res) => {
    // db.query('SELECT * FROM tetris WHERE highscore=(SELECT max(highscore) FROM tetris)', (err, row) => {
    //     if(err) return res.json({success:false, err})
    //     console.log(row[0], 'hs', row)
    //     let totalScore = 0 req.session.total
    //     if (row[0].highscore < totalScore) {
    //         db.query('update tetris set highscore=? where userId=?', [row[0], req.session.user], (error, rows) => {
    //             if(error) return res.json({success: false, error})
    //             res.render('tetris' , {

    //             })
    //             db.query('SELECT * FROM tetris', (errr, rro) => {
    //                 if(errr) return res.json({success: false, errr})
    //                 res.render('tetris', {
    //                     highscore: row[0].highscore
    //                 })
    //             })
    //         })
    //     }
    // })
    db.query('SELECT * FROM tetris', (err, row) => {
        if(err) return res.json({success: false, err})
        console.log(row[0])
        res.render('tetris', {
            highscore: row[0].highscore
        })
    })
})

// function highScore() {
//     db.query('SELECT GRATEST(INT(highscore)) FROM tetris', (err, row) => {
//         if(err) return res.json({success:false, err})
//         if (row[0] < totalScore) {
//             db.query('update tetris set highscore=? where userId=?', [row[0], req.session.user], (error, rows) => {
//                 if(error) return res.json({success: false, error})
//                 db.query('SELECT * FROM tetris', (errr, rro) => {
//                     if(errr) return res.json({success: false, errr})
//                     res.render('tetris', {
//                         highscore: row[0].highscore
//                     })
//                 })
//             })
//         }
//     })
//         localStorage.setItem('highScore', totalScore)
//         highScoreElem.textContent = totalScore
//         mainCtx.fillText('기록 갱신', 2.8, 4.2)
//     // } else {
//         mainCtx.fillText('게임 오버', 2.8, 4.2)
//  //   }

// }
// router.post('/', (req, res) => {
//     db.query('SELECT * FROM tetris', (err, row) => {
        
//         db.query('INSERT INTO tetris(`userId`) VALUES (?)', req.session.userId, (errr, rows) =>{
//             if(err) return res.json({success: false, errr})
//             console.log(rows)
//             res.redirect('/api')
            
//         })
//     }) 
// })

module.exports = router;