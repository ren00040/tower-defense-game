/*
 * @Date: 2021-12-15 23:49:00
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-01-19 13:07:48
 * @FilePath: /tower-defense-game/js/method.js
 */

// Method.js contains all basics method and constant such as 'Angle and radian conversion' and 'PI'

// Define the PI
var pi = Math.PI;

// change Degress and Radians
const toDegrees = radians => (radians * 180) / Math.PI
const toRadians = degrees => (degrees * Math.PI) / 180

// get distance between two points
function getDistance(start,end) {
    let x = Math.abs(end[0]-start[0]);
    let y = Math.abs(end[1]-start[1]);
    return Math.sqrt(x*x+y*y);
}

function angleBetweenPoints(start,end) {
    let x = end[0] - start[0];
    let y = end[1] - start[1];
    return Math.atan2(y,x)*180/Math.PI
}


// change px to num
function pxToNum(px) {
    return Number(px.replace('px',''));
}

// Define Vector and math
class Vector {
    constructor(...components) {
        this.components = components
    }
    // vector add
    add({ components }) {
        return new Vector(
        ...components.map((component, index) => this.components[index] + component)
        )
    }
    // vector subtract
    subtract({ components }) {
        return new Vector(
        ...components.map((component, index) => this.components[index] - component)
        )
    }
}

// find the index of greatest value in an array
function indexOfMax(arr) {
    return arr.indexOf(Math.max(...arr));
}

// Calculate linear interpolation between two points
function pSub(startPoint,targetPoint) {
    return [targetPoint[0]-startPoint[0],targetPoint[1]-startPoint[1]];
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }