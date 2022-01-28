/*
 * @Date: 2021-12-16 00:10:31
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-27 00:12:37
 * @FilePath: /tower-defense-game/js/game.js
 */

/*
 * game.js contains the main logic code
 */

// Game object from setup()
class Game {
    constructor(){
        this.level = 1; // Current level; Game starts from the frist level
        this.endPoint;
        this.enemies = []; 
        this.towers = [];
        this.bulletsOfGame = []
        this.gold = 0;
        this.life = 0;
        this.maxLife;
        this.mapCTX;
        this.towerCTX;
        this.enemyCTX;
        this.bulletCTX;
        this.mapSprite = new Image(); //the game background image
        this.gameover = false;
        this.gameWave = 0;
        this.win = false;
        this.battleMusic = new Audio("assets/sounds/battleMusic.ogg")
    }

    update() { //from gameUpdate()

        // update enemies
        this.renderEnemies();
        // update towers
        this.updateTowers();
        // update bullets
        this.renderBullets()
        // update UI
        this.updateUI();
    }

    renderEnemies() { // from updat()
        // clear enemy canvas
        this.enemyCTX.clearRect(0,0,canvasWidth,canvasHight);

        this.updateEnemiesPosition();
        this.drawEnemies();
    }

    updateEnemiesPosition() { // from renderEnemies()
        this.enemies.forEach(enemy => {
            this.calculateEnemyPositon(enemy);
        });
    }

    calculateEnemyPositon(enemy) {
        let currentWayPointX = levels[currentLevel].waypath[enemy.wayPointIndex][0];
        let currentWayPointY = levels[currentLevel].waypath[enemy.wayPointIndex][1];
        let currentWayPoint = [currentWayPointX,currentWayPointY];

        let nextWayPointX = levels[currentLevel].waypath[enemy.wayPointIndex+1][0];
        let nextWayPointY = levels[currentLevel].waypath[enemy.wayPointIndex+1][1];
        let nextWayPoint = [nextWayPointX, nextWayPointY];

        let length = getDistance(currentWayPoint,nextWayPoint);
        enemy.step = Math.round(length/enemy.speed);
        
        let lengthX = nextWayPointX - currentWayPointX;
        let lengthY = nextWayPointY - currentWayPointY
        
        enemy.position[0] += lengthX/enemy.step;
        enemy.position[1] += lengthY/enemy.step;
        
        enemy.angle = angleBetweenPoints(currentWayPoint, nextWayPoint);

        enemy.stepIndex++;

        // if enemy arrives the waypoint then turn into the next waypoint

        if(enemy.stepIndex > enemy.step) {
            enemy.stepIndex = 0;
            enemy.wayPointIndex++;

            if(enemy.wayPointIndex == levels[currentLevel].waypath.length-1) {
                shakeMap();
                this.destoryEnemy();
            }
        }
    }

    drawEnemies() { // from renderEnemies()
        // console.log("drawEnemies");
        this.enemies.forEach(enemy => {
            let enemyImg = enemy.image;
            // Do the enemy walking animation
            // TODO: change the direction of enemy based on the waypath
            let direction;

            // use difference sprite's part according to angle
            if (enemy.angle>=45 && enemy.angle<=135)    { direction = 0; } // direction down
            if (enemy.angle>-45 && enemy.angle<45)      { direction = 1; } // direction right
            if (enemy.angle>=-135 && enemy.angle<=-45)  { direction = 2; } // direction up
            if (enemy.angle<-135 || enemy.angle>135)    { direction = 3; } // direction left

            this.enemyCTX.drawImage(enemyImg,
                enemy.animaLoop * enemy.size, direction * enemy.size, enemy.size, enemy.size,
                enemy.position[0] - enemy.size/2, enemy.position[1]- enemy.size/2,enemy.size,enemy.size);

            // more enemy's speed more animation fast
            enemy.animaInterval++;
            if (enemy.animaInterval >= (10/enemy.speed)) {
                enemy.animaLoop++;
                enemy.animaInterval = 0;
            }

            if(enemy.animaLoop >= 4) enemy.animaLoop = 0;

            this.drawEnemyHealpoint(enemy);
        });
    }

    // rendering enemy's healpoints
    drawEnemyHealpoint(enemy) {
        let red = 255 - (enemy.healPoint/100)*255;
        let green = (enemy.healPoint/100)*255;
        // set a gradient color; green means healthy and red means in danger
        let color = `rgb(${red},${green},0)`;
        let currentHp = 100;
        this.enemyCTX.fillStyle = color;
        // draw the enemy's HP
        this.enemyCTX.fillRect(enemy.position[0]-3,enemy.position[1]-enemy.size/2, 10 * enemy.healPoint/currentHp,2);
    }

