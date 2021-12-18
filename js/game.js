/*
 * @Date: 2021-12-16 00:10:31
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-17 23:21:06
 * @FilePath: /tower-defense-game/js/game.js
 */

/*
 * game.js contains the main logic code
 */

// define all global variables
var towerGame; // the global game object
var frame_rate = 30; // game frame rate: refresh all 30 times per second
var gameWarp; // contains the game's window
// TODO: add more variables

// game setup
function gameSetup() {
    //setup game main container
    gameWarp = document.createElement("div");
    gameWarp.setAttribute("id","game-wrap");
    gameWarp.classList.add("game-wrap")

    document.body.append(gameWarp);
    gameWarp.style.display = "block";

    console.log("the game wrap is created");

    // Setup game menu
    let gameMenu = document.createElement("div");
    gameMenu.setAttribute("id","game-menu");
    gameMenu.setAttribute("class","game-menu");

    document.querySelector("#game-wrap").append(gameMenu);
    console.log("the game menu object is created");

    drawGameMenu(); // Draw the game menu buttons

    // Creat the game object
    towerGame = new Game();
}

// Draw the game menu
function drawGameMenu() {
    console.log("starting draw game menu")
    
    // loading background-image
    gameWarp.style.backgroundImage = "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')";
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

    let menuButton = document.querySelectorAll(".menu-button"); //select all menu-buttons
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
                    start();
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
    console.log("game exit")
}

// Show Credits Page
function credits() {
    console.log("Credits");
}

// Game object from setup()
class Game {
    constructor(){
        this.level = 1; // Game starts from the frist level
        this.enemies = [];
        this.towers = [];
        this.bullets = []
        this.gold = 0;
    }
}

// Game start
function start() {
    console.log("game start");
}
    // Loading Scene

    // Loading Player Info

    // Battle Start

    // Battle Fail

        // Game quit

        // Try again

// Show Credit

// Game quit: Jump to thanksAndFeedback.html


gameSetup();