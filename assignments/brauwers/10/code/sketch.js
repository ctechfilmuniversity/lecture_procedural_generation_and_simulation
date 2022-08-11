"use strict";

var shade, mode, pMode, timer, staticTimer, time, tv, pattern, tvEffect;

function preload() {
    shade = loadShader("shader.vert", "patterns.frag");
}

function setup() {
    pixelDensity(1);
    createCanvas(900, 900, WEBGL);
    //shader.setUniform("u_frameCount", frameCount);
    shader(shade);
    timer = millis();
    time = 0;
    mode = 0;
    pMode = 0;
    staticTimer = 500;

}

function draw() {
    shade.setUniform("u_resolution", [900, 900]);
    shade.setUniform("u_time", (millis() / 1000) - time);
    shade.setUniform("u_mouse", [mouseX, mouseY]);
    shade.setUniform("mode", mode);

    quad(-1, -1, 1, -1, 1, 1, -1, 1);


    if (mode == 0 && millis() - timer >= staticTimer) {

        if (pMode == 9) {
            pMode = 0;

        }

        mode = pMode + 1;
        timer = millis();
    } else if (mode == 1 && millis() - timer >= 10000) {
        modeSwitch()
    } else if (mode == 2 && millis() - timer >= 5000) {
        modeSwitch()
    } else if (mode == 3 && millis() - timer >= 500) {
        modeSwitch()
    } else if (mode == 4 && millis() - timer >= 5000) {
        modeSwitch()
    } else if (mode == 5 && millis() - timer >= 15000) {
        modeSwitch()
    } else if (mode == 6 && millis() - timer >= 16000) {
        modeSwitch()
    } else if (mode == 7 && millis() - timer >= 5000) {
        modeSwitch()
    } else if (mode == 8 && millis() - timer >= 500) {
        modeSwitch()
    } else if (mode == 9 && millis() - timer >= 500) {
        modeSwitch()
    }


}

function modeSwitch() {
    time = millis() / 1000;
    console.log(millis() / 1000 - time);
    pMode = mode;
    mode = 0;
    timer = millis();
}

function keyPressed() {
    if (key == '0') {
        mode = 0;
    } else if (key == '1') {
        mode = 1;
    } else if (key == '2') {
        mode = 2;
    } else if (key == '3') {
        mode = 3;
    } else if (key == '4') {
        mode = 4;
    } else if (key == '5') {
        mode = 5;
    } else if (key == '6') {
        mode = 6;
    } else if (key == '7') {
        mode = 7;
    }
}