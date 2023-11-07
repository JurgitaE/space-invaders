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

        this.columns = 3;
        this.rows = 3;
        this.enemySize = 60;

        this.waves = [];
        this.waves.push(new Wave(this));

        this.loopTime = [];
        this.fps = 0;
        this.standardFps = 60;

        window.addEventListener('keydown', e => {
            !this.keys.includes(e.key) && this.keys.push(e.key);
            if (e.key === ' ') this.player.shoot();
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            index > -1 && this.keys.splice(index, 1);
        });
    }

    render(context) {
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
}

export default Game;
