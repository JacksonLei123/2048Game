export default class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    


    }

    move(direction) {
        this.model.move(direction);
        this.view.update();
    }

    
}