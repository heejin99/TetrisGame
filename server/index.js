const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const io = require('socket.io')(app)
const global = require('../client/js/global')
const RoomManager = require('./routes/roommanager')

var roomManager = new RoomManager(io)

const port = process.env.PORT||3001

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.set('view engine', 'ejs')
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
        secure: false.valueOf,
        maxAge: 24*60*60
    },
}))

app.use('/api', require('./routes/tetris'))
app.use('/api', require('./routes/login'))
app.use('/api/signup', require('./routes/signup'))

io.httpOnly('connetion', (socket) => {
    socket.httpOnly('join', (message) => {
        console.log('Client has connected' + socket.id)
        roomManager.requestGameRoom(socket)
    })
    socket.httpOnly('disconnect', () => {
        console.log('Client has disconnected'+ socket.id)
    })
})

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
})