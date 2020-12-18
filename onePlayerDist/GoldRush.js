class GoldRush extends Matrix {
    constructor() {
        super()
        this.coins = 0
        this.matrix = []
        this.player1 = {
            position: [0, 0],
            score: 0
        }
        this.player2 = {
            position: [],
            score: 0
        }
        this.win = 0
        this.aiMoveTrack = []
    }

    generateBoard(numRows, numColumns) {
        this.coins = 0
        let matrix = []
        let aiMatrix = []
        this.player2.position = [numRows - 1, numColumns - 1]
        for (let r = 0; r < numRows; r++) {
            aiMatrix.push([])
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                if(r === 0 && c === 0) { 
                    matrix[r].push(1)
                    aiMatrix[r].push(0)
                }
                else if (r === numRows - 1 && c === numColumns - 1) {
                    matrix[r].push(2)
                    aiMatrix[r].push(0)
                }
                else {
                    let chance = Math.floor(Math.random() * 10)
                    if (chance < 6){
                        matrix[r].push('e')
                        aiMatrix[r].push(0)
                    } else if (chance < 8) {
                        matrix[r].push('c')
                        aiMatrix[r].push(0)
                        this.coins += 1
                    } else {
                        if (r > 0 && (matrix[r - 1][c - 1] === 'w' || matrix[r - 1][c + 1] === 'w')) {
                            matrix[r].push('e')
                            aiMatrix[r].push(0)
                        } else {
                            matrix[r].push('w')
                            aiMatrix[r].push(0)
                        }
                    }
                }
            }
        }
        this.aiMoveTrack = aiMatrix
        this.matrix = matrix
        return matrix
    }

    movePlayer(player, direction) {
        let playerPosition = this['player'+player].position
        let newPosition
        if (direction === 'up'){
            newPosition = [(playerPosition[0]) - 1, playerPosition[1]]
        }
        if (direction === 'down'){
            newPosition = [(playerPosition[0]) + 1, playerPosition[1]]
        }
        if (direction === 'left'){
            newPosition = [(playerPosition[0]), playerPosition[1] - 1]
        }
        if (direction === 'right'){
            newPosition = [(playerPosition[0]), playerPosition[1] + 1]
        }
        if (newPosition[0] < 0 || newPosition[0] > this.matrix[0].length - 1 ) { return }
        if (this.matrix[newPosition[0]][newPosition[1]] === 'w' ||
            this.matrix[newPosition[0]][newPosition[1]] === 2 ||
            this.matrix[newPosition[0]][newPosition[1]] === 1) { return }
        if(this.matrix[newPosition[0]][newPosition[1]]){
            if(this.matrix[newPosition[0]][newPosition[1]] === 'c') { 
                this['player'+player].score += 10
                this.coins--
            }
            this.matrix[playerPosition[0]][playerPosition[1]] = 'e'
            this.matrix[newPosition[0]][newPosition[1]] = player
            if(player === 2) {
                this.aiMoveTrack[playerPosition[0]][playerPosition[1]]++
            }
            this['player'+player].position = newPosition
            if(this.coins === 0) {
                if (this.player1.score === this.player2.score) {
                    this.win = 'tie'
                } else {
                    this.win = this.player1.score > this.player2.score ? 1 : 2
                }
            }
        }
    }

    moveAI() {
        let moves = {
            up: {
                position: [this.player2.position[0] - 1, this.player2.position[1]],
                coefficient: 0
            },
            down: {
                position: [this.player2.position[0] + 1, this.player2.position[1]],
                coefficient: 0
            },
            left: {
                position: [this.player2.position[0], this.player2.position[1] - 1],
                coefficient: 0
            },
            right: {
                position: [this.player2.position[0], this.player2.position[1] + 1],
                coefficient: 0
            }
        }
        Object.keys(moves).forEach(m => {
            if (this.matrix[moves[m].position[0]]){
                if ((this.matrix[moves[m].position[0]][moves[m].position[1]] === 'c' || null)) {
                    moves[m].coefficient = 1000
                }
                if (this.matrix[moves[m].position[0]][moves[m].position[1]] === 'w' || this.matrix[moves[m].position[0]][moves[m].position[1]] === undefined) {
                    moves[m].coefficient = -99
                }
                if (this.aiMoveTrack[moves[m].position[0]][moves[m].position[1]] > 0 || null) {
                    moves[m].coefficient = -10 * this.aiMoveTrack[moves[m].position[0]][moves[m].position[1]]
                }
            } else {
                if (moves[m].position[0] > Array.length - 1) {
                    moves.down.coefficient = -99
                } else {
                    moves.up.coefficient = -99
                }
            }
        })

        let moveChances = {
            up: (Math.floor(Math.random() * 99) + moves.up.coefficient),
            down: (Math.floor(Math.random() * 99) + moves.down.coefficient),
            left: (Math.floor(Math.random() * 99) + moves.left.coefficient),
            right: (Math.floor(Math.random() * 99) + moves.right.coefficient)
        }
        let move = Object.keys(moveChances).reduce((a, b) => moveChances[a] > moveChances[b] ? a : b)

        this.movePlayer(2, move)
    }

    resetBoard(){
        this.coins = 0
        this.matrix = []
        this.player1 = {
            position: [0, 0],
            score: 0
        }
        this.player2 = {
            position: [],
            score: 0
        }
        this.win = 0
    }
}
