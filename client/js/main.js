let mainBl = null
let subBl = null

let mainMatrx = getEmptyBoard(MAIN_ROWS, MAIN_COLS)
let time = 0
let reqId = null

let timeRemove = 0
let fillLines = []

const loginButton = document.querySelector('#login-button')
const signupButton = document.querySelector('#signup-button')
const showLeaderBoard = document.querySelector('#show-leaderboard')
const logoutButton = document.querySelector('#logout-button')

showLeaderBoard.addEventListener('click', handleLeaders)
let nickname = document.querySelector('#nickname')
let playing = false
let totalScore = 0
let scoreElem = document.querySelector('#score')
let addScoreElem = document.querySelector('#addScore')
let addScoreId = null
let globalAddscore = 0
let currentLevel = 1

let levelElem = document.querySelector('#level')
let levelUpElem = document.querySelector('#levelUp')
let levelId = null

let lines = 0
let linesElem = document.querySelector('#lines')
let removeLinesElem = document.querySelector('#removeLines')
let removeLinesId = null

let highScoreElem = document.querySelector('#highScore')
let comboCnt = 0


function reset() {
    mainMatrx = getEmptyBoard(MAIN_ROWS, MAIN_COLS)
    time = 0
    timeRemove = 0
    mainBl = null
    subBl = null
    unDisplayEndGame()
}

function addLines(line) {
    lines += line
    linesElem.textContent = lines
    if(lines < 0) {
        removeLinesElem.textContent = line
    }
    if (removeLinesId) {
        clearTimeout(removeLinesId)
    }
    removeLinesId = setTimeout(() => {
        removeLinesElem.textContent = ""
    }, 1000)
}

function addScore(score) {
    totalScore += score
    scoreElem.textContent = totalScore
    if (score > 0) {
        addScoreElem.textcontent = '+' + score
    }
    if (addScoreId) {
        clearTimeout(addScoreId)
    }
    addScoreId = setTimeout(() => {
        addScoreElem.textContent=""
    }, 1000)
}



function addLevel(level) {
    currentLevel += level
    levelElem.textContent = currentLevel
    if (level > 0) {
        levelUpElem.textContent = '레벨 업!!'
    } 
    if (levelId) {
        clearTimeout(levelId)
    }
    levelId = setTimeout(() => {
        levelUpElem.textContent=""
    }, 2000)
}

function keyHandler(event) {
    const inputKey = event.keyCode

    switch(inputKey) {
        case KEY.UP:
            validRotate(mainBl, mainMatrx)
            break
        case KEY.DOWN:
            validMove(mainBl, mainMatrx, 0, 1)
            globalAddscore += 1
            break
        case KEY.LEFT:
            validMove(mainBl,mainMatrx, -1, 0)
            break
        case KEY.RIGHT:
            validMove(mainBl, mainMatrx,1, 0)
            break
        case KEY.SPACE:
            while(validMove(mainBl, mainMatrx, 0, 1)) {
                globalAddscore += 8 
            };
            nextStep()
            time = 0  
            break
    }

    draw(mainBl, mainCtx)
}

function setBlock() {
    mainBl = subBl ? subBl : createBlock()
    mainBl.y = 0
    mainBl.x = 3
    subBl = createBlock()
    subBl.x = (subBl.shape[1][0]==3)?0:1
    subBl.y = (subBl.shape[0][0]==4)?1:0
}

function start() {
    reset()
    console.log('start')
    gameStatus = 'S'
    window.addEventListener('click', event => {})
    window.addEventListener('keydown', keyHandler)
    setBlock()
    repeatMotion(0)
    resetScore()
    gamesGetRequest()
        .then(response => {
            highScoreElem.textContent = response.data.highScore
        })
}

function pause() {
    if (reqId) {
        window.cancelAnimationFrame(reqId)
        reqId = null
        gameStatus = 'P'

        mainCtx.fillStyle = '#6f9cf0'
        mainCtx.fillRect(1, 3, 8, 1.8)
        mainCtx.font = '1px NeoDungGeunMo'
        mainCtx.fillStyle = '#ffffff'
        mainCtx.fillText('일시 정지', 2.8, 4.2)
    }
    else {
        resume()
    }
}

function resume() {
    gameStatus = 'S'
    repeatMotion()
}
  
function isHighScore (scoreNum, games) {
    let minHighScore
    if (games.data.highScore >= 10) {
      minHighScore = Math.min(games.data.highScore, scoreNum)
    } else {
      minHighScore = 0
    }
    return scoreNum > minHighScore
}

