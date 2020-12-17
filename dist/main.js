const board = new GoldRush()
const renderer = new Renderer()

$('#board').on('click', '#start', function() {
    let rows = $('#rows').val()
    let columns = $('#columns').val()
    board.matrix = board.generateBoard(rows, columns)
    renderer.renderBoard(board.matrix)
})

$('#board').on('click', '#new-game', function() {
    renderer.renderNewGame()
})

$(document).on('keydown', function (e) {
    if (e.code == 'KeyW') {
        board.movePlayer(1, "up")
        renderer.renderBoard(board.matrix)
        if (board.win != 0){
            renderer.renderWin(board.win)
            board.resetBoard()
        }
    }
})
$(document).on('keydown', function (e) {
    if (e.code == 'KeyS') {
        board.movePlayer(1, "down")
        renderer.renderBoard(board.matrix)
        if (board.win != 0){
            renderer.renderWin(board.win)
            board.resetBoard()
        }
    }
})
$(document).on('keydown', function (e) {
    if (e.code == 'KeyA') {
        board.movePlayer(1, "left")
        renderer.renderBoard(board.matrix)
        if (board.win != 0){
            renderer.renderWin(board.win)
            board.resetBoard()
        }
    }
})
$(document).on('keydown', function (e) {
    if (e.code == 'KeyD') {
        board.movePlayer(1, "right")
        renderer.renderBoard(board.matrix)
        if (board.win != 0){
            renderer.renderWin(board.win)
            board.resetBoard()
        }
    }
})