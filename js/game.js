/*
 * @Date: 2021-12-16 00:10:31
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-17 14:14:40
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
    startButton.classList.add("menu-button","start-button");
    startButton.style.backgroundImage = "url('assets/images/ui/start01.png')";

    let creditsButton = document.createElement("div");
    creditsButton.setAttribute("id","credits-button");
    creditsButton.classList.add("menu-button","credits-button");
    creditsButton.style.backgroundImage = "url('assets/images/ui/credits01.png')";


    let exitButton = document.createElement("div");
    exitButton.setAttribute("id","exit-button");
    exitButton.classList.add("menu-button","exit-button");
    exitButton.style.backgroundImage = "url('assets/images/ui/exit01.png')";

    // rendering menu buttons
    gameMenu.append(startButton,creditsButton,exitButton);
    console.log("ending draw game menu")

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

    // Loading Scene

    // Loading Player Info

    // Battle Start

    // Battle Fail

        // Game quit

        // Try again

// Show Credit

// Game quit: Jump to thanksAndFeedback.html


gameSetup();