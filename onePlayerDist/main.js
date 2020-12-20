const board = new GoldRush()
const renderer = new Renderer()
let ai

$('#setup').on('click', '#start', function () {
    let rows = $('#rows').val()
    let columns = $('#columns').val()
    board.generateBoard(rows, columns)
    renderer.renderBoard(board.matrix)
    renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
    ai = setInterval(function() {
        board.moveAI()
        renderer.renderBoard(board.matrix)
        renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
        if (board.win != 0) {
            clearInterval(ai)
            renderer.renderWin(board.win)
        }
    }, 100);
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
    if (board.win === 0) {
        if (directions[e.code]) {
            board.movePlayer(1, directions[e.code])
            renderer.renderBoard(board.matrix)
            renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
            if (board.win != 0) {
                clearInterval(ai)
                renderer.renderWin(board.win)
            }
        }
    }
})
