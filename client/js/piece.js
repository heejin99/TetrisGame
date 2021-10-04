
function randomPiece(len) {
    return Math.floor(Math.random() * len)
}

function randomNextShape() {
    return SHAPES[randomPiece(SHAPES.length)]
}

function randomNextColor() {
    return COLORS[randomPiece(COLORS.length)]
}

function createBlock() {
    return {
        x: 0,
        y: 0,
        shape: randomNextShape()
    }
}

function draw(block, ctx) {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // ctx.fillStyle = randomNextColor()
    block.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                ctx.fillStyle = COLORS[value-1]
                ctx.fillRect(block.x + x, block.y + y, 1, 1)
            }
        })
    })
}

function move(block, x, y) {
    block.x += x
    block.y += y
}

// 시계 방향 회전 효과
function rotate(block) {
    block.shape.forEach((row, y) => {
        for(let x=0; x< y; x++) {
            const temp = block.shape[x][y]
            block.shape[x][y] = block.shape[y][x]
            block.shape[y][x] = temp
        }
    })
    block.shape.forEach((row) => {
        row.reverse()
    })
}

// some => return true 일때 빠져나옴
function valid(block, matrix) {
    let isValid = true
    block.shape.some((row, dy) => {
        row.some((value, dx) => {
            let x = block.x+dx
            let y = block.y+dy
            if (value > 0) {
                if (x < 0 || y < 0 || x >= MAIN_COLS|| y >= MAIN_ROWS
                    || matrix[y][x] > 0) { // 
                    isValid = false
                    return true
                }
            }
        })
        if(!isValid) {
            return true
        }
    })
    return isValid
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
function validMove(block, matrix, x, y) {
    const cloneBlock = clone(block)
    move(cloneBlock, x,y)
    if(valid(cloneBlock, matrix)) {
        move(block, x, y)
        return true
    } else {
        return false
    }
}
function validRotate(block, matrix) {
    const cloneBlock = clone(block)
    rotate(cloneBlock)
    if(valid(cloneBlock, matrix)) {
        rotate(block)
        return true
    } else {
        return false
    }
}