/*
 * @Date: 2022-01-02 00:33:05
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-05 22:05:19
 * @FilePath: /tower-defense-game/js/tower.js
 */

class Tower {
    constructor() {
        this.id = 0;
        this.name;
        this.type;
        this.range;
        this.minDamage;
        this.maxDamage;
        this.img = new Image();
        this.position;
        this.isShoot = false;
        this.bullets;
        this.cost;
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

        console.log(this);
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

        console.log(this.range);

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
                this.range = 80;
                break;

            case "ice":
                this.cost = 75;
                this.range = 80;
                break;

            default:
                break;
        }
    }
}