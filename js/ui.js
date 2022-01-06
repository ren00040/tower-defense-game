/*
 * @Date: 2022-01-03 23:19:40
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-05 21:56:05
 * @FilePath: /tower-defense-game/js/ui.js
 */

class SettlePoint {
    constructor() {
        this.icon = new Image();
        this.isSettled = false;
        this.isHighlight = false;
    }
}

var allTowerBtn= [];

class towerSelectBtn {
    constructor() {
        this.name;
        this.icon = new Image();
        this.isSelected = false;
        this.cost;
    }

    onclick() {
        console.log("onclick"+this.name);
        // select btn
        this.btnToggle();
    }
  
    btnToggle() {
        let btn = towerPanel.querySelector(".towerBtn"+this.name);

        // if this btn was selected
        if(this.isSelected) {
            // clear all btn
            this.unselectedAllbtn();
            dishighSettlePoints()
        }else{
            // clear all btn
            this.unselectedAllbtn();

            // seleting the btn which we need
            btn.style.background = "grey";
            this.isSelected = true;

            highSettlePoints();
        }
    }

    unselectedAllbtn() {
        let towerBtn = towerPanel.querySelectorAll(".towerBtn");
        towerBtn.forEach(btn => {
            btn.style.background = null;
            this.isSelected = false;
        });
    }
}

// Draw the Battle Map UI
class GameUI {
    constructor() {
        this.uiWarp;
        this.scorePanel;
        this.waveIcon = new Image();
        this.lifeIcon = new Image();
        this.goldIcon = new Image();
    }
    drawUI() { // from loadingLevel()
        // create the UI div under game wrap
        this.drawUIWrap();
        // draw game setting buttom
        this.drawSetting();

        // draw the score panel (gold, wave, life)
        this.drawScorePanel();

        // draw the tower panel
        this.drawTowerPanel();
    }

    drawUIWrap() { // from drawUI()
        // create UI wrap
        this.uiWarp = document.createElement("div");
        this.uiWarp.setAttribute("id","ui-wrap");
        this.uiWarp.setAttribute("class","ui-wrap");
        document.querySelector("#game-wrap").append(this.uiWarp);
    }

    drawSetting() { // from drawUI()
        // draw setting button
        let settingBTN = document.createElement("div");
        settingBTN.setAttribute("id","settingBTN");
        settingBTN.setAttribute("class","settingBTN");
        let settingSize = 32;
        this.uiWarp.append(settingBTN);
        let settingIcon = new Image();
        settingIcon.src = "assets/images/ui/setting.png"
        settingBTN.append(settingIcon);

        settingIcon.style.width = settingSize + "px";
        settingIcon.style.height = settingSize + "px";
        settingBTN.style.left = canvasWidth-settingSize +"px";

        settingBTN.onclick = function() {
            console.log("Click setting BTN","TODO: Setting Menu")
        }
    }

    drawScorePanel() {
        this.scorePanel = document.createElement("div");
        this.scorePanel.setAttribute("id","scorePanel");
        this.scorePanel.setAttribute("class","scorePanel");
        this.uiWarp.append(this.scorePanel);

        // draw the number of waves
        let wavesNum = document.createElement("div");
        let currentLevel = towerGame.level;
        this.waveIcon.src = "assets/images/ui/wave.png";
        wavesNum.setAttribute("class","waveNum");
        wavesNum.innerHTML = `
            <img src='${this.waveIcon.src}'></img>
            <a>${towerGame.gameWave+1} / ${levels[currentLevel].enemyWave.length} </a>
        `
        this.scorePanel.append(wavesNum);
    
        // draw the player's life
        let playerLife = document.createElement("div");
        this.lifeIcon.src = "assets/images/ui/life.png";
        playerLife.setAttribute("id","playerLife");
        playerLife.innerHTML = `
            <img src='${this.lifeIcon.src}'></img>
            <a>${towerGame.life} / ${towerGame.maxLife}</a>
        `
        this.scorePanel.append(playerLife);

        // draw the number of gold
        let gold = document.createElement("div");
        this.goldIcon.src = "assets/images/ui/gold.png";
        gold.setAttribute("id","gold");
        gold.innerHTML = `
            <img src='${this.goldIcon.src}'></img>
            <a>${towerGame.gold}</a>
        `
        this.scorePanel.append(gold);
    }

    drawTowerPanel() {
        let currentLevel = towerGame.level;
        let towerPanel = document.createElement("div");
        towerPanel.setAttribute("id","towerPanel");
        towerPanel.setAttribute("class","towerPanel");
        this.uiWarp.append(towerPanel);

        let availableTower = levels[currentLevel-1].availableTower;

        // create all tower select button
        availableTower.forEach(towerID => {
            let towerBtn = new towerSelectBtn();
            switch (towerID) {
                case 1:
                    towerBtn.name = "archer";
                    towerBtn.cost = 50;
                    break;

                case 2:
                    towerBtn.name = "cannon";
                    towerBtn.cost = 80;
                    break;

                case 3:
                    towerBtn.name = "ice";
                    towerBtn.cost = 75;
                    break;
                
                default:
                    break;
            }
            towerBtn.icon.src = "assets/images/towers/"+towerBtn.name+".png";
            // collect all buttons
            allTowerBtn.push(towerBtn);

            let towerBtnContents = document.createElement("div");
            towerBtnContents.setAttribute("class","towerBtn towerBtn"+towerBtn.name);
            towerBtnContents.innerHTML = `
                <img src="assets/images/towers/${towerBtn.name}.png"></img>
                <a>${towerBtn.cost}</a>
            `

            // set the tower button click event
            towerBtnContents.onclick = function () {
                towerBtn.onclick();
            }

            // rendering towerBtn contents
            towerPanel.append(towerBtnContents);
        });

    }  
}

function highSettlePoints() {
    let settlePoints = document.querySelectorAll(".settlePoint");
    settlePoints.forEach(point => {
        point.src = "assets/images/towers/settle-highlight.png";
        // TODO: if settleable or enough gold
        point.onclick = function () {
            let newTower = new Tower();
            newTower.drawTower(allTowerBtn,point);
        }
    });
}

function dishighSettlePoints() {
    let settlePoints = document.querySelectorAll(".settlePoint");
    settlePoints.forEach(point => {
        point.src = "assets/images/towers/settle.png";
        point.onclick = function () {
            console.log("null");
        }
    });
}

function drawSettlePoints() {
    /*
     * draw the settle places which can build towers
     * Important!!! It's hard to click elements in canvas, so draw all towers and UI in the Html layer.
    */
    let currentlevel = towerGame.level;
    let settlePlaces = levels[currentlevel-1].settlePlace;
    const settleWrap = document.createElement("div");
    settleWrap.setAttribute("id","settleWrap");
    document.querySelector("#game-wrap").append(settleWrap);

    // create and render the settle places
    for(const[key, coordinate] of settlePlaces.entries()) {
        let positionX = coordinate[0];
        let positionY = coordinate[1];
        
        let settlePoint = new SettlePoint();
        settlePoint.icon.setAttribute("id","settlePoint"+key);
        settlePoint.icon.setAttribute("class","settlePoint");
        settlePoint.icon.src = "assets/images/towers/settle.png";
        settlePoint.icon.style.position = "absolute";
        settlePoint.icon.style.left = positionX + "px";
        settlePoint.icon.style.top  = positionY + "px";

        // rendering settlePlace
        settleWrap.append(settlePoint.icon);
    }
}


