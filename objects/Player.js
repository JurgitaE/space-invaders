class Player {
    constructor(game) {
        this.game = game;
        this.width = 140;
        this.height = 120;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
        this.lives = 3;
        this.maxLives = 10;
        this.image = document.getElementById('player');
        this.jets_image = document.getElementById('player_jets');
        this.frameX = 0;
        this.jetsframeX = 1;
    }
    draw(context) {
        // handle sprite frames
        if (this.game.keys.indexOf(' ')) {
            this.frameX = 1;
        } else {
            this.frameX = 0;
        }
        context.drawImage(
            this.jets_image,
            this.width * this.jetsframeX,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.drawImage(
            this.image,
            this.width * this.frameX,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    update() {
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.x -= this.speed;
            this.jetsframeX = 0;
        } else if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed;
            this.jetsframeX = 2;
        } else {
            this.jetsframeX = 1;
        }
        if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
    }
    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }
    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }
}
export default Player;
