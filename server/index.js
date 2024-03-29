const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const port = process.env.PORT||3001
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.set('view engine', 'ejs')
console.log('dir', __dirname)
app.set('views', path.join(__dirname, '../client/views'))

app.use(express.static(path.join(__dirname, '../')))
app.use(cookieParser())
app.use(session({
    key: 'tetris',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24*60*60
    },
}))

app.use('/api', require('./routes/tetris'))
app.use('/api', require('./routes/login'))
app.use('/api/signup', require('./routes/signup'))

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
})