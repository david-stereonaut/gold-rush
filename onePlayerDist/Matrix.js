class Matrix {
    constructor(numRows, numColumns){
        this.matrix = this.generateMatrix(numRows, numColumns)
    }

    generateMatrix(numRows, numColumns) {
        let matrix = []
        let num = 1
        
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push(num++)
            }
        }
        return matrix
    }

    get(rowNum, colNum) {
        return this.matrix[rowNum][colNum]
    }

    print() {
        for (let row = 0; row < this.matrix.length; row++){
            let thisRow = ''
            for (let column = 0; column < this.matrix[0].length; column++){
                thisRow += `${this.matrix[row][column]}\t`
            }
            console.log(thisRow)
        }
    }

    printColumn(colNum) {
        let toPrint = ''
        for (let i = 0; i < this.matrix.length; i++) {
            toPrint += `${this.matrix[i][colNum]}, `
        }
        console.log(toPrint.slice(0, -2))
    }

    printRow(rowNum) {
        let toPrint = ''
        for (let column = 0; column < this.matrix[0].length; column++){
            toPrint += `${this.matrix[rowNum][column]}, `
        }
        console.log(toPrint.slice(0, -2))
    }

    alter(rowNum, colNum, num) {
        this.matrix[rowNum][colNum] = num
    }

    findCoordinate(value) {
        for(let row = 0; row < this.matrix.length; row++){
            for (let column = 0; column < this.matrix[0].length; column++){
                if (this.matrix[row][column] == value) { return { x: column, y: row } }
            }
        }
        return "couldn't find value in this matrix"
    }
}