//
//  ofFluid.h
//  navier-stokes
//
//  Created by Tillman on 19.07.22.
//

#pragma once

#ifndef ofFluid_h
#define ofFluid_h
#include <vector>
using namespace std;

class ofFluid {
    
public:
    ofFluid(float dt, float diffusion, float viscosity);
    
    ~ofFluid();
    
    //Functions
    void step();
    void addDensity(int x, int y, float amount);
    void addVelocity(int x, int y, float amountX, float amountY);
    void renderD();
    void renderV();
    void fadeD();
    int constrain(int x, int y, int z);
    int IX(int x, int y);
    
private:
    
    int size;
    int N;
    float dt;
    float diff;
    float visc;


    
    vector<float> s;
    vector<float> density;
    vector<float> Vx;
    vector<float> Vy;
    vector<float> Vx0;
    vector<float> Vy0;
    

};



#endif /* ofFluid_h */
