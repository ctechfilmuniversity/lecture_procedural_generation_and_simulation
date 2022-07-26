//
//  ofFluid.hpp
//  navier-stokes2
//
//  Created by Tillman on 19.07.22.
//

#ifndef ofFluid_h
#define ofFluid_h

#include <stdio.h>
#include <vector>
using namespace std;

class ofFluidCube{
    
public:
    
    ofFluidCube(int size, int diffusion, int viscosity, float dt);
    
    ~ofFluidCube();
    
    void fluidCubeAddDensity(int x, int y, int z, float amount);
    void fluidCubeAddVelocity(int x, int y, int z, float amountX, float amountY, float amountZ);
    void step();
    void renderDensity();
  

    int size;
    float dt;
    float diff;
    float visc;
    
    //float *s;
    //float *density;
    
    //float *Vx;
    //float *Vy;
    //float *Vz;

    //float *Vx0;
    //float *Vy0;
    //float *Vz0;
    
    vector<float> s;
    vector<float> density;
    vector<float> Vx;
    vector<float> Vy;
    vector<float> Vz;
    vector<float> Vx0;
    vector<float> Vy0;
    vector<float> Vz0;
    
};


#endif /* ofFluid_h */