function quit() {
    
    mainCtx.fillStyle = '#f0b71b'
    mainCtx.fillRect(1,3,8,1.8)
    mainCtx.font = '1px NeoDungGeunMo'
    mainCtx.fillStyle = '#ffffff'
    mainCtx.fillText('게임 오버', 2.8, 4.2)
    let highScore = Number(scoreElem.textContent)
    pause()
    const endGame = displayEndGame()
    gamesGetRequest()
        .then(json => {
            console.log('json: ',json)
            if(isHighScore(highScore, json)) {
                displayHighScore(endGame)
                if (loggedin) {
                    const game = {
                        user_id : nickname.textContent,
                        score: highScore
                    }
                    gamePostRequest(game)
                } else {
                    displayLogin()
                    afterLogin(()=> {
                        const game={
                            user_id: nickname,
                            score: highScore
                        }
                        gamePostRequest(game)
                    })
                }
            }
        })
    gameStatus = 'Q'
}

function afterLogin(callback) {
    const interval = window.setInterval(()=>{
        if (loginRequest) {
            loginRequest.then(()=>{
                callback()
                window.clearInterval(interval)
            })
        }
    }, 1000)
}

function initRemoveLines() {
    fillLines = []
    timeRemove = 0
    time = 0 
}

function repeatM(timeStamp, sec) {
    if (timeStamp - time > sec) {
        if(!validMove(mainBl, mainMatrx ,0, 1)) {
            nextStep()
        }
        time = timeStamp
    }
}
function repeatMotion(timeStamp) {
    if (time == 0) {
        time = timeStamp
    }
    switch(currentLevel) {
        case 1:
            repeatM(timeStamp, 1500)
            break
        case 2:
            repeatM(timeStamp, 1000)
            break
        case 3:
            repeatM(timeStamp, 800)
            break
        case 4:
            repeatM(timeStamp, 600)
            break
        default:
            repeatM(timeStamp, 500)
            break
    }
    if (fillLines.length > 0) {
        if (timeRemove == 0) {
            timeRemove = timeStamp
        }
        if (timeStamp - timeRemove > 100) {
            comboCnt++
            globalAddscore += 30*fillLines.length*currentLevel*comboCnt
            removeLines(mainMatrx, fillLines)
            globalAddscore += 50*fillLines.length*currentLevel
            addScore(globalAddscore)
            globalAddscore = 0
            addLines(fillLines.length)
            if (lines >= 10 && (lines / 10 == 1 || lines / 10 == 2 || lines / 10 == 3 ||lines/10==4||lines/10==5)) {
                addLevel(1)
            }
            initRemoveLines()
            setBlock()
        }
    }
    rebuild()
    if(gameStatus === 'S') {
        reqId = window.requestAnimationFrame(repeatMotion)
    } else {
        gameStatus = 'Q'
    }
}
function rebuild() {
    drawLatt(mainMatrx, mainCtx)
    drawLatt((new Array(4)).fill((new Array(4)).fill(0)), subCtx)
    draw(mainBl, mainCtx)
    draw(subBl, subCtx)
    drawBoard(mainMatrx, mainCtx)
    drawRemoveLine(mainCtx, MAIN_COLS, fillLines)
    drawcombo(mainCtx, comboCnt, COLORS)
}


function nextStep() {
    stack(mainBl, mainMatrx)
    fillLines = checkFilledLines(mainMatrx)

    if(fillLines.length == 0) {
        comboCnt = 0
        addScore(globalAddscore)
        globalAddscore = 0
        mainMatrx[0].some((value, x) => {
            if (value > 0) {
                gameStatus = 'Q'
                return true
            }
        })
        const cloneBl = clone(subBl)
        cloneBl.y = 0
        cloneBl.x = 3
        if (valid(cloneBl, mainMatrx)) {
            setBlock()
        } else {
            gameStatus = 'Q'
        }
    }
    rebuild()
    if(playing) {
        reqId = window.requestAnimationFrame(repeatMotion)
    }
}

function resetScore() {
    totalScore = 0
    scoreElem.textContent = "0"
    addScoreElem.textContent = ""

    currentLevel = 1
    levelElem.textContent = "1"
    levelUpElem.textContent = ""

    lines = 0
    linesElem.textContent = "0"
    removeLinesElem.textContent =""
}

function pressKey(keyCode) {
    if(gameStatus==="S" || gameStatus ==='P') {
        const obj = {
            keyCode: keyCode
        }
        keyHandler(obj)
    }
}