    destoryEnemy() {
        this.enemies.shift();
        this.life --;
        
        // TODO: Game Win
        if (this.enemies.length <= 0 && towerGame.gameWave == levels[currentLevel].enemyWave.length-1) {
            console.log("win");
            this.youWin();
        }

        if(this.life <= 0) {
            this.gameOver();
        }else {
            if(this.enemies.length <= 0 && towerGame.gameWave < levels[currentLevel].enemyWave.length-1) towerGame.newWave();   
        }
    }

    newWave() {
        towerGame.gameWave++;
        enemySpawner(towerGame.gameWave);
    }

    updateTowers() {
        alltowers.forEach(tower => {
            this.findTarget(tower);
        });
    }

    findTarget(tower) { //from updateTowers()
        let enemyInRange = []; // store enemies which are in the tower attack range
        
        this.enemies.forEach(enemy => {
            let towerPos = [pxToNum(tower.position[0]), pxToNum(tower.position[1])];
            let enemyPos = [enemy.position[0], enemy.position[1]];

            let distance = getDistance(towerPos,enemyPos);

            // find an enemy
            if(distance <= tower.range) {
                enemyInRange.push(enemy);

                // the tower spawns bullets
                tower.spawnBullets(enemyInRange);
            }
        });
    }

    renderBullets() {
        // clear canvas
        this.bulletCTX.clearRect(0,0,canvasWidth,canvasHight);
        // rendering all bullets
        this.bulletsOfGame.forEach(bullet => {
            if(!bullet.target) {
                bullet.remove();
            }
            bullet.bulletMoving();
            let dx = pxToNum(bullet.position[0]);
            let dy = pxToNum(bullet.position[1]);
            let bPos = [dx, dy];
            let aimAngle = angleBetweenPoints(bPos,bullet.target.position)*pi/180;

            // save ctx
            this.bulletCTX.save();

            this.bulletCTX.translate(dx,dy);
            this.bulletCTX.rotate(aimAngle);
            this.bulletCTX.translate(-dx,-dy);

            this.bulletCTX.drawImage(bullet.img, dx, dy);

            // turn back CTX
            // this.bulletCTX.rotate(-aimAngle);
            
            // restore ctx
            this.bulletCTX.restore();
            
            // if the bullet close to the target, remove it
            let bulletToTargetDistance = getDistance(bPos,bullet.target.position)
            if (bulletToTargetDistance < 3) {
                const index = this.bulletsOfGame.indexOf(bullet);
                this.bulletsOfGame.splice(index,1);
                // invoke decreaseHp() to decrease the enemy's HP
                bullet.target.decreaseHp(bullet);
            }
        });
    }

    increaseGold(enemy) {
        this.gold += enemy.award;
    }

    updateUI() {
        // update wave
        let wavesNum = scorePanel.querySelector(".waveNum");
        wavesNum.innerHTML = `
            <img src='${gameUI.waveIcon.src}'></img>
            <a> ${towerGame.gameWave+1} / ${levels[currentLevel].enemyWave.length} </a>
        `;

        let playerLife = scorePanel.querySelector("#playerLife");
        playerLife.innerHTML = `
            <img src='${gameUI.lifeIcon.src}'></img>
            <a>${towerGame.life} / ${towerGame.maxLife}</a>
        `;

        let playerGold = scorePanel.querySelector("#gold");
        playerGold.innerHTML = `
            <img src='${gameUI.goldIcon.src}'></img>
            <a>${towerGame.gold}</a>
        `;
    }

    gameOver() {
        console.log("game over");
        this.gameover = true;
        this.battleMusic.pause()
        const gameOver = document.createElement("div");
        gameOver.setAttribute("id", "gameOver");
        gameOver.setAttribute("class", "gameOver");
        gameOver.style.background = "url('assets/images/ui/gameOverBackground.png')";
        gameOver.style.backgroundSize = "cover";

        const gameOverImg = new Image();
        gameOverImg.src = "assets/images/ui/gameOver.png";
        gameOverImg.setAttribute("class", "gameOverImg");

        const btnWrap = document.createElement("div");
        btnWrap.setAttribute("class","btnWrap");

        const restartBtn = document.createElement("div");
        restartBtn.classList.add("winBtn","restartBtn");
        restartBtn.style.background = "url('assets/images/ui/restart1.png')";
        
        const exitBtn = document.createElement("div");
        exitBtn.classList.add("winBtn","exitBtn")
        exitBtn.style.background = "url('assets/images/ui/exit1.png')";

        btnWrap.append(restartBtn,exitBtn);      
        gameOver.append(gameOverImg,btnWrap);
        gameWrap.append(gameOver);

        restartBtn.addEventListener("click", function() {
            location.reload();
        });
        restartBtn.addEventListener("mouseover", function() {
            restartBtn.style.background = "url('assets/images/ui/restart2.png')";
        });
        restartBtn.addEventListener("mouseout", function() {
            restartBtn.style.background = "url('assets/images/ui/restart1.png')";
        });
        exitBtn.addEventListener("click", function() {
            exit();
        });
        exitBtn.addEventListener("mouseover", function() {
            exitBtn.style.background = "url('assets/images/ui/exit2.png')";
        });
        exitBtn.addEventListener("mouseout", function() {
            exitBtn.style.background = "url('assets/images/ui/exit1.png')";
        });

    }

