#include "ofFluid.h"

ofFluid::ofFluid(int size, float diffusion, float viscosity, float lengthOftimestep) {
    this->size = size;
    this->lengthOfTimestep = lengthOftimestep;
    this->diffusion = diffusion;
    this->viscosity = viscosity;
    
    this->s.assign(size*size, 0.0);
    this->density.assign(size*size, 0.0);
    
    this->velocityXNew.assign(size*size, 0.0);
    this->velocityYNew.assign(size*size, 0.0);
    
    this->velocityXOld.assign(size*size, 0.0);
    this->velocityYOld.assign(size*size, 0.0);
}

ofFluid::~ofFluid() {
}

void ofFluid::addDensity(int x, int y, float amount) {
    this->density[IX(x, y)] += amount;
}

void ofFluid::addVelocity(int x, int y, float amountX, float amountY) {
    int index = IX(x, y);
    
    this->velocityXNew[index] += amountX;
    this->velocityYNew[index] += amountY;
}

void ofFluid::step() {
    float visc     = this->viscosity;
    float diff     = this->diffusion;
    float dt       = this->lengthOfTimestep;
    
    diffuse(1, this->velocityXOld, this->velocityXNew, this->viscosity, this->lengthOfTimestep, iteration);
    diffuse(2, this->velocityYOld, this->velocityYNew, this->viscosity, this->lengthOfTimestep, iteration);
    
    project(this->velocityXOld, this->velocityYOld, this->velocityXNew, this->velocityYNew, iteration);
    
    advect(1, this->velocityXNew, this->velocityXOld, this->velocityXOld, this->velocityYOld, this->lengthOfTimestep);
    advect(2, this->velocityYNew, this->velocityYOld, this->velocityXOld, this->velocityYOld, this->lengthOfTimestep);
    
    project(this->velocityXNew, this->velocityYNew, this->velocityXOld, this->velocityYOld, iteration);
    
    diffuse(0, this->s, this->density, this->diffusion, this->lengthOfTimestep, iteration);
    advect(0, this->density, this->s, this->velocityXNew, this->velocityYNew, this->lengthOfTimestep);
}

void ofFluid::renderDensity() {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            float x = i * SCALE;
            float y = j * SCALE;
            float d = this->density[IX(i, j)];
            ofSetColor(255, d);
            ofFill();
            ofDrawRectangle(x, y, SCALE, SCALE);
        }
    }
}
