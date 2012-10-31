/*
 * Copyright (c) 2012, Intel Corporation
 * File revision: 31 October 2012
 * Please see http://software.intel.com/html5/license/samples 
 * and the included README.md file for license terms and conditions.
 */
 
var accelID=null;
var frequency = 100;
var FILTERFACTOR = 0.3;
// We keep previous values to use filter
var previous_parameters = {
    x: 0,
    y: 0, 
    z: 0
    };

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

        var options = { frequency: frequency };
        // set accelerometer watcher
        accelID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        return;
}

function onSuccess(acceleration) {
       var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var valuex= (x * FILTERFACTOR) + (previous_parameters.x * (1.0 - FILTERFACTOR));
        previous_parameters.x = valuex;
        var valuey= (y * FILTERFACTOR) + (previous_parameters.y * (1.0 - FILTERFACTOR));
        previous_parameters.y = valuey;
        var valuez = (z * FILTERFACTOR) + (previous_parameters.z * (1.0 - FILTERFACTOR));
        previous_parameters.z = valuez;

        var direction = {
            x: valuex,
            y: valuey,
            z: valuez
        };
        // main step
        setBubble(direction);
}

function stopWatch() {
        if (accelID) {
            navigator.accelerometer.clearWatch(accelID);
            accelID = null;
        }
}

function onError() {
        alert('Error happened with accelerometer!!!');
}
