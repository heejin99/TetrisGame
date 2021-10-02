
function getEmptyBoard(rows, cols) {
    let matrix = []
    for (let y=0; y < rows; y++) {
        matrix.push(new Array(cols).fill(0))
    }
    return matrix
    // return Array.from(
    //     {length: MAIN_ROWS}, () => Array(MAIN_COLS).fill(0)
    // )
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

function checkFilledLines(matrix) {
    let result =  []
    for (let y = 0; y < matrix.length; y++) {
        if (matrix[y].every(value => value > 0)) {
            result.push(y)
        }
    }
    return result
}

function removeLines(matrix, index) {
    index.forEach((y, i) => {
        matrix.splice(y, 1) // 라인 한 줄 제거
        matrix.unshift(new Array(matrix[0].length).fill(0))
    })
}

function drawRemoveLine(ctx, cols, index) {
    index.forEach((y, i) => {
        for(let x = 0; x < cols; x++) {
            ctx.fillStyle = 'red'
            ctx.fillRect(x,y,1,1)
        }
    })
}