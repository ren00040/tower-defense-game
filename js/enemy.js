/*
 * @Date: 2021-12-20 23:24:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-19 00:26:30
 * @FilePath: /tower-defense-game/js/enemy.js
 */

class Eenmy {
    constructor(){
        this.id;
        this.name;
        this.speed;
        this.image = new Image();
        this.healPoint = 0;
        this.position;
        this.root;
        this.wayPointIndex = 0;
        this.stepIndex = 0;
        this.wave;
        this.animaLoop = 0;
        this.animaInterval = 0;
        this.angle;
        this.step = 0;
        this.angle;
        this.size;
        this.award = 0;
    }

    decreaseHp(bullet) {
        console.log(bullet);
        let minDamage = bullet.minDamage;
        let maxDamage = bullet.maxDamage;
        let hitPoint = randomIntFromInterval(minDamage, maxDamage);
        this.healPoint -= hitPoint;
        if(this.healPoint<=0) {
            this.enemyDead();
            bullet.remove();
        }
    }

    enemyDead() {
        let index = towerGame.enemies.indexOf(this);
        towerGame.enemies.splice(index,1);
        towerGame.increaseGold(this);
    }
}

class EnemySpawner{
    constructor() {
        this.enemies = [];
        this.spawnInterval = 1000; // milliseconds between two enemies
        this.spawnWave;
        this.waveInterval;
        this.waveDelay = 3000; // milliseconds between two waves
    }
}
        
// Spawn enemies
// Setup an spawner
function enemySpawner(waveNum) {
    // Create spawner object and intialize the waves
    var spawner = new EnemySpawner();
    let currentLevel = towerGame.level;
    var waves = levels[currentLevel-1].enemyWave;
    spawner.spawnWave = waveNum;
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
    console.log(towerGame.enemies);
}

// spawn an enemy
// TODO: Auto change enemy's root and image base on stage and enmey name
function spawnEnemy(enemyID,wave) {
    var enemy = new Eenmy();
    enemy.id = enemyID;

    // Pay Attention: Use Deep Clone to Copy Array
    enemy.position = JSON.parse(
        JSON.stringify(levels[currentLevel].waypath[0])
    )

    // set enemy's style
    enemy.image = new Image();
    enemy.image.src = "assets/enemies/fox.png";
    enemy.size = 32;
    enemy.healPoint = 100;
    enemy.award = 5;
    enemy.speed = 3; // set enemy's speed;

    // Put the new enemy into towerGame.enemies
    towerGame.enemies.push(enemy);
}