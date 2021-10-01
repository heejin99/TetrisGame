
function getEmptyBoard() {
    return Array.from(
        {length: MAIN_ROWS}, () => Array(MAIN_COLS).fill(0)
    )
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
                ctx.fillStyle = 'white'
                ctx.fillRect(x,y,1,1)
            }
        })
    })
}