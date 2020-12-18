const board = new GoldRush()
const renderer = new Renderer()
let ai

$('#board').on('click', '#start', function () {
    let rows = $('#rows').val()
    let columns = $('#columns').val()
    board.generateBoard(rows, columns)
    renderer.renderBoard(board.matrix)
    ai = setInterval(function() {
        board.moveAI()
        renderer.renderBoard(board.matrix)
        if (board.win != 0) {
            clearInterval(ai)
            renderer.renderWin(board.win)
        }
    }, 150);
})

$('#board').on('click', '#new-game', function () {
    board.resetBoard()
    renderer.renderNewGame()
})

const directions = {
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right',
}

$(document).on('keydown', function (e) {
    if (directions[e.code]) {
        board.movePlayer(1, directions[e.code])
        renderer.renderBoard(board.matrix)
        if (board.win != 0) {
            clearInterval(ai)
            renderer.renderWin(board.win)
        }
    }
})
