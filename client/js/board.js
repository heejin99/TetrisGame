
const mainCanvas = document.getElementById('main-canvas')
const mainCtx = document.getElementById('2d')

const subCanvas = document.getElementById('sub-canvas')
const subCtx = document.getElementById('2d')

mainCtx.fillStyle = "gray"

const borderWidth = 5
const blockSize = 30

function createBorder() {
    for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 24; y++) {
            mainCtx.fillRect(
                borderWidth * x + blockSize * x,
                borderWidth * y + blockSize * y,
                blockSize, blockSize
            )
        }
    }

}