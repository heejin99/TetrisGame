
function resize() { 
    const WINDOW_INNERWIDTH = (window.innerWidth > 660)?660:window.innerWidth;
    const MAIN_CONTENTS_WIDTH = Math.floor(WINDOW_INNERWIDTH*0.6); 
    const BLOCK_SIZE = Math.floor(MAIN_CONTENTS_WIDTH/COL_MAIN); 
    main_ctx.canvas.width = BLOCK_SIZE*COL_MAIN; 
    main_ctx.canvas.height = BLOCK_SIZE*ROW_MAIN; 
    main_ctx.scale(BLOCK_SIZE, BLOCK_SIZE); 
    side_ctx.canvas.width = BLOCK_SIZE*COL_SIDE; 
    side_ctx.canvas.height = BLOCK_SIZE*ROW_SIDE; 
    side_ctx.scale(BLOCK_SIZE, BLOCK_SIZE); 
    const Jua = WINDOW_INNERWIDTH/350; 
    document.querySelector('#side-cnt').style.fontSize = Jua+'rem'; 
    setButtonStyle(startB, WINDOW_INNERWIDTH)
    setButtonStyle(pauseB, WINDOW_INNERWIDTH)
    setButtonStyle(quitB, WINDOW_INNERWIDTH)

}

function setButtonStyle(ele, wid) {
    ele.style.fontSize = wid/350+'rem'
    ele.style.paddingTop = wid/1400+'rem'
    ele.style.paddingBottom = wid/1400+'rem'
    ele.style.paddingLeft = wid/350+'rem'
    ele.style.paddingRight = wid/350+'rem'
}

function initMatrix(row, col) {
    let matrix = []
    for (let y = 0; y < row; y++) {
        matrix.push(new Array(col).fill(0))
    }
    return matrix
}
function stack(block, matrix) {
    block.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                matrix[y+block.y][x+block.x] = block.shape[y][x]
            }
        })
    })
}

function drawBoard(matrix, ctx) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                ctx.fillStyle='white'
                ctx.fillRect(x,y,1,1)
            }
        })
    })
}