    youWin() {
        this.gameWin = true;
        this.battleMusic.pause()

        const gameWin = document.createElement("div");
        gameWin.setAttribute("id", "gameWin");
        gameWin.setAttribute("class", "gameWin");

        const winImg = new Image();
        winImg.src = "assets/images/ui/win.png";
        winImg.setAttribute("class", "winImg");

        const btnWrap = document.createElement("div");
        btnWrap.setAttribute("class","btnWrap");

        const restartBtn = document.createElement("div");
        restartBtn.classList.add("winBtn","restartBtn");
        restartBtn.style.background = "url('assets/images/ui/restart1.png')";
        
        const exitBtn = document.createElement("div");
        exitBtn.classList.add("winBtn","exitBtn")
        exitBtn.style.background = "url('assets/images/ui/exit1.png')";

        btnWrap.append(restartBtn,exitBtn);      
        gameWin.append(winImg,btnWrap);
        gameWrap.append(gameWin);

        restartBtn.addEventListener("click", function() {
            location.reload();
        });
        restartBtn.addEventListener("mouseover", function() {
            restartBtn.style.background = "url('assets/images/ui/restart2.png')";
        });
        restartBtn.addEventListener("mouseout", function() {
            restartBtn.style.background = "url('assets/images/ui/restart1.png')";
        });
        exitBtn.addEventListener("click", function() {
            exit();
        });
        exitBtn.addEventListener("mouseover", function() {
            exitBtn.style.background = "url('assets/images/ui/exit2.png')";
        });
        exitBtn.addEventListener("mouseout", function() {
            exitBtn.style.background = "url('assets/images/ui/exit1.png')";
        });
    }
}

// define all global variables
const towerGame = new Game(); // the global game object
let gameUI; // the game UI
let settlePoint;
const frame_rate = 25; // game frame rate: refresh once per 40 milliseconds: 1000/25=40
const gameWrap = document.createElement("div"); // contains the game's window
const canvasWidth = 700; // Initialize game canvas width
const canvasHight = 600; // Initialize game canvas hight
let updateTimeoutID;
// TODO: add more global variables

// game setup
function gameSetup() {
    gameUI = new GameUI();
    settlePoint = new SettlePoint();
    //setup game main container
    gameWrap.setAttribute("id","game-wrap");
    gameWrap.classList.add("game-wrap")
    let marginleft = -canvasWidth/2;

    document.body.append(gameWrap);
    gameWrap.style.width = canvasWidth+"px";
    gameWrap.style.height = canvasHight+"px";
    
    gameWrap.style.left = "50%";
    gameWrap.style.marginLeft = marginleft.toString()+"px";

    console.log("the game wrap is created");
    
    // Create a tower wrap
    let towerWrap = document.createElement("div");
    towerWrap.setAttribute("id","towerWrap");
    towerWrap.setAttribute("class","towerWrap");
    gameWrap.append(towerWrap);

    // Setup game canvas
    intializeCanvas();

    // Setup game menu
    let gameMenu = document.createElement("div");
    gameMenu.setAttribute("id","game-menu");
    gameMenu.setAttribute("class","game-menu");

    gameMenu.style.left = "50%";
    gameMenu.style.marginLeft = "-110px";

    document.querySelector("#game-wrap").append(gameMenu);
    console.log("the game menu object is created");

    drawGameMenu(); // Draw the game menu buttons
}

