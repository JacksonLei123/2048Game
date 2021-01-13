/*
Add your code for Game here
 */
export default class Game {

    constructor(size) {
        let board =[];
        let values = [];
        // generate random square
        let number = Math.random();
            if (number <= 0.9) {
                values.push(2);
            } else {
                values.push(4);
            }
        let number2 = Math.random();
            if (number2 <= 0.9) {
                values.push(2);
            } else {
                values.push(4);
            }
        for (let i = 2; i < size * size; i++) {
            values.push(0);
        }
        // put 0's and squares into an array and shuffle that array and put it into a 2d array
        values = shuffle(values);
        this.state = {
            board: [...values],
            score: 0,
            won: false,
            over: false
          }
        let val = 0;
        for (let row = 0; row < size; row++) {
            let cellrow = [];
            for (let col = 0; col < size; col++) {
                cellrow.push(values[val]);
                val++
            }
            board.push(cellrow);
        }
        this.size = size;
        this.board = board;
        this.movelisteners = [];
        this.winlisteners = [];
        this.loselisteners = [];
    }

    setupNewGame() {
        let board =[];
        let values = [];
        let number = Math.random();
            if (number <= 0.9) {
                values.push(2);
            } else {
                values.push(4);
            }
        let number2 = Math.random();
            if (number2 <= 0.9) {
                values.push(2);
            } else {
                values.push(4);
            }
        for (let i = 2; i < this.size * this.size; i++) {
            values.push(0);
        }

        values = shuffle(values);
        this.state = {
            board: [...values],
            score: 0,
            won: false,
            over: false
          }
        let val = 0;
        for (let row = 0; row < this.size; row++) {
            let cellrow = [];
            for (let col = 0; col < this.size; col++) {
                cellrow.push(values[val]);
                val++
            }
            board.push(cellrow);
        }
        this.board = board;
        this.movelisteners = [];
        this.winlisteners = [];
        this.loselisteners = [];
    }

    loadGame(gameState) {
        let board = [];
        this.state = gameState;
        let val = 0;
        for (let i = 0; i < this.size; i++) {
            let cellrow = [];
            for (let j = 0; j < this.size; j++) {
                cellrow.push(this.state.board[val]);
                val++
            }
            board.push(cellrow);
        }
        this.board = board;
    }

    move(direction) {
        if (direction == "up") {
            // moving up so i want to push every COLUMN into new arrays and merge those arrays using a combine function
            for (let i = 0; i < this.size; i++) {
                let array = [];
                for (let j = 0; j < this.size; j++) {
                    if (this.board[j][i] != 0) {
                        array.push(this.board[j][i]);
                    }
                }
                // combine array merges the similar values together
                let result = combine(array);
                array = result.arr;
                this.state.score = this.state.score + result.score;
                // put merged array in topmost part of the board since I went up
                for (let k = 0; k < this.size; k++) {
                    if (k < array.length) {
                        this.board[k][i] = array[k];
                    } else {
                        this.board[k][i] = 0;
                    }
                }
            }


        } else if (direction == "down") {
            for (let i = 0; i < this.size; i++) {
                let array = []
                for (let j = 0; j < this.size; j++) {
                    if (this.board[j][i] != 0) {
                        array.push(this.board[j][i]);
                    }
                }
    
                let result = combine2(array);
                array = result.arr;
                this.state.score = this.state.score + result.score;

                let z = 0;
                for (let k = this.size - 1; k >= 0; k--) {
                    if (z < array.length) {
                        this.board[k][i] = array[z];
                    } else {
                        this.board[k][i] = 0;
                    }
                    z++;
                }
            }  
        } else if (direction == "left") {
            for (let i = 0; i < this.size; i++) {
                let array = [];
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] != 0) {
                        array.push(this.board[i][j]);
                    }
                }
                let result = combine(array);
                array = result.arr;
                this.state.score = this.state.score + result.score;
                
