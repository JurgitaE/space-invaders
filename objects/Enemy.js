class Enemy {
    constructor(game, positionX, positionY) {
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }

    draw(context) {
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    update(x, y) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        this.game.projectilesPool.forEach(projectile => {
            if (!projectile.free && this.game.checkCollision(this, projectile)) {
                this.hit(1);
                projectile.reset();
            }
        });
        if (this.lives < 1) {
            this.frameX++;
            if (this.frameX > this.maxFrame) {
                this.markedForDeletion = true;
                if (!this.game.gameOver) this.game.score += this.maxLives;
            }
        }
        //Check collision enemies-player
        if (this.game.checkCollision(this, this.game.player)) {
            this.markedForDeletion = true;
            if (!this.game.gameOver && this.game.score > 0) this.game.score--;
            this.game.player.lives--;
            if (this.game.player.lives < 1) this.game.gameOver = true;
        }
        // Lose condition
        if (this.y + this.height > this.game.height) {
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }
    }
    hit(damage) {
        this.lives -= damage;
    }
}

class Beetlemorph extends Enemy {
    constructor(game, positionX, positionY) {
        super(game, positionX, positionY);
        this.image = document.getElementById('beetlemorph');
        this.frameX = 0;
        this.maxFrame = 2;
        this.frameY = Math.floor(Math.random() * 4);
        this.lives = 1;
        this.maxLives = this.lives;
    }
}
export { Enemy, Beetlemorph };
