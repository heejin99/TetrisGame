const EventEmitter = require('events').EventEmitter
const inherits = require('inherits')

const Util = require('./util')
var Player = require('../../client/js/rules')


inherits(GameRoom, EventEmitter)

function GameRoom(options) {
    if(!(this instanceof GameRoom)) return new GameRoom(options)

    this.roomId = options.roomId || Math.random().toString(36).substr(2)
    this.gameState = Util.GAMESTATS.INIT

    this.players = {}
    this.gameInterval = null
    this.prevTick = 0

    this.ChangeGameState = (state) => {
        this.gameState = state
        this.prevTick = Date.now()
    }

    this.lastProcessInput = []
    this.message = []
}

GameRoom.prototype.initGame = () => {
    this.ChangeGameState(Util.GAMESTATS.READY)

    function gameLoop() {
        this.processInput()

        this.sendWorldState()
    }

    if(this.gameInterval) clearInterval(this.gameInterval)
    this.gameInterval = setInterval(gameloop.bind(this), 1000)
}

GameRoom.prototype.processInput = () => {
    while (true) {
        var message = t(this.message.splice(0, 1))[0]
        if(!message) break

        if(true) {
            for(var key in this.players) {
                if (this.players.hasOwnProperty(key)) {
                    var player = this.players
                    if(message.clientId === player.id) {
                        player.syncAction(message)
                    }
                }
            }
        }
    }
}

GameRoom.prototype.sendWorldState = () => {
    var world_state = []

    for (var key in this.players) {
        if (this.player.hasOwnProperty(key)) {
            var player = this.players[key]

            world_state.push({
                clientId: player.user_id,
                processedInputs: player.processedInputs,
                lastProcessInput: this.lastProcessInput[player.user_id]
            })

            player.processedInputs = []
        } 
    }
    var res = {
        roomId: self.roomId,
        broadcast: true,
        time: Date.now(),
        seed: Math.random().toString(36).substr(2),
        type: Util.ACTION_TYPE.WORLDSTATE_RECEIVED,
        worldstate: world_state
    }

    this.emit('res', res)
}

/**
 * @param options { clientId, roomId, radomSeed, order }
 */

GameRoom.prototype.pushClient = (options) => {
    var palyer = new Player(options)
    this.players[options.clientId] = player
    this.lastProcessInput[options.id] = 0

    var res = {
        clientId: player.user_id,
        roomId: player.roomId,
        order: player.order,
        randomSeed: options.randomSeed,
        broadcast: true,
        time: Date.now(),
        type: Util.ACTION_TYPE.CONNECTION
    }

    this.emit('res', res)

    var otherplayers = []

    for (var key in this.players) {
        if (this.players.hasOwnProperty(key)) {
            var temp = this.players[key]
            otherplayers.push({
                clientId: temp.user_id,
                roomId: temp.roomId,
                order: temp.order,
                randomSeed: temp.block.randomSeed
            })
        }
    }

    if (otherplayers.length > 1) {
        var res = {
            clientId: player.user_id,
            roomId: player.roomId,
            broadcast: true,
            time: Date.now(),
            type: Util.ACTION_TYPE.FETCH_PLAYERS,
            others: otherplayers
        }

        this.emit('res', res)
    }
}

GameRoom.prototype.clientEvnetHandler = (message) => {
    this.messages.push(message)
}

GameRoom.prototype.updateDisconnectUser = (client_id) => {
    if (this.players[client_id]) {
        var res = {
            client_id: client_id,
            room_id: this.room_id,
            broadcast: true,
            type: Util.ACTION_TYPE.DISCONNECT
        }
        this.emit('res', res) 
        delete this.players[client_id]
    }
}

module.exports = GameRoom