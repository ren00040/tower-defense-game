/*
 * @Date: 2022-01-09 23:23:01
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-09 23:24:24
 * @FilePath: /tower-defense-game/js/temp.js
 */


function _detectEnemy(tower) {
    let bulletSpawner = new BulletSpawner();
    let enemyInRange = [];
    towerGame.enemies.forEach(enemy => {
        let towerPos = [pxToNum(tower.position[0]), pxToNum(tower.position[1])];
        let enemyPos = [enemy.position[0], enemy.position[1]];

        let distance = getDistance(towerPos,enemyPos);
        
        console.log("not find an enemy");

        if(distance <= tower.range) {
            enemyInRange.push(enemy);
            console.log("find an enemy");
            bulletSpawner.startSpawning(tower,enemyInRange);
        }
    });
}