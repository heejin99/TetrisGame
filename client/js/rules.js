const main_canvas = document.querySelector('#main-board'); 
const main_ctx = main_canvas.getContext('2d'); 
const side_canvas = document.querySelector('#side-board'); 
const side_ctx = side_canvas.getContext('2d'); 

const COL_MAIN = 10; 
const ROW_MAIN = 20; 
const COL_SIDE = 4; 
const ROW_SIDE = 4;

let time = 0
let reqAniId = null
let mainBlock = null
let sideBlock = null

let totalScore = 0
let socreEle = document.querySelector('#score')
let addScoreEle = document.querySelector('#add-score')
let addScoreId = null
let globalAddScore = 0

let remaningLine = 0
let lineEle = document.querySelector('#line')
let removeLineEle = document.querySelector('#remove-line')
let removeLineId = null

let levelEle = document.querySelector('#level')
let levelUpEle = document.querySelector('#up-level')
let levelId = null

let currentLevel = 1
let timeForRemovingLines = 0
let fillLines = []
// let gameStatus = -1

const startB = document.querySelector('#start')
const quitB = document.querySelector('#quit')
const pauseB = document.querySelector('#pause')

function getRandomIndex(len) {
    return Math.floor(Math.random()*len)
}

function keyHandler(event) {
    const inKey = event.keyCode

    const KEY = {
        LEFT: 37, 
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32
    }

    switch(inKey) {
        case KEY.UP:
            validRotate(mainBlock, main_matrix)
            break
        case KEY.DOWN:
            if(gameStatus=='G') {
                if (validMove(mainBlock, main_matrix, 0, 1)) {
                    // addScore(10*currentLevel)
                } else {
                    nextStep()
                    time=0
                }
            }
            break
        case KEY.LEFT:
            validMove(mainBlock, main_matrix, -1, 0)
            break
        case KEY.RIGHT:
            validMove(mainBlock, main_matrix, 1, 0)
            break
        case KEY.SPACE:
            if (gameStatus == 'G') {
                while(validMove(mainBlock, main_matrix, 0, 1)){
                    globalAddScore += 20*currentLevel
                };
                nextStep()
                time=0
            }
            break
            
    }
    drawBlock(mainBlock, main_ctx)
}

function validate(block, matrix) {
    let isVaild = true
    block.shape.some((row, dy) => {
        row.some((value, dx) => {
            if (value > 0) {
                if (block.x+dx < 0 ||  block.y+dy < 0 || block.x+dx >= COL_MAIN || block.y+dy >= ROW_MAIN
                    || matrix[block.y+dy][block.x+dx] > 0) {
                    isVaild = false
                    return true
                } 
            }
        })
        if (!isVaild) {
            return true
        }
    })
    return isVaild
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function validMove(block, matrix, x, y) {
    const cloneBlock = clone(block)
    move(cloneBlock, x, y)
    if (validate(cloneBlock, matrix)) {
        move(block, x, y)
        return true
    } else {
        return false
    }
}

function validRotate(block, matrix) {
    const cloneBlock = clone(block)
    rotate(cloneBlock)
    if (validate(cloneBlock, matrix)){
        rotate(block)
        return true
    } else{
        return false
    }
}

function setNextBlock() {
    mainBlock = sideBlock?sideBlock:createNextBlock()
    mainBlock.y=0
    mainBlock.x=3
    sideBlock = createNextBlock()
    sideBlock.y = (sideBlock.shape[1][0]==7)?0:1
    sideBlock.x = (sideBlock.shape[0][0]==1)?1:0
}

function initRemoveLine() {
    fillLines = []
    timeForRemovingLines = 0
    time = 0
}

function nextStep() {
    stack(mainBlock, main_matrix)
    fillLines = checkFillLine(main_matrix)

    if (fillLines.length==0) {
        addScore(globalAddScore)
        globalAddScore=0
        main_matrix[0].some((value, x) => {
            if (value > 0) {
                gameStatus = 'Q'
                return true
            }
        })
        const cloneSideBlock = clone(sideBlock)
        cloneSideBlock.y = 0
        cloneSideBlock.x = 3
        if (validate(cloneSideBlock, main_matrix)) {
            setNextBlock()
        } else {
            gameStatus = 'Q'
        }
    }
}

function addScore(score) {
    totalScore += score
    socreEle.textContent = totalScore
    if (score > 0) {
        addScoreEle.textContent = '+' + score
    }
    if (addScoreId) {
        clearTimeout(addScoreId)
    }
    addScoreId = setTimeout(() => {
        addScoreEle.textContent = ""
    }, 1000)
}

function addLines(lines) {
    remaningLine += lines
    lineEle.textContent = remaningLine
    if (lines > 0) {
        removeLineEle.textContent = '+' + lines
    }
    if (removeLineId) {
        clearTimeout(removeLineEle)
    }
    removeLineId = setTimeout(() => {
        removeLineEle.textContent = ""
    }, 1000)
}

function addLevel(level) {
    currentLevel += level
    levelEle.textContent = currentLevel
    if (level > 0) {
        levelUpEle.textContent = '레벨 업'
    }
    if(levelId) {
        clearTimeout(levelId)
    }
    levelId = setTimeout(() => {
        levelUpEle.textContent = ""
    }, 2000)
}