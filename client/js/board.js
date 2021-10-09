
function getEmptyBoard(rows, cols) {
    let matrix = []
    for (let y=0; y < rows; y++) {
        matrix.push(new Array(cols).fill(0))
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
                ctx.fillStyle = COLORS[matrix[y][x]-1]
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
            ctx.fillStyle = '#f1faee'
            ctx.fillRect(x,y,1,1)
        }
    })
}

function drawLatt(board, ctx) {
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if ((x%2==0 && y%2==0) || (x%2==1 && y%2==1)) {
                ctx.fillStyle = '#f8f9fa'
            } else {
                ctx.fillStyle = '#e9ecef'
            }
            ctx.fillRect(x,y,1,1)
        })
    })
}

function drawcombo(ctx, comboCnt, colors) {
    if (comboCnt > 1) {
        let textPosition = 0
        if (String(comboCnt-1).length >= 2) {
            textPosition = -0.2
        }
        ctx.globalAlpha = 0.5
        ctx.fillStyle = colors[comboCnt%7]
        ctx.fillRect(5, 0.2,4.8, 1.6)
        ctx.globalAlpha = 1.0
        ctx.font = '1px NeoDungGeunMo'
        ctx.fillStyle = '#ffffff'
        ctx.fillText('Combo '+(comboCnt-1), 5.2+textPosition, 1.3)
        // ctx.fillRect()
    }
    ctx.globalAlpha = 1.0
}
