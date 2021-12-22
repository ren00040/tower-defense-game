/*
 * @Date: 2021-12-20 23:24:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-21 22:07:40
 * @FilePath: /tower-defense-game/js/enemy.js
 */

class Eenmy {
    constructor(){
        this.id;
        this.name;
        this.speed;
        this.url;
        this.healPoint;
        this.position = [];
        this.wayPointIndex = 0;
        this.step;
        this.wave;
    }
}

class EnemySpawner{
    constructor() {
        this.enemies = [];
        this.spawnInterval = 1000; // seconds between two enemies
        this.spawnWave;
        this.waveInterval;
        this.waveDelay = 3000; // seconds between two waves
    }
}
        
// Spawn enemies
// Setup an spawner
function enemySpawner() {
    console.clear();
    // Create spawner object and intialize the waves
    var spawner = new EnemySpawner();
    let currentLevel = towerGame.level;
    var waves = levels[currentLevel-1].enemyWave;
    spawner.spawnWave = 0;
    // start Spawning the first wave
    startSpawning(spawner,waves[spawner.spawnWave]);
}

// spawn a wave of enemies
// first called from enemySpawner()
// When the last enemy in one wave is dead, Call this function
function startSpawning(spawner,wave) {
    for (let enemyID = 0; enemyID < wave[1]; enemyID++) {
        setTimeout(spawnEnemy,spawner.spawnInterval*(enemyID+1),enemyID,wave);
    }
}

// spawn an enemy
function spawnEnemy(enemyID,wave) {
    var enemy = new Eenmy();
    enemy.id = enemyID
    console.log("spawn an enemy "+ enemyID);
    console.log("wave:"+wave[0]);

    towerGame.enemies.push(enemy);
}