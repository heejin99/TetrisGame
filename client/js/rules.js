const MAIN_COLS = 10 // 10 개의 열
const MAIN_ROWS = 20 // 20 개의 행

const SUB_COLS = 4
const SUB_ROWS = 4
const BLOCK_SIZE = 30

const mainCanvas = document.querySelector('#main-board')
const mainCtx = mainCanvas.getContext('2d')

const subCanvas = document.querySelector('#sub-board')
const subCtx = subCanvas.getContext('2d')
// 캔버스 크기 계산
mainCtx.canvas.width = MAIN_COLS*BLOCK_SIZE
mainCtx.canvas.height = MAIN_ROWS*BLOCK_SIZE

subCtx.canvas.width = SUB_COLS*BLOCK_SIZE
subCtx.canvas.height = SUB_ROWS*BLOCK_SIZE
// 블록의 크기를 1로 취급해 크기 변경
mainCtx.scale(BLOCK_SIZE, BLOCK_SIZE)
subCtx.scale(BLOCK_SIZE, BLOCK_SIZE)


const COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'cyan'
]

const SHAPES = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 2],
        [2, 2, 2],
        [0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [3, 3, 3, 3],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [4, 4],
        [4, 4]
    ],
    [
        [0, 5, 0],
        [5, 5, 5],
        [0, 0, 0]
    ],
    [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
    ],
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
]

const KEY = {
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}
Object.freeze(KEY)