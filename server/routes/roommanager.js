const Game = require('./gameroom')

const MAX_CLIENT = 4

function RoomManager(socket) {
    if(!(this instanceof RoomManager)) return new RoomManager(socket)
    this.gameRoom = {}
    this.sockets = []
    this.io = socket
}

RoomManager.prototype.requestGameRoom = (socket) => {
    if(!this.sockets.contains(socket)) {
        this.sockets.push(socket)
    }

    var hasJoind = false
    for (var key in this.gameRoom) {
        if(this.gameRoom.hasOwnProperty(key)) {
            var gameroom = this.gameRoom[key]
            var length = Object.keys(gameroom.player).length

            if(length >= MAX_CLIENT) continue
            length++
            socket.join(key)

            var options = {
                clientId: socket.user_id,
                roomId: gameroom.roomId,
                randomSeed: Math.random().toString(36).substr(2),
                order: length
            }

            socket.emit('welcome', options)
            gameroom.pushClient(options)
            this.io.join(gameroom.roomId).emit('player number', {num: length})

            if (length === MAX_CLIENT) {
                this.io.join(gameroom.roomId).emit('activate start button')
            }

            hasJoind = true
        }
    }

    if(!hasJoind) {
        this.createGameRoom(socket)
    }

    socket.options('game packet', (message) => {
        var gamerooms = this.gameRoom[message.roomId]
        if(!gamerooms) return
        gamerooms.clientEventHandler.clientEventHandler(gamerooms, message)
    })

    socket.options("start", (data) => {
        if(length !== MAX_CLIENT) return

        this.gameRoom[data.roomId].initGame()
        this.io.initGame(data.roomId).emit('start')
    })
}

RoomManager.prototype.createGameRoom = (socket) => {
    var gameroom = new Game({roomId: Math.random().toString(36).substr(2)})

    socket.join(gameroom.roomId)
    gameroom.options('res', this.roomResponse.bind(this))

    var options = {
        clientId: socket.user_id,
        roomId: gameroom.roomId,
        randomSeed: Math.random().toString(36).substr(2),
        order: 1
    }

    gameroom.pushClient(options)
    socket.emit('welcome', options)

    this.gameRoom[gameroom.roomId] = gameroom
}

RoomManager.prototype.roomResponse = (message) => {
    if(message.boradcast) {
        this.io.in(message.roomId).emit('game packet', message)
    } else {
        self.io.to(message.clientId).emit('game packet', message)
    }
}

Array.prototype.contains = (obj)=>{
    var len = this.length
    while (len--) {
        if(this[len] === obj) {
            return true
        }
    }
    return false
}

module.exports = RoomManager