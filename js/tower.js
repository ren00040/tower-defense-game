/*
 * @Date: 2022-01-02 00:33:05
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-04 23:58:08
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
    }

    drawTower(allButtons,settlePoint) {
        // draw a tower
        console.log("Doing: settle a tower");

        let size =48;

        allButtons.forEach(btn => {
            if (btn.isSelected) {
                this.name = btn.name;
            }
        });
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
        console.log(newTower.position);

        newTower.style.position = "absolute";
        newTower.style.left = newTower.position[0];
        newTower.style.top = newTower.position[1];

        document.querySelector("#towerWrap").append(newTower);
        settlePoint.remove();
    }

    drawTowerRange() {
        // draw the attack range
    }
}