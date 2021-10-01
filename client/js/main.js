let mainBl = null
let subBl = null

const mainMatrx = getEmptyBoard(MAIN_ROWS, MAIN_COLS)
let time = 0
let reqId = null

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
            break
    }

    draw(mainBl, mainCtx)
}

function start() {
    window.addEventListener('keydown', keyHandler)
    drawBoard(mainMatrx, mainCtx)
    mainBl = createBlock()
    subBl = createBlock()
    // rebuild()
    repeatMotion(0)
}

function repeatMotion(timeStamp) {
    if (timeStamp - time > 1000) {
        if(!validMove(mainBl, mainMatrx ,0, 1)) {
            mainBl = subBl
            subBl = createBlock()
        }
        time = timeStamp
    }
    rebuild()
    reqId = window.requestAnimationFrame(repeatMotion)
}
function rebuild() {
    draw(mainBl, mainCtx)
    draw(subBl, subCtx)
}
