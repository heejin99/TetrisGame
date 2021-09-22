const BLOCK_SET = [
    [
        [1,1],
        [1,1]
    ],
    [
        [0,2,0],
        [2,2,2],
        [0,0,0]
    ],
    [
        [0,3,3],
        [3,3,0],
        [0,0,0]
    ],
    [
        [4,4,0],
        [0,4,4],
        [0,0,0]
    ],
    [
        [5,0,0],
        [5,5,5],
        [0,0,0]
    ],
    [
        [0,0,6],
        [6,6,6],
        [0,0,0]
    ],
    [
        [0,0,0,0],
        [7,7,7,7],
        [0,0,0,0],
        [0,0,0,0]
    ]
]

function randomNextBlock() {
    return BLOCK_SET[getRandomIndex(BLOCK_SET.length)]
}

function createNextBlock() {
    return {
        x: 0,
        y: 0,
        shape: randomNextBlock()
    }
}

function drawBlock(block, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    block.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value > 0) {
                ctx.fillStyle = 'white'
                ctx.fillRect(x + block.x, y +block.y, 1, 1)
            }
        });
    });
}

function move(block, x, y) {
    block.x += x
    block.y += y
}

function rotate(block) {
    block.shape.forEach((row, y) => {
        for (let x= 0; x< y; x++) {
            const target = block.shape[x][y]
            block.shape[x][y] = block.shape[y][x]
            block.shape[y][x] = target
        }
    })
    block.shape.forEach((row) => {
        row.reverse()
    })
}


function checkFillLine(matrix) {
    let result = []
    for(let y=0; y < matrix.length; y++) {
        if (matrix[y].every(value => value > 0)) {
            result.push(y)
        }
    }
    return result
}

function removeLine(matrix, index) {
    index.forEach((y, i) => {
        matrix.splice(y, 1)
        matrix.unshift(new Array(matrix[0].length).fill(0))
    })
}

function drawRemoveLines(ctx, col, index) {
    index.forEach((y, i) => {
        for(let x = 0; x < col; x++) {
            ctx.fillStyle = 'red'
            ctx.fillRect(x,y ,1, 1)
        }
    })
}