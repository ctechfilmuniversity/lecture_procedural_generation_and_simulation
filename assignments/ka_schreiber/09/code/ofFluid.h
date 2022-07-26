#pragma once

#include "ofMain.h"
#include "fluidHelpers.h"

class ofFluid {
public:
    ofFluid(int size, float diffusion, float viscosity, float lengthOftimestep);
    ~ofFluid();
    
    void addDensity(int x, int y, float amount);
    void addVelocity(int x, int y, float amountX, float amountY);
    void step();
    void renderDensity();
    
    int size;
    float lengthOfTimestep;
    float diffusion;
    float viscosity;
    
    std::vector<float> s;
    std::vector<float> density;
    
    std::vector<float> velocityXNew;
    std::vector<float> velocityYNew;
    
    std::vector<float> velocityXOld;
    std::vector<float> velocityYOld;
};
