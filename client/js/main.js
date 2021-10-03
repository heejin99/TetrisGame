let mainBl = null
let subBl = null

let mainMatrx = getEmptyBoard(MAIN_ROWS, MAIN_COLS)
let time = 0
let reqId = null

let timeRemove = 0
let fillLines = []

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

function reset() {
    mainMatrx = getEmptyBoard(MAIN_ROWS, MAIN_COLS)
    time = 0
    timeRemove = 0
    mainBl = null
    subBl = null
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
            break
        case KEY.LEFT:
            validMove(mainBl,mainMatrx, -1, 0)
            break
        case KEY.RIGHT:
            validMove(mainBl, mainMatrx,1, 0)
            break
        case KEY.SPACE:
            while(validMove(mainBl, mainMatrx, 0, 1)) {
                // globalAddscore += 10*currentLevel 
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
    gameStatus = 'S'
    window.addEventListener('keydown', keyHandler)
    setBlock()
    repeatMotion(0)
    resetScore()
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
    } else {
        gameStatus = 'S'
        repeatMotion()
    }
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
            // stack(mainBl, mainMatrx)
            // mainBl = subBl
            // subBl = createBlock()

            // mainMatrx[0].some((value, x) => {
            //     if (value > 0) {
            //         window.cancelAnimationFrame(reqId)
            //         reqId = null
            //         return true
            //     }
            // })
            // if(reqId == null) {
            //     return;
            // }
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
    if(totalScore >= 1000) {
        addLevel(1)
    } else if(totalScore >= 2000) {
        addLevel(1)
    } else if(totalScore >= 3000) {
        addLevel(1)
    } else if (totalScore >= 4000) {
        addLevel(1)
    }
    if (fillLines.length > 0) {
        if (timeRemove == 0) {
            timeRemove = timeStamp
        }
        if (timeStamp - timeRemove > 100) {
            removeLines(mainMatrx, fillLines)
            globalAddscore += 50*fillLines.length*currentLevel
            addScore(globalAddscore)
            console.log(totalScore)
            
            globalAddscore = 0

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
    draw(mainBl, mainCtx)
    draw(subBl, subCtx)
    drawBoard(mainMatrx, mainCtx)
    drawRemoveLine(mainCtx, MAIN_COLS, fillLines)
}


function nextStep() {
    stack(mainBl, mainMatrx)
    fillLines = checkFilledLines(mainMatrx)

    if(fillLines.length == 0) {
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
            gameStats = 'Q'
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
}
