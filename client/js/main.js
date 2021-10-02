let mainBl = null
let subBl = null

const mainMatrx = getEmptyBoard(MAIN_ROWS, MAIN_COLS)
let time = 0
let reqId = null

let timeRemove = 0
let fillLines = []

let playing = false

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
            while(validMove(mainBl, mainMatrx, 0, 1));
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
    playing = true
    window.addEventListener('keydown', keyHandler)
    // mainBl = createBlock()
    // subBl = createBlock()   
    setBlock()
    // rebuild()
    repeatMotion(0)
}

function initRemoveLines() {
    fillLines = []
    timeRemove = 0
    time = 0 
}
function repeatMotion(timeStamp) {
    if (time == 0) {
        time = timeStamp
    }
    if (timeStamp - time > 1000) {
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
    if (fillLines.length > 0) {
        if (timeRemove == 0) {
            timeRemove = timeStamp
        }
        if (timeStamp - timeRemove > 300) {
            removeLines(mainMatrx, fillLines)
            initRemoveLines()
            setBlock()
        }
    }
    rebuild()
    reqId = window.requestAnimationFrame(repeatMotion)
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
        mainMatrx[0].some((value, x) => {
            if (value > 0) {
                playing = false
                return true
            }
        })
        const cloneBl = clone(subBl)
        cloneBl.y = 0
        cloneBl.x = 3
        if (valid(cloneBl, mainMatrx)) {
            setBlock()
        } else {
            playing = false
        }
    }
    rebuild()
    if(playing) {
        reqId = window.requestAnimationFrame(repeatMotion)
    }
}