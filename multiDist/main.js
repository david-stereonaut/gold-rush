const socket = io()
const board = new GoldRush()
const renderer = new Renderer()

let playerNum
socket.emit('join')
socket.on('join', function (num) {
    if (!playerNum) {
        playerNum = num
        if (num == 2) {
            renderer.renderWaiting()
        }
    }
    if (num > 2) {
        window.location.href = "/twoplayer"
    }
})
socket.on('start', function (data) {
    board.setData(data)
    renderer.renderBoard(board.matrix)
})

socket.on('move', function (data) {
    board.setData(data)
    renderer.renderBoard(board.matrix)
    if (board.win != 0) {
        renderer.renderWin(board.win)
        board.resetBoard()
    }
})

$('#board').on('click', '#start', function () {
    let rows = $('#rows').val()
    let columns = $('#columns').val()
    board.matrix = board.generateBoard(rows, columns)
    socket.emit('start', board)
    renderer.renderBoard(board.matrix)
})

$('#board').on('click', '#new-game', function () {
    if (playerNum == 2) {
        return renderer.renderWaiting()
    }
    board.resetBoard()
    renderer.renderNewGame()
})

const directions = {
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right'
}


$(document).on('keydown', function (e) {
    if (directions[e.code]) {
        board.movePlayer(playerNum, directions[e.code])
        socket.emit('move', board)
        renderer.renderBoard(board.matrix)
        if (board.win != 0) {
            renderer.renderWin(board.win)
        }
    }
})