function intializeCanvas() { 
    //from gameSetup()
    // Initialize All Game Canvas
    /*
    * Initialize the map canvas contains the scene
    * Get CTX(map) and set canvas's width and height
    */
    const mapCanvas = document.querySelector("#mapCanvas");
    let marginleft = -canvasWidth/2;
    // get CTX(map)
    towerGame.mapCTX = mapCanvas.getContext("2d") // Create a CanvasRenderingContext 2D Object
    mapCanvas.width = canvasWidth;
    mapCanvas.height = canvasHight;
    mapCanvas.style.left = "50%";
    mapCanvas.style.marginLeft = marginleft.toString()+"px";

    /*
    * Initialize the battle canvas
    * Get CTX(battle canvas) and set canvas's width and height
    */
    const towerCanvas = document.querySelector("#towerCanvas");
    // get CTX(battle canvas)
    towerGame.towerCTX = towerCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    towerCanvas.width = canvasWidth;
    towerCanvas.height = canvasHight;
    towerCanvas.style.left = "50%";
    towerCanvas.style.marginLeft = marginleft.toString()+"px";
    /*
    * Initialize the enemy canvas
    * Get CTX(enemy canvas) and set canvas's width and height
    */
    const enemyCanvas = document.querySelector("#enemisCanvas");
    // get CTX(enemy canvas)
    towerGame.enemyCTX = enemyCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    enemyCanvas.width = canvasWidth;
    enemyCanvas.height = canvasHight;
    enemyCanvas.style.left = "50%";
    enemyCanvas.style.marginLeft = marginleft.toString()+"px";

    /*
    * Initialize the bullets canvas
    * Get CTX(bullets canvas) and set canvas's width and height
    */
    const bulletCanvas = document.querySelector("#bulletsCanvas");
    // get CTX(enemy canvas)
    towerGame.bulletCTX = bulletCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    bulletCanvas.width = canvasWidth;
    bulletCanvas.height = canvasHight;
    bulletCanvas.style.left = "50%";
    bulletCanvas.style.marginLeft = marginleft.toString()+"px";

    /*
    * Initialize the copyright canvas
    * Get CTX(copyright canvas) and set canvas's width and height
    */
    const copyrightCanvas = document.querySelector("#copyrightCanvas");
    // get CTX(enemy canvas)
    towerGame.copyrightCTX = copyrightCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    copyrightCanvas.width = canvasWidth;
    copyrightCanvas.height = canvasHight;
    copyrightCanvas.style.left = "50%";
    copyrightCanvas.style.marginLeft = marginleft.toString()+"px";
}

// Draw the game menu
function drawGameMenu() {
    console.log("starting draw game menu")
    
    // loading background-image
    // gameWrap.style.backgroundImage = "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')";
    towerGame.mapSprite.src = "https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    towerGame.mapSprite.onload = function(){
        towerGame.mapCTX.drawImage(towerGame.mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);
    }

    copyright();

    const gameMenu = document.querySelector("#game-menu");
    
    // create 3 buttons: start, credits and exit
    const startButton = document.createElement("div");
    startButton.setAttribute("id","start-button");
    startButton.setAttribute("name","start"); // 'name' attribute is used for loading background imamge
    startButton.classList.add("menu-button","start-button");

    const creditsButton = document.createElement("div");
    creditsButton.setAttribute("id","credits-button");
    creditsButton.setAttribute("name","credits"); // 'name' attribute is used for loading background imamge
    creditsButton.classList.add("menu-button","credits-button");

    const exitButton = document.createElement("div");
    exitButton.setAttribute("id","exit-button");
    exitButton.setAttribute("name","exit"); // 'name' attribute is used for loading background imamge
    exitButton.classList.add("menu-button","exit-button");

    // rendering menu buttons
    gameMenu.append(startButton,creditsButton,exitButton);

    const menuButton = document.querySelectorAll(".menu-button"); //select all menu-buttons
    /*
     * use loop to set all button's backgroundImage
     * use onmouseover & onmouseout to set the hover effects
     */
    menuButton.forEach(element => {
        element.style.backgroundImage = "url('assets/images/ui/"+element.getAttribute('name')+"1.png')";
        // hover effect
        element.onmouseover = function () {
            element.style.backgroundImage = "url('assets/images/ui/"+element.getAttribute('name')+"2.png')";
        };
        element.onmouseout = function () {
            element.style.backgroundImage = "url('assets/images/ui/"+element.getAttribute('name')+"1.png')";
        };
        // click event
        element.addEventListener('click',function(){
            element.style.backgroundImage = "url('assets/images/ui/"+element.getAttribute('name')+"3.png')";
            switch (element.getAttribute('name')) {
                case "start":
                    loadingLevel();
                    break;
                case "credits":
                    credits();
                    break;
                case "exit":
                    exit();
                    break;
                default:
                    break;
            }
        });
    });
}

// Game Exit
function exit() {
    console.log("TODO: game exit")
    close();
}

// Show Credits Page
function credits() {
    console.log("TODO: Credits");
}

