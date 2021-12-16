/*
 * @Date: 2021-12-15 23:49:00
 * @LastEditors: Ke Ren
 * @LastEditTime: 2021-12-15 23:54:18
 * @FilePath: /tower-defense-game/js/method.js
 */

// Method.js contains all basics method and constant such as 'Angle and radian conversion' and 'PI'

// Define the PI
var pi = Math.PI;

// degrees to radians
function degreesToRadians(degrees)
{
  return degrees * (pi/180);
}

// radians to degrees
function radiansToDegrees(radians) {
    return radians*180/pi;
}

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

// Calculate linear interpolation between two points
function pSub(startPoint,targetPoint) {
    return [targetPoint[0]-startPoint[0],targetPoint[1]-startPoint[1]];
  }