/*
 * @Date: 2021-12-16 22:38:00
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-04 22:31:58
 * @FilePath: /tower-defense-game/js/data.js
 */

// data.js contains all game datas

var currentLevel = 1;

const level1 = {
    id: 1,
    gold: 100,
    life: 20,
    enemyWave: [[1,10],
                [2,15],
                [3,20]],

    waypath: [ [325,0],
               [330,180],
               [280,220],
               [240,240],
               [170,290],
               [170,370],
               [220,410],
               [380,410],
               [480,430],
               [600,350],
               [750,350], ],
    
    settlePlace: [[120,200],
                  [200,300],
                  [300,400]],
    
    availableTower: [1,2],
}

const level2 = {
    id: 2,
    gold: 100,
    life: 10,
    enemyWave: [[1,10],
                [2,15],
                [3,20]],

    waypath: [ [325,0],
               [323,180],
               [280,220],
               [240,240],
               [170,290],
               [170,370],
               [220,410],
               [380,410],
               [480,430],
               [600,350],
               [750,350], ],

    settlePlace: [[120,200],
                  [200,300],
                  [300,400]],

    availableTower: [1,2,3],
}

const levels = [level1,level2];