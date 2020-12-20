const socket = io()
const board = new GoldRush()
const renderer = new Renderer()

let playerNum
socket.emit('join multi')
socket.on('join multi', function (num) {
    if (!playerNum) {
        playerNum = num
        if (num == 2) {
            renderer.renderWaiting()
        }
    }
    if (playerNum === 3) {
        window.location.href = "/oneplayer"
    }
})
socket.on('start', function (data) {
    board.setData(data)
    renderer.renderBoard(board.matrix)
    renderer.renderScores({player1: 0, player2: 0})
})

socket.on('move', function (data) {
    if (board.win === 0) {
        board.setData(data)
        renderer.renderBoard(board.matrix)
        renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
        if (board.win != 0) {
            renderer.renderWin(board.win)
            board.resetBoard()
        }
    }
})

$('#setup').on('click', '#start', function () {
    let rows = $('#rows').val()
    let columns = $('#columns').val()
    board.matrix = board.generateBoard(rows, columns)
    socket.emit('start', board)
    renderer.renderBoard(board.matrix)
    renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
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
    if (board.win === 0){
        if (directions[e.code]) {
            board.movePlayer(playerNum, directions[e.code])
            socket.emit('move', board)
            renderer.renderBoard(board.matrix)
            renderer.renderScores({player1: board.player1.score, player2: board.player2.score})
            if (board.win != 0) {
                renderer.renderWin(board.win)
            }
        }
    }
})

$(window).on('beforeunload', function(){
    socket.emit('bye')
  });