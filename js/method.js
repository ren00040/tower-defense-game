/*
 * @Date: 2021-12-15 23:49:00
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-26 01:05:35
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
    let x = Math.abs(start[0]-end[0]);
    let y = Math.abs(start[1]-end[1]);
    return Math.sqrt(x*x+y*y);
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

    // vector length
    length() {
        return Math.hypot(...this.components)
    }

    // Dot Product
    dotProduct({ components }) {
        return components.reduce((acc, component, index) => acc + component * this.components[index], 0)
    }

    // Angle between two points
    angleBetween({components}) {
        return Math.atan(...components);
    }
      
}