/*
 * @Date: 2021-12-16 00:10:31
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-27 01:22:36
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
// TODO: add more global variables

// game setup
function gameSetup() {
    // Creat the game object
    towerGame = new Game();

    //setup game main container
    gameWrap = document.createElement("div");
    gameWrap.setAttribute("id","game-wrap");
    gameWrap.classList.add("game-wrap")

    document.body.append(gameWrap);
    gameWrap.style.display = "block";
    gameWrap.style.width = canvasWidth+"px";
    gameWrap.style.height = canvasHight+"px";

    console.log("the game wrap is created");
    
    // Setup game canvas
    intializeCanvas();

    // Setup game menu
    let gameMenu = document.createElement("div");
    gameMenu.setAttribute("id","game-menu");
    gameMenu.setAttribute("class","game-menu");

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
    // get CTX(map)
    towerGame.mapCTX = mapCanvas.getContext("2d") // Create a CanvasRenderingContext 2D Object
    mapCanvas.width = canvasWidth;
    mapCanvas.height = canvasHight;

    /*
    * Initialize the battle canvas
    * Get CTX(battle canvas) and set canvas's width and height
    */
    const towerCanvas = document.querySelector("#towerCanvas");
    // get CTX(battle canvas)
    towerGame.towerCTX = towerCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    towerCanvas.width = canvasWidth;
    towerCanvas.height = canvasHight
    /*
    * Initialize the enemy canvas
    * Get CTX(enemy canvas) and set canvas's width and height
    */
    const enemyCanvas = document.querySelector("#enemisCanvas");
    // get CTX(enemy canvas)
    towerGame.enemyCTX = enemyCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    enemyCanvas.width = canvasWidth;
    enemyCanvas.height = canvasHight;

    /*
    * Initialize the bullets canvas
    * Get CTX(bullets canvas) and set canvas's width and height
    */
    const bulletCanvas = document.querySelector("#bulletsCanvas");
    // get CTX(enemy canvas)
    towerGame.enemyCTX = bulletCanvas.getContext('2d'); // Create a CanvasRenderingContext 2D Object
    bulletCanvas.width = canvasWidth;
    bulletCanvas.height = canvasHight;
}

