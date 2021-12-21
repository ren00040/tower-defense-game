/*
 * @Date: 2021-12-20 23:24:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-21 00:12:09
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
        this.spawnRoot;
        this.spawnInterval = 2; // seconds between two enemies
        this.spawnWave;
        this.waveInterval;
        this.waveDelay = 10; // seconds between two waves
    }
}
        
// Spawn enemies
function enemySpawner() {
    console.clear();
    // Create spawner object and intialize the waves
    var spawner = new EnemySpawner();
    let currentLevel = towerGame.level;
    var waves = levels[currentLevel-1].enemyWave;
    // startSpawning
    waves.forEach(wave => {
        const enemiesAmount = wave[1];
        for (let index = 0; index < enemiesAmount; index++) {
            // Call the spawn method
            console.log("Call spawnEnemy");
            spawnEnemy(index,wave[0]);
            
            // wait spawn interval
            console.log("Call spawnDelay"); 
            spawnDelay(spawner);
        }
    });
}

function spawnDelay(spawner) {
    // TODO: Delay random from 0 - spawnInterval
    console.log("spawn delay "+spawner.spawnInterval+" seconds"); 
}

function spawnEnemy(enemyID,wave) {
    // spawn an enemy
    var enemy = new Eenmy();
    enemy.id = enemyID
    console.log("spawn an enemy "+ enemyID);
    console.log("wave:"+wave);

    towerGame.enemies.push(enemy);
}