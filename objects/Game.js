import Player from './Player.js';
import Projectile from './Projectile.js';
import Wave from './Wave.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);

        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();

        this.columns = 2;
        this.rows = 2;
        this.enemySize = 60;

        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;

        this.score = 0;
        this.gameOver = false;

        this.loopTime = [];
        this.fps = 0;
        this.standardFps = 60;

        window.addEventListener('keydown', e => {
            !this.keys.includes(e.key) && this.keys.push(e.key);
            if (e.key === ' ') this.player.shoot();
            if (e.key === 'r' && this.gameOver) this.restart();
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            index > -1 && this.keys.splice(index, 1);
        });
    }

    render(context) {
        this.drawStatusText(context);
        //sensitivity to fps
        if (this.loopTime.length < 20) {
            this.loopTime.push(Date.now());
        }
        if (this.loopTime.length === 20 && !this.fps) {
            this.fps =
                1000 /
                (this.loopTime
                    .map((x, i, arr) => (i !== this.loopTime.length ? this.loopTime[i + 1] - this.loopTime[i] : x))
                    .slice(0, -1)
                    .reduce((a, b) => a + b, 0) /
                    this.loopTime.length);
        }
        //
        this.player.draw(context);
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
                this.newWave();
                this.waveCount++;
                wave.nextWaveTrigger = true;
                this.player.lives++;
            }
        });
    }
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.projectilesPool.push(new Projectile());
        }
    }
    getProjectile() {
        for (let i = 0; this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }
    checkCollision(a, b) {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.width && a.y + a.width > b.y;
    }
    drawStatusText(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.fillText('Score: ' + this.score, 20, 40);
        context.fillText('Wave: ' + this.waveCount, 20, 80);
        for (let i = 0; i < this.player.lives; i++) {
            context.fillRect(20 + 10 * i, 100, 5, 20);
        }
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '100px Impact';
            context.fillText('GAME OVER', this.width * 0.5, this.height * 0.5);
            context.font = '20px Impact';
            context.fillText('Press R to restart!', this.width * 0.5, this.height * 0.5 + 30);
        }
        context.restore();
    }
    newWave() {
        if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8) {
            this.columns++;
        } else if (this.rows * this.enemySize < this.height * 0.6) {
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
    restart() {
        this.player.restart();

        this.columns = 2;
        this.rows = 2;

        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;

        this.score = 0;
        this.gameOver = false;
    }
}

export default Game;
