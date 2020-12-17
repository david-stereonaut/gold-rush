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
    }

    generateBoard(numRows, numColumns) {
        this.coins = 0
        let matrix = []
        this.player2.position = [numRows - 1, numColumns - 1]
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                if(r === 0 && c === 0) { matrix[r].push(1) }
                else if (r === numRows - 1 && c === numColumns - 1) { matrix[r].push(2) }
                else {
                    let chance = Math.floor(Math.random() * 10)
                    if (chance < 6){
                        matrix[r].push('e')
                    } else if (chance < 8) {
                        matrix[r].push('c')
                        this.coins += 1
                    } else {
                        if (r > 0 && (matrix[r - 1][c - 1] === 'w' || matrix[r - 1][c + 1] === 'w')) {
                            matrix[r].push('e')
                        } else {
                            matrix[r].push('w')
                        }
                    }
                }
            }
        }
        return matrix
    }

    setData(data) {
        this.matrix = data.matrix
        this.coins = data.coins
        this.player1 = data.player1
        this.player2 = data.player2
        this.win = data.win
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
        if (this.matrix[newPosition[0]][newPosition[1]] === 'w' || this.matrix[newPosition[0]][newPosition[1]] === 2) { return }
        if(this.matrix[newPosition[0]][newPosition[1]]){
            if(this.matrix[newPosition[0]][newPosition[1]] === 'c') { 
                this['player'+player].score += 10
                this.coins--
            }
            this.matrix[playerPosition[0]][playerPosition[1]] = 'e'
            this.matrix[newPosition[0]][newPosition[1]] = player
            this['player'+player].position = newPosition
            if(this.coins === 0) {
                this.win = this.player1.score > this.player2.score ? 1 : 2
            }
        }
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