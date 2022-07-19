//
//  fluidHelpers.hpp
//  fluidSimulation
//
//  Created by Katja Schreiber on 17.07.22.
//

#ifndef fluidHelpers_h
#define fluidHelpers_h

#include <stdio.h>
#include "ofMain.h"

int IX(int x, int y);
void diffuse(int b, std::vector<float>& x, std::vector<float>& x0, float diffusion, float lengthOfTimestep, int iter);
void linearSolve(int b, std::vector<float>& x, std::vector<float>& x0, float a, float c, int iter);
void setBoundaries(int b, std::vector<float>& x);
void project(std::vector<float>& velocX, std::vector<float>& velocY, std::vector<float>& p, std::vector<float>& div, int iter);
void advect(int b, std::vector<float>& d, std::vector<float>& d0,  std::vector<float>& velocX, std::vector<float>& velocY, float dt);

extern int N;
extern int iteration;
extern int SCALE;

#endif /* fluidHelpers_hpp */
