import Enemy from './Enemy.js';

class Wave {
    constructor(game) {
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = 0;
        this.y = -this.height;
        this.speedX = 3;
        //sensitivity to fps
        this.speedXAdjusted = false;
        this.initialYspeed = 5;
        this.initialYspeedAdjusted = false;
        //
        this.speedY = 0;
        this.enemies = [];
        this.create();
    }

    render(context) {
        //sensitivity to fps
        if (!this.speedXAdjusted && this.game.fps) {
            this.speedXAdjusted = true;
            this.speedX *= this.game.standardFps / this.game.fps;
        }
        if (!this.initialYspeedAdjusted && this.game.fps) {
            this.initialYspeedAdjusted = true;
            this.initialYspeed *= this.game.standardFps / this.game.fps;
        }
        //
        if (this.y < 0) this.y += this.initialYspeed;
        this.speedY = 0;
        context.strokeRect(this.x, this.y, this.width, this.height);

        if (this.x < 0 || this.x > this.game.width - this.width) {
            this.speedX *= -1;
            this.speedY += this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(enemy => {
            enemy.update(this.x, this.y);
            enemy.draw(context);
        });
    }
    create() {
        for (let y = 0; y < this.game.rows; y++) {
            for (let x = 0; x < this.game.columns; x++) {
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                this.enemies.push(new Enemy(this.game, enemyX, enemyY));
            }
        }
    }
}

export default Wave;
