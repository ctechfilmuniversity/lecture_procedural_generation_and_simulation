//
//  ofFluid.cpp
//  navier-stokes
//
//  Created by Tillman on 19.07.22.
//

#include <stdio.h>
#include "ofFluid.h"

ofFluid::ofFluid(float dt, float diffusion, float viscosity){
    
}

void ofFluid::step(){
    diffuse(1, Vx0, Vx, visc, dt);
    diffuse(2, Vy0, Vy, visc, dt);

    project(Vx0, Vy0, Vx, Vy);

    advect(1, Vx, Vx0, Vx0, Vy0, dt);
    advect(2, Vy, Vy0, Vx0, Vy0, dt);

    project(Vx, Vy, Vx0, Vy0);

    diffuse(0, s, density, diff, dt);
    advect(0, density, s, Vx, Vy, dt);
}

int ofFluid::constrain(int x, int y, int z){
    // need to rewrite the processing function "constrain"
}

int ofFluid::IX(int x, int y){
    x = constrain(x, 0, N-1);
    y = constrain(y, 0, N-1);
    return x + (y * N);
}

void ofFluid::addDensity(int x, int y, float amount){
    int index = IX(x, y);
    density{index} += amount;
}
