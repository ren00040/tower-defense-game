/*
 * @Date: 2022-01-05 23:58:21
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-09 23:27:59
 * @FilePath: /tower-defense-game/js/bullet.js
 */

class Bullet {
    constructor() {
        this.position = [];
        this.speed = 1;
        this.img = new Image();
    }

    initializeBullet(tower) {
        // style the new bullet
        this.name = tower.name+"Bullet";
        this.position = tower.position;
        console.log("bullet position: "+ this.position);
        switch (tower.name) {
            case "archer":
                this.img.src = "assets/images/bullets/b-archer.png";
                this.speed = 1;
                break;
    
            case "cannon":
                this.img.src = "assets/images/bullets/b-cannon.png";
                this.speed = 0.8;
                break;

            case "ice":
                this.img.src = "assets/images/bullets/b-ice.png";
                this.speed = 1;
                break;

            default:
                break;
        }
    }

    // let the bullet fly in a while
    bulletShooting(tower,target) {
        this.drawBullet(tower);
        this.bulletMoving(target);
        console.log("shooting at enemy"+target.id);
    }

    drawBullet(tower) {
        let dx = pxToNum(tower.position[0]);
        let dy = pxToNum(tower.position[1]);
        towerGame.bulletCTX.drawImage(this.img,dx,dy);
    }

    bulletMoving(target) {
        // linear interpolation between enemy and bullet

        let delta = pSub(this.position,target.position);

        // get the distance between enemy and bullet
        let distance = getDistance(this.position,target.position);

        // calculate the next position fo the bullet
        let offsetX = this.position[0] + this.speed * delta[0] / distance;
        let offsetY = this.position[1] + this.speed * delta[1] / distance;
        this.position = [offsetX,offsetY];
    }
}

class BulletSpawner{
    constructor() {
        this.bullets = [];
        this.rate = 1000; // the shooting interval (millisecond)
        this.target;
        this.name;
    }

    startSpawning(tower,enemyInRange) {
        // spawning a new bullet
        let bullet = new Bullet();
        this.bullets.push(bullet);
        // locking a target
        this.target = this.lockTarget(enemyInRange);
        // shooting
        bullet.initializeBullet(tower);
        bullet.bulletShooting(tower,this.target);
    }

    lockTarget(enemyInRange) {
        // get all enemies' waypoints
        let allWayPoints = [];
        enemyInRange.forEach(enemy => {
            allWayPoints.push(enemy.wayPointIndex);
        });

        // locked the enemy who has the greatest wayPoint index
        let indexOfMaxWaypoint = indexOfMax(allWayPoints);
        return enemyInRange[indexOfMaxWaypoint];
    }
}