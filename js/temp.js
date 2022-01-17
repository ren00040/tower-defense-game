/*
 * @Date: 2022-01-09 23:23:01
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-15 23:30:59
 * @FilePath: /tower-defense-game/js/temp.js
 */


function _detectEnemy(tower) {
    let bulletSpawner = new BulletSpawner();
    let enemyInRange = [];
    towerGame.enemies.forEach(enemy => {
        let towerPos = [pxToNum(tower.position[0]), pxToNum(tower.position[1])];
        let enemyPos = [enemy.position[0], enemy.position[1]];

        let distance = getDistance(towerPos,enemyPos);
        
        console.log("not find an enemy");

        if(distance <= tower.range) {
            enemyInRange.push(enemy);
            console.log("find an enemy");
            bulletSpawner.startSpawning(tower,enemyInRange);
        }
    });
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