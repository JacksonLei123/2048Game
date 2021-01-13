export default class GameView {
    constructor(model) {
        this.model = model;

        this.values = [];
        // hello
        for (let i = 0; i < this.model.getGameState().board.length; i++) {
            this.values.push(this.model.getGameState().board[i]);
        }

        let board = `
     
        <div class = "boardcontainer">
            <div class = b>
                <div class = board>
                    <div class = "cell"> ${this.values[0]} ${this.values[1]} ${this.values[2]} ${this.values[3]}</div>
                    <div class = "cell"> ${this.values[4]} ${this.values[5]} ${this.values[6]} ${this.values[7]}</div>
                    <div class = "cell"> ${this.values[8]} ${this.values[9]} ${this.values[10]} ${this.values[11]}</div>
                    <div class = "cell"> ${this.values[12]} ${this.values[13]} ${this.values[14]} ${this.values[15]}</div>
                    <div class = "score"> Score: ${this.model.getGameState().score} </div>
                    <div class = "status"> </div>
                </div>
            </div>
            <button id = "newgame"> New Game </button>
        </div>
        `

        this.board = board;
    }

    update() {
        this.values = [];
        for (let i = 0; i < this.model.getGameState().board.length; i++) {
            this.values.push(this.model.getGameState().board[i]);
        }
        let board = `
     
            <div class = "board">

                <div class = "cell"> ${this.values[0]} ${this.values[1]} ${this.values[2]} ${this.values[3]}</div>
                <div class = "cell"> ${this.values[4]} ${this.values[5]} ${this.values[6]} ${this.values[7]}</div>
                <div class = "cell"> ${this.values[8]} ${this.values[9]} ${this.values[10]} ${this.values[11]}</div>
                <div class = "cell"> ${this.values[12]} ${this.values[13]} ${this.values[14]} ${this.values[15]}</div>
                <div class = "score"> Score: ${this.model.getGameState().score} </div>
                <div class = "status"> </div>
            </div>
     
        `
        $(".b").empty().append(board);

        if (this.model.getGameState().won == false && this.model.getGameState().over == true) {
            $(".status").text("You Lost");
        } else if (this.model.getGameState().won == true && this.model.getGameState().over == true) {
            $(".status").text("You Won");
        }
        this.board = board;
    }

   





}