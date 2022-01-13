/*
 * @Date: 2022-01-02 00:33:05
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-09 23:28:48
 * @FilePath: /tower-defense-game/js/tower.js
 */

var alltowers = []

class Tower {
    constructor() {
        this.id = 0;
        this.name;
        this.cost;
        this.type;
        this.range;
        this.minDamage;
        this.maxDamage;
        this.img = new Image();
        this.position;
        this.isShoot = false;
        this.bullets = [];
        this.rate;
        this.target;
    }

    drawTower(allButtons,settlePoint) {
        // draw a tower
        console.log("Doing: settle a tower");

        let size =48;

        allButtons.forEach(btn => {
            if (btn.isSelected) {
                this.name = btn.name;
            }
            btn.unselectedAllbtn();

        });

        this.initailizeTower();

        if(this.cost <= towerGame.gold) {
            // create the new tower and set image
            let newTower = document.createElement("div");
            this.img.src = "assets/images/towers/"+this.name+".png"
            this.img.style.width = size+"px";
            newTower.append(this.img);


            // tower's style
            newTower.setAttribute("id","tower");
            newTower.setAttribute("class","tower");
            newTower.setAttribute("class","tower_"+this.name);

            let positionX = settlePoint.style.left;
            let positionY = (pxToNum(settlePoint.style.top)+20)+"px";
            newTower.position = [positionX,positionY];

            newTower.style.position = "absolute";
            newTower.style.left = newTower.position[0];
            newTower.style.top = newTower.position[1];

            document.querySelector("#towerWrap").append(newTower);
            this.position = newTower.position;
            alltowers.push(this);
            settlePoint.remove();

            towerGame.gold -= this.cost;
            dishighSettlePoints();
            this.drawTowerRange(newTower);
        }
        else {console.log("not enough gold");}
        
    }

    drawTowerRange(newTower) {
        // draw the attack range
        const ctx = towerGame.towerCTX;

        let tower = newTower;
        let left = pxToNum(tower.position[0])+24;
        let top = pxToNum(tower.position[1])+24;

        ctx.beginPath();
        ctx.arc(left, top, this.range, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // set all tower's parameters
    initailizeTower() {
        switch (this.name) {
            case "archer":
                this.cost = 50;
                this.range = 120;
                break;
        
            case "cannon":
                this.cost = 80;
                this.range = 100;
                break;

            case "ice":
                this.cost = 75;
                this.range = 80;
                break;

            default:
                break;
        }
    }

    // spawning a bullet
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