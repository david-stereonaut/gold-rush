class Renderer {
    constructor() {
    }

    renderBoard(matrix) {
        $("#board").empty()
        const boardTemplate = Handlebars.compile($("#board-template").html())
        const boardHTML = boardTemplate(matrix)
        $("#board").append(boardHTML)
    }

    renderWin(win) {
        if (win === 'tie') {
            const tieTemplate = Handlebars.compile($("#tie-template").html())
            const tieHTML = tieTemplate(win)
            $("#board").append(tieHTML)
        } else {
            const winTemplate = Handlebars.compile($("#win-template").html())
            const winHTML = winTemplate(win)
            $("#board").append(winHTML)
        }
    }

    renderNewGame() {
        $("#board").empty()
        const newGameTemplate = Handlebars.compile($("#new-game-template").html())
        const newGameHTML = newGameTemplate()
        $("#board").append(newGameHTML)
    }

    renderWaiting() {
        $("#board").empty()
        $("#board").append('<div id="waiting">Waiting for player 1 to set the board</div>')
    }
}