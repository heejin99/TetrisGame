
const main_matrix = initMatrix(ROW_MAIN, COL_MAIN)


function rebuild() {
    resize()
    drawBlock(mainBlock, main_ctx)
    drawBlock(sideBlock, side_ctx)
    drawBoard(main_matrix, main_ctx)
    drawRemoveLines(main_ctx, COL_MAIN, fillLines)
}

function start() {
    reset()
    gameStatus = 'G'
    window.addEventListener('keydown', keyHandler)
    setNextBlock()
    repeatMotion(0)
    addLines(3)
}

function resetScoreBoard() {
    totalScore  = 0
    socreEle.textContent = "0"
    addScoreEle.textContent = ""

    currentLevel = 1
    levelEle.textContent = "1"
    levelUpEle.textContent = ""

    remaningLine = 0
    lineEle.textContent = "0"
    removeLineEle.textContent = ""
}

function reset() {
    time = 0
    timeForRemovingLines = 0
    mainBlock = null
    nextBlock = null
    resetScoreBoard()
}

function main() {
    rebuild()
    window.addEventListener('resize', rebuild)
    // start()
}

function repeatMotion(timeStamp) { 
    if (time == 0) {
        time = timeStamp
    }
    if(timeStamp - time > 500) { 
        if(!validMove(mainBlock, main_matrix, 0,1)) { 
            nextStep()
        } 
        time = timeStamp; 
    }
    if (fillLines.length > 0) {
        if (timeForRemovingLines == 0) {
            timeForRemovingLines = timeStamp
        }
        if(timeStamp - timeForRemovingLines > 100) {
            removeLine(main_matrix, fillLines)
            globalAddScore += 100*fillLines
            addScore(globalAddScore)
            addLines(fillLines.length*-1)
            // 

            while(remaningLine <= 0 || globalAddScore > 10000) {
                addLevel(1)
                addLines(3*currentLevel)
                globalAddScore = 0
            }
            
            initRemoveLine()
            setNextBlock()
        }
    }
    rebuild(); 
    if (gameStatus == 'G') {
        reqAniId = window.requestAnimationFrame(repeatMotion); 
    } else {
        quit()
    }
    
}

function pause() {
    if (reqAniId) {
        window.cancelAnimationFrame(reqAniId)
        reqAniId = null
        gameStatus = 'P'

        
        main_ctx.fillStyle = '#f0671b'
        main_ctx.fillRect(1, 3, 8, 1.8)
        main_ctx.font = '1px NeoDungGeunMo'
        main_ctx.fillStyle = '#ffffff'
        main_ctx.fillText('일시정지', 2.8, 4.2)
    } else {
        gameStatus = 'G'
        repeatMotion(0)
    }
}
function quit() {
    main_ctx.fillStyle = '#f0671b'
    main_ctx.fillRect(1, 3, 8, 1.8)
    main_ctx.font = '1px NeoDungGeunMo'
    main_ctx.fillStyle = '#ffffff'
    main_ctx.fillText('게임 오버', 2.8, 4.2)

    gameStatus = 'Q'
    // reset()
}

(function (){
    main();
})();
