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
}

export default Game;
