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

void ofFluid::setNoiseDensity(Boolean isNoise) {
    if (isNoise) {
        float xoff = 0.0;
        for (int x = 0; x < size; x++) {
            float yoff = 0.0;
            for (int y = 0; y < size; y++) {
                density[IX(x, y)] = ofNoise(xoff, yoff) * 255;
                yoff += inc;
            }
            xoff += inc;
        }
        return;
    }
    this->density.assign(size*size, 0.0);
}

void ofFluid::resetFluid() {
    this->s.assign(size*size, 0.0);
    this->density.assign(size*size, 0.0);
    
    this->velocityXNew.assign(size*size, 0.0);
    this->velocityYNew.assign(size*size, 0.0);
    
    this->velocityXOld.assign(size*size, 0.0);
    this->velocityYOld.assign(size*size, 0.0);
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

void ofFluid::renderDensity(Boolean isColorGradient, Boolean isFlowField) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            float x = i * SCALE;
            float y = j * SCALE;
            float d = this->density[IX(i, j)];
            
            float red = 255.0;
            float green = 255.0;
            float blue = 255.0;
            
            if (isColorGradient) {
                float freq = 0.01;
                red = ofMap(cos(freq * x), -1, 1, 0, 255);
                green = ofMap(sin(freq * x - 0.25 * PI), -1, 1, 0, 255 );
                blue = ofMap(cos(freq * x + 0.75 * PI), -1, 1, 0, 255 );
            }
        
            ofSetColor(red, green, blue, d);
            ofFill();
            
            if (isFlowField) {
                ofSetColor(red, green, blue);
                ofDrawLine((x + SCALE) + SCALE * cos(d*0.01*PI), y + SCALE * sin(d*0.01*PI), x + SCALE, y);
                continue;
            }
            ofDrawRectangle(x, y, SCALE, SCALE);
        }
    }
}

void ofFluid::fadeDensity(float fade) {
    for (int i = 0; i < this->density.size(); i++) {
        float d = density[i];
        density[i] = ofClamp(d-fade, 0, 255);
    }
}
