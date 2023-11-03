import Player from './Player.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);

        window.addEventListener('keydown', e => {
            !this.keys.includes(e.key) && this.keys.push(e.key);
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            index > -1 && this.keys.splice(index, 1);
        });
    }

    render(context) {
        this.player.draw(context);
        this.player.update();
    }
}

export default Game;
