//
//  ofFluid.cpp
//  navier-stokes2
//
//  Created by Tillman on 19.07.22.
//

#include "ofFluidCube.h"
#include <vector>


ofFluidCube::ofFluidCube(int size, int diffusion, int viscosity, float dt){
    int N = size;
    this->size = N;
    
    this->dt = dt;
    this->diff = diffusion;
    this->visc = viscosity;
    
    this->s = s.assign(N*N, 0.0);
    this->density = calloc(N * N * N, sizeof(float));
    
    this->Vx = (size*size);
    this->Vy = calloc(N * N * N, sizeof(float));
    this->Vz = calloc(N * N * N, sizeof(float));
    
    this->Vx0 = calloc(N * N * N, sizeof(float));
    this->Vy0 = calloc(N * N * N, sizeof(float));
    this->Vz0 = calloc(N * N * N, sizeof(float));
    
    return cube;
}