// Draw the game menu
function drawGameMenu() {
    console.log("starting draw game menu")
    
    // loading background-image
    // gameWrap.style.backgroundImage = "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')";
    towerGame.mapSprite.src = "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    towerGame.mapSprite.onload = function(){
        towerGame.mapCTX.drawImage(towerGame.mapSprite, 0, 0, mapCanvas.width, mapCanvas.height);
    }

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
        element.style.backgroundImage = "url('/assets/images/ui/"+element.getAttribute('name')+"1.png')";
        // hover effect
        element.onmouseover = function () {
            element.style.backgroundImage = "url('/assets/images/ui/"+element.getAttribute('name')+"2.png')";
        };
        element.onmouseout = function () {
            element.style.backgroundImage = "url('/assets/images/ui/"+element.getAttribute('name')+"1.png')";
        };
        // click event
        element.addEventListener('click',function(){
            element.style.backgroundImage = "url('/assets/images/ui/"+element.getAttribute('name')+"3.png')";
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
    console.log("ending draw game menu")
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
        this.enemies = []; 
        this.towers = [];
        this.bullets = []
        this.gold = 0;
        this.life = 0;
        this.mapCTX;
        this.towerCTX;
        this.enemyCTX;
        this.bulletCTX;
        this.mapSprite = new Image(); //the game background image
    }

    update() { //from gameUpdate()
        // update enemies
        towerGame.renderEnemies();
        // update towers
        // update bullets
        // update UI
    }

    renderEnemies() {
        // clear enemy canvas
        towerGame.enemyCTX.clearRect(0,0,canvasWidth,canvasHight);

        towerGame.updateEnemiesPosition();
        towerGame.drawEnemies();
    }

    updateEnemiesPosition() {
        towerGame.enemies.forEach(enemy => {
            enemy.speed = 1; // set enemy's speed;
            towerGame.calculateEnemyPositon(enemy);
        });
    }

    calculateEnemyPositon(enemy) {
        let nextWayPointX = levels[currentLevel].waypath[enemy.wayPointIndex+1][0];
        let nextWayPointY = levels[currentLevel].waypath[enemy.wayPointIndex+1][1];

        let target = new Vector(nextWayPointX,nextWayPointY);

        let enemyPos = new Vector(enemy.position[0],enemy.position[1]);

        // the direction from enemy to next way point
        let angle = enemyPos.angleBetween(target);

        // the step per frame
        let offsetX = Math.cos(angle)*enemy.speed;
        let offsetY = Math.sin(angle)*enemy.speed;

        enemy.position[0] += offsetX;
        enemy.position[1] += offsetY;
    }

    drawEnemies() {
        console.log("drawEnemies");
        towerGame.enemies.forEach(enemy => {
            let enemyImg = enemy.image;
            // Do the enemy walking animation
            // TODO: change the direction of enemy based on the waypath
            towerGame.enemyCTX.drawImage(enemyImg,enemy.animaLoop*32,0,32,32,enemy.position[0],enemy.position[1],32,32,);

            // more enemy's speed more animation fast
            enemy.animaInterval++;
            if (enemy.animaInterval >= (10/enemy.speed)) {
                enemy.animaLoop++;
                enemy.animaInterval = 0;
            }
            if(enemy.animaLoop >= 4) enemy.animaLoop = 0;
        });
    }




    // render one enemy
    // drawEnemy(key,enemy) {
    //     towerGame.drawEnemyAnimate(key,enemy);
    // }

    // drawEnemyAnimate(key,enemy) {
    //     let enemyImg = enemy.image;
    //     towerGame.calNewPosition(key,enemy);
        
    //     // Do the enemy walking animation
    //     // TODO: change the direction of enemy based on the waypath
    //     towerGame.enemyCTX.drawImage(enemyImg,enemy.animaLoop*32,0,32,32,towerGame.enemies[key].position[0],towerGame.enemies[enemy.id].position[1],32,32,);
    //     towerGame.enemyCTX.fillText(enemy.id,towerGame.enemies[enemy.id].position[0],towerGame.enemies[enemy.id].position[1]+32);
    

    //     // more enemy's speed more animation fast
    //     enemy.animaInterval++;
    //     if (enemy.animaInterval >= (10/enemy.speed)) {
    //         enemy.animaLoop++;
    //         enemy.animaInterval = 0;
    //     }
    //     if(enemy.animaLoop >= 4) enemy.animaLoop = 0;
    // }

    // calNewPosition(enemy) {
        
    //     let currentLevel = towerGame.level - 1;
    //     let nextWayPointX = levels[currentLevel].waypath[enemy.wayPointIndex+1][0];
    //     let nextWayPointY = levels[currentLevel].waypath[enemy.wayPointIndex+1][1];

    //     let target = new Vector(nextWayPointX,nextWayPointY);
    //     let enemyPos = new Vector(towerGame.enemies[enemy.id].position[0], towerGame.enemies[enemy.id].position[1]);
    //     console.log(enemyPos.components[0],enemyPos.components[1]);

    //     // the direction from enemy to next way point
    //     let angle = enemyPos.angleBetween(target);

    //     // the step per frame
    //     let offsetX = Math.cos(angle)*enemy.speed;
    //     let offsetY = Math.sin(angle)*enemy.speed;

    //     // enemy.position[0] += offsetX;
    //     // enemy.position[1] += offsetY;

    //     towerGame.enemies[enemy.id].position[0] += offsetX;
    //     towerGame.enemies[enemy.id].position[1] += offsetY;

    //     console.log(enemy.id,towerGame.enemies[enemy.id].position);
    // }


    renderTower() {
        
    }

    renderBullets() {

    }

    updateUI() {
        
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
    enemySpawner();
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
    towerGame.mapCTX.clearRect(0,0,mapCanvas.width,mapCanvas.height);
    // loading battle map base on current towerGame.level
    towerGame.mapSprite.src = "/assets/images/levels/level"+towerGame.level+".png";
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
        settlePoint.src = "/assets/images/towers/settle.png";
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
   }

   console.log("battle map loading complete");
}

function drawUI() { // from start()
    console.log("TODO: Draw UI");

}

    // Loading Player Info

    // Battle Start
function gameUpdate() { //from loadingLevel()
    towerGame.update();
    window.setTimeout(gameUpdate, 1000/frame_rate); // come back here every interval; 24 times per second
}

    // Battle Fail

        // Game quit

        // Try again

// Show Credit

// Game quit: Jump to thanksAndFeedback.html


gameSetup();