// Game start
function loadingLevel() { 
    // from drawGameMenu()
    console.clear();
    document.querySelector("#game-menu").remove();
    loadingBar();
    loadingScene();
    gameUI.drawUI();
    enemySpawner(towerGame.wavesNum);
    gameUpdate();
}

    // Loading bar animation
function loadingBar() {
    // from loadingLevel()
    console.log("TODO: loading bar");
}

    // Loading Scene
function loadingScene() { // from loadingLevel()
    // Initailize current stage data
    let currentlevel = towerGame.level;
    towerGame.life = levels[currentlevel-1].life;
    towerGame.maxLife = levels[currentlevel-1].life;
    towerGame.wavesNum = 0;
    towerGame.gold = levels[currentlevel-1].gold;
    towerGame.mapCTX.clearRect(0,0,mapCanvas.width,mapCanvas.height);
    // loading battle map base on current towerGame.level
    towerGame.mapSprite.src = "assets/images/levels/level"+towerGame.level+".png";
    towerGame.mapSprite.onload = function(){
        towerGame.mapCTX.drawImage(towerGame.mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);
    }

    towerGame.battleMusic.loop = true;
    towerGame.battleMusic.play();
    
    drawSettlePoints();
    
    /*
     * draw the waypath
     * It's a tool for adjust the enemy's waypath points
     * remember to hide all the points when game is pubilished
    */
   let currentWaypath = levels[currentlevel-1].waypath;

   const waypathWrap = document.createElement("div");
   waypathWrap.setAttribute("id","waypath");
   document.querySelector("#game-wrap").append(waypathWrap);
    
   // create and render the waypath with num
   for(const[key, coordinate] of currentWaypath.entries()) {
       let positionX = coordinate[0];
       let positionY = coordinate[1];

       let waypoint = document.createElement("div");
       waypoint.innerHTML = key;

       waypoint.setAttribute("id","waypoint"+key);
       waypoint.setAttribute("class","waypoint");

       waypoint.style.position = "absolute";
       waypoint.style.color = "red";
       waypoint.style.left = positionX + "px";
       waypoint.style.top = positionY + "px";

       waypathWrap.append(waypoint);
       towerGame.endPoint = coordinate;
   }
   
}



/*
 * shake the mapCanvas when an enemy arrived the end
 * reference from https://stackoverflow.com/questions/28023696/html-canvas-animation-which-incorporates-a-shaking-effect/28025113
 */
function startShake() {
    shakeStartTime=Date.now();
}

var shakeDuration = 200;
var shakeStartTime = -1;

function preShake() {
  if (shakeStartTime ==-1) return;
  var dt = Date.now()-shakeStartTime;
  if (dt>shakeDuration) {
      shakeStartTime = -1; 
      return;
  }
  var easingCoef = dt / shakeDuration;
  var easing = Math.pow(easingCoef-1,3) +1;
  towerGame.mapCTX.save();
  towerGame.towerCTX.save();
  var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*15;
  var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*15;
  towerGame.mapCTX.translate(dx, dy);  
  towerGame.towerCTX.translate(dx,dy);
}

function postShake() {
  if (shakeStartTime ==-1) return;
  towerGame.mapCTX.restore();
}

function drawThings() {  
    const mapSprite = new Image();
    mapSprite.src = "assets/images/levels/level"+towerGame.level+".png";
    towerGame.mapCTX.drawImage(mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);

}

function shakeAnimate() {
  // keep animation alive
  requestAnimationFrame(shakeAnimate);
  // erase
  towerGame.mapCTX.clearRect(0,0,mapCanvas.width, mapCanvas.height);
  //
  preShake();
  //
  towerGame.mapCTX.clearRect(0,0,mapCanvas.width,mapCanvas.height);
  drawThings();
  postShake();
}

function shakeMap() {
    startShake();
    shakeAnimate();
}


function copyright() { // from loadingScene()
    let copyrightText = "Copyright 2022 @ Fossil Studio";
    let working = "I'm working on it, please be patient for the update.";
    towerGame.copyrightCTX.textAlign = "end";
    towerGame.copyrightCTX.fillText(working,canvasWidth-20,canvasHight-35);
    towerGame.copyrightCTX.fillText(copyrightText,canvasWidth-20,canvasHight-20);
}

    // Battle Start
function gameUpdate() { //from loadingLevel()
    towerGame.update();
    if(!towerGame.gameover) {
        updateTimeoutID = window.setTimeout(gameUpdate, 1000/frame_rate); // come back here every interval; 24 times per second
    }
}

    // Battle Fail

        // Game quit

        // Try again

// Show Credit

// Game quit: Jump to thanksAndFeedback.html


gameSetup();