                for (let k = 0; k < this.size; k++) {
                    if (k < array.length) {
                        this.board[i][k] = array[k];
                    } else {
                        this.board[i][k] = 0;
                    }
                }
            }
        } else if (direction == "right") {
            for (let i = 0; i < this.size; i++) {
                let array = [];
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] != 0) {
                        array.push(this.board[i][j]);
                    }
                }
                let result = combine2(array);
                array = result.arr;
                this.state.score = this.state.score + result.score;

                let z = 0;
                for (let k = this.size - 1; k >= 0; k--) {
                    if (z < array.length) {
                        this.board[i][k] = array[z];
                    } else {
                        this.board[i][k] = 0;
                    }
                    z++;
                }
            }
        }
        
        // trying to create new random squares after moving
        let countzeros = 0;
        let has2048 = false;
        let coordinates = [];
        // keep track of available spaces on square and puts the "coordinates" in an array
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.board[r][c] == 0) {
                    coordinates.push([r,c]);
                    countzeros++;
                    
                } else if (this.board[r][c] == 2048) {
                    has2048 = true;
                }
            }
        }
        if (coordinates.length > 0) {
            // generate random index in my coordinates array
            let randomcoordinate = Math.floor(Math.random() * coordinates.length);
            let ro = coordinates[randomcoordinate][0];
            let co = coordinates[randomcoordinate][1];
            let probability = Math.random();
            // 90% chance of getting a 2, 10% chance of getting 4
            if (probability <= 0.9) {
                this.board[ro][co] = 2;
            } else {
                this.board[ro][co] = 4;
            }
        }

        // console.log(this.board[0]);
        // console.log(this.board[1]);
        // console.log(this.board[2]);
        // console.log(this.board[3]);
        // create a 1d array reperesenting the new board so this will be the board represented in my state
        let newstate = [];
        for (let q = 0; q < this.size; q++) {
            for (let o = 0; o < this.size; o++) {
                newstate.push(this.board[q][o]);
            }
        }
        this.state.board = newstate;

        if (checkBoard(this.board) && countzeros <= 1) {
            this.state.won = false;
            this.state.over = true;
            this.updateLoseListeners(this.state);
        } else if (has2048) {
            this.state.won = true;
            this.state.over = true;
            this.updateWinListeners(this.state);
        } else {
            this.state.won = false;
            this.state.over = false;
        }
        this.updateMoveListeners(this.state);
    }
    
    toString() {
        let string = "";
        for (let i = 0; i < this.size * this.size; i++) {
            string = string + this.state.board[i] + " ";
        }
        return string;
        
    }

    onMove(callback) {
        this.movelisteners.push(callback);
    }

    onWin(callback) {
        this.winlisteners.push(callback);
    }

    onLose(callback) {
        this.loselisteners.push(callback);
    }

    updateMoveListeners(event) {
        this.movelisteners.forEach((l) => l(event));
    }

    updateWinListeners(event) {
        this.winlisteners.forEach((l) => l(event));
    }

    updateLoseListeners(event) {
        this.loselisteners.forEach((l) => l(event));
    }

    getGameState() {
        return this.state;
    }
    
    // addListener(listener) {
    //     let idx = this.listeners.findIndex((l) => l == listener);
    //     if (idx == -1) {
    //         this.listeners.push(listener);
    //     }
    // }

    // removeListener(listener) {
    //     let idx = this.listeners.findIndex((l) => l == listener);
    //     if (idx != -1) {
    //         this.listeners.splice(idx, 1);
    //     }
    // }

    



 }

// Game.state = {
//     board: [
//       0, 0, 0,  0, 0, 0,
//       0, 0, 0,  0, 0, 0,
//       0, 0, 0, 0
//     ],
//     score: 0,
//     won: false,
//     over: false
//   }




 /*
* Randomly shuffle an array
* https://stackoverflow.com/a/2450976/1293256
* @param  {Array} array The array to shuffle
* @return {String}      The first item in the shuffled array
*/
let shuffle = function (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

let combine = function (array) {
    let scoreadded = 0;
    let returnarray = [];
    if (array.length == 1) {
        returnarray[0] = array[0];
        return {arr: returnarray, score: 0};
    }
    let bottom = 0;
    let top = 1;
    while (top < array.length) {
        
        if (array[bottom] == array[top]) {
            returnarray.push(array[bottom] + array[top]);
            scoreadded = scoreadded + array[bottom] + array[top];
            bottom = bottom + 2;
            top = top + 2;
            continue;
        }

        returnarray.push(array[bottom]);
        bottom++;
        top++;
    }
    if (bottom < array.length) {
        returnarray.push(array[bottom]);
    }
    return {arr: returnarray, score: scoreadded};
};

let combine2 = function (array) {
    let scoreadded = 0;
    let returnarray = [];
    if (array.length == 1) {
        returnarray[0] = array[0];
        return {arr: returnarray, score: 0};
    }

    let bottom = array.length - 1;
    let top = array.length - 2;
    while (top >= 0) {
        
        if (array[bottom] == array[top]) {
            returnarray.push(array[bottom] + array[top]);
            scoreadded = scoreadded + array[bottom] + array[top];
            bottom = bottom - 2;
            top = top - 2;
            continue;
        }

        returnarray.push(array[bottom]);
        bottom--;
        top--;
    }

    if (bottom >= 0) {
        returnarray.push(array[bottom]);
    }

    return {arr: returnarray, score: scoreadded};
}

let checkCoord = function (x, y, boardsize) {

    if (x >= boardsize || y >= boardsize || x < 0 || y < 0) {
        return false
    }
    return true;
}

let checkBoard = function (board) {
    let lost = true;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (checkCoord(i + 1, j, board.length)) {
                if (board[i][j] == board[i + 1][j]) {
                    lost = false;
                }
            }
            if (checkCoord(i - 1, j, board.length)) {
                if (board[i][j] == board[i - 1][j]) {
                    lost = false;
                }
            }
            if (checkCoord(i, j + 1, board.length)) {
                if (board[i][j] == board[i][j + 1]) {
                    lost = false;
                }
            }
            if (checkCoord(i, j - 1, board.length)) {
                if (board[i][j] == board[i][j - 1]) {
                    lost = false;
                }
            }
        }
    }
    return lost;
}
