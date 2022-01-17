/*
 * @Date: 2022-01-05 23:58:21
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-17 12:11:00
 * @FilePath: /tower-defense-game/js/bullet.js
 */

class Bullet {
    constructor() {
        this.position = [];
        this.speed = 1;
        this.img = new Image();
        this.target = new Eenmy();
    }

    initializeBullet(tower) {
        // style the new bullet
        this.name = tower.name+"Bullet";
        this.position = tower.position;
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

    lockTarget(enemyInRange) {
        // get all enemies' waypoints
        let allWayPoints = [];
        enemyInRange.forEach(enemy => {
            allWayPoints.push(enemy.wayPointIndex);
        });

        // locked the enemy who has the greatest wayPoint index
        let indexOfMaxWaypoint = indexOfMax(allWayPoints);
        this.target = enemyInRange[indexOfMaxWaypoint];        
    }

    bulletMoving() {
        // linear interpolation between enemy and bullet
        let pos = [pxToNum(this.position[0]),pxToNum(this.position[1])];

        let delta = pSub(pos,this.target.position);
        
        // get the distance between enemy and bullet
        let distance = getDistance(pos,this.target.position);
        
        // calculate the next position fo the bullet
        let offsetX = pos[0] + this.speed * delta[0]*5 / distance;
        let offsetY = pos[1] + this.speed * delta[1]*5 / distance;

        this.position = [offsetX+"px",offsetY+"px"];
    }
}

