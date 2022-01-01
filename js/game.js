/*
 * @Date: 2021-12-16 00:10:31
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-01 00:55:25
 * @FilePath: /tower-defense-game/js/game.js
 */

/*
 * game.js contains the main logic code
 */

// define all global variables
var towerGame; // the global game object
const frame_rate = 25; // game frame rate: refresh once per 40 milliseconds: 1000/25=40
var gameWrap; // contains the game's window
const canvasWidth = 700; // Initialize game canvas width
const canvasHight = 600; // Initialize game canvas hight
var updateTimeoutID;
// TODO: add more global variables

// game setup
function gameSetup() {
    // Creat the game object
    towerGame = new Game();

    //setup game main container
    gameWrap = document.createElement("div");
    gameWrap.setAttribute("id","game-wrap");
    gameWrap.classList.add("game-wrap")
    let marginleft = -canvasWidth/2;

    document.body.append(gameWrap);
    // gameWrap.style.display = "block";
    gameWrap.style.width = canvasWidth+"px";
    gameWrap.style.height = canvasHight+"px";
    
    gameWrap.style.left = "50%";
    gameWrap.style.marginLeft = marginleft.toString()+"px";

    console.log("the game wrap is created");
    
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

    let gameMenu = document.querySelector("#game-menu");
    
    // create 3 buttons: start, credits and exit
    let startButton = document.createElement("div");
    startButton.setAttribute("id","start-button");
    startButton.setAttribute("name","start"); // 'name' attribute is used for loading background imamge
    startButton.classList.add("menu-button","start-button");

    let creditsButton = document.createElement("div");
    creditsButton.setAttribute("id","credits-button");
    creditsButton.setAttribute("name","credits"); // 'name' attribute is used for loading background imamge
    creditsButton.classList.add("menu-button","credits-button");

    let exitButton = document.createElement("div");
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
}

// Show Credits Page
function credits() {
    console.log("TODO: Credits");
}

// Game object from setup()
class Game {
    constructor(){
        this.level = 1; // Current level; Game starts from the frist level
        this.endPoint;
        this.enemies = []; 
        this.towers = [];
        this.bullets = []
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

    drawEnemyHealpoint(enemy) {
        let red = (100-enemy.healPoint)*255/100;
        let green = (enemy.healPoint/100)*255;
        let color = `rgb(${red},${green},0)`;
        let currentHp = 100;
        this.enemyCTX.fillStyle = color;
        // draw the enemy's HP
        this.enemyCTX.fillRect(enemy.position[0]-3,enemy.position[1]-enemy.size/2, 10 * enemy.healPoint/currentHp,2);
    }

    destoryEnemy() {
        this.enemies.shift();
        this.life --;
        console.log(this.life);
        if(this.life <= 0) this.gameOver();
        console.log("destory an enemy");

        if(this.enemies.length == 0) towerGame.newWave();
    }

    newWave() {
        towerGame.gameWave++;
        console.log("TODO: a new wave spawning");
        enemySpawner(towerGame.gameWave);
    }

    updateTowers() {
        
    }

    renderBullets() {
        
    }

    updateUI() {
        let uiWarp = document.querySelector("#ui-wrap");
        // update wave
        let wavesNum = document.querySelector(".waveNum");
        wavesNum.innerHTML = `
            <p> WAVE ${towerGame.gameWave+1} / ${levels[currentLevel].enemyWave.length} </p>
        `;

        let playerLife = document.querySelector("#playerLife");
        playerLife.innerHTML = `
            <p> LIFE ${towerGame.life} / ${towerGame.maxLife} </p>
        `
    }

    gameOver() {
        console.log("game over");
        this.gameover = true;
    }
}

// Game start
function loadingLevel() { 
    // from drawGameMenu()
    console.clear();
    console.log("Game Start");
    document.querySelector("#game-menu").remove();
    loadingBar();
    loadScene();
    drawUI();
    enemySpawner(towerGame.wavesNum);
    gameUpdate();
}

    // Loading bar animation
function loadingBar() {
    // from start()
    console.log("TODO: loading bar");
}

    // Loading Scene
function loadScene() { // from start()
    let currentlevel = towerGame.level;
    towerGame.life = levels[currentlevel-1].life;
    towerGame.maxLife = levels[currentlevel-1].life;
    towerGame.wavesNum = 0;
    towerGame.mapCTX.clearRect(0,0,mapCanvas.width,mapCanvas.height);
    // loading battle map base on current towerGame.level
    towerGame.mapSprite.src = "assets/images/levels/level"+towerGame.level+".png";
    towerGame.mapSprite.onload = function(){
        towerGame.mapCTX.drawImage(towerGame.mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);
    }
    
    /*
     * draw the settle places which can build towers
     * Important!!! It's hard to click elements in canvas, so draw all towers and UI in the Html layer.
    */
    let settlePlaces = levels[currentlevel-1].settlePlace;
    const settleWrap = document.createElement("div");
    settleWrap.setAttribute("id","settleWrap");
    document.querySelector("#game-wrap").append(settleWrap);

    // create and render the settle places
    for(const[key, coordinate] of settlePlaces.entries()) {
        let positionX = coordinate[0];
        let positionY = coordinate[1];
        
        let settlePoint = new Image();
        settlePoint.setAttribute("id","settlePoint"+key);
        settlePoint.setAttribute("class","settlePoint");
        settlePoint.src = "assets/images/towers/settle.png";
        settlePoint.style.position = "absolute";
        settlePoint.style.left = positionX + "px";
        settlePoint.style.top  = positionY + "px";

        // rendering settlePlace
        settleWrap.append(settlePoint);
    }
    
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

    // Draw the Battle Map UI
function drawUI() { // from start()
    console.log("TODO: Draw UI");
    // create UI wrap
    let uiWrap = document.createElement("div");
    uiWrap.setAttribute("id","ui-wrap");
    uiWrap.setAttribute("class","ui-wrap");
    document.querySelector("#game-wrap").append(uiWrap);

    // draw the number of waves
    let wavesNum = document.createElement("div");
    let currentLevel = towerGame.level;
    wavesNum.setAttribute("class","waveNum");
    wavesNum.innerHTML = `
        <p> WAVE ${towerGame.gameWave+1} / ${levels[currentLevel].enemyWave.length} </p>
    `
    document.querySelector("#ui-wrap").append(wavesNum);

    // draw the player's life
    let playerLife = document.createElement("div");
    playerLife.setAttribute("id","playerLife");
    playerLife.innerHTML = `
        <p> LIFE ${towerGame.life} / ${towerGame.maxLife} </p>
    `
    document.querySelector("#ui-wrap").append(playerLife);
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
  var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*15;
  var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*15;
  towerGame.mapCTX.translate(dx, dy);  
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
    towerGame.copyrightCTX.textAlign = "end";
    towerGame.copyrightCTX.fillText(copyrightText,canvasWidth-20,canvasHight-20);
}

    // Loading Player Info

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
