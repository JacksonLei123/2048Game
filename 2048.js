import Game from "./engine/game.js";
import GameView from "./2048view.js";
import GameController from "./2048controller.js";

let model = null;
let controller = null;
let view = null;

$(document).ready(() => {
    model = new Game(4);
    view = new GameView(model);
    controller = new GameController(model, view);
    $('body').append(view.board);
    $('#newgame').click(newGame);
    $(window).keydown(function (e) {
        //use e.which
        var keyCode = e.which;
        if (keyCode == 37) {
            controller.move("left");
        }
        if (keyCode == 38) {
            controller.move("up");
        }
        if (keyCode == 39) {
            controller.move("right");
        }
        if (keyCode == 40) {
            controller.move("down");
        }
    })
     
});

function newGame() {
    model.setupNewGame();
    view.update();
}

