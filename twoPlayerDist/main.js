const board = new GoldRush()
const renderer = new Renderer()

$('#setup').on('click', '#start', function () {
    let rows = $('#rows').val()
    let columns = $('#columns').val()
    board.matrix = board.generateBoard(rows, columns)
    renderer.renderBoard(board.matrix)
    renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
})

$('#board').on('click', '#new-game', function () {
    board.resetBoard()
    renderer.renderNewGame()
})

const directionsPlayer1 = {
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right',
}

const directionsPlayer2 = {
    KeyI: 'up',
    KeyK: 'down',
    KeyJ: 'left',
    KeyL: 'right',
}

$(document).on('keydown', function (e) {
    if (board.win === 0) {
        if (directionsPlayer1[e.code] || directionsPlayer2[e.code]) {
            const playerToMove = directionsPlayer1[e.code] ? 1 : 2
            const dir = directionsPlayer1[e.code] || directionsPlayer2[e.code]
            board.movePlayer(playerToMove, dir)
            renderer.renderBoard(board.matrix)
            renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
            if (board.win != 0) {
                renderer.renderWin(board.win)
            }
        }
    }
})
