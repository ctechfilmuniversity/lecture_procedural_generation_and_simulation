//
//  fluidHelpers.cpp
//  fluidSimulation
//
//  Created by Katja Schreiber on 17.07.22.
//

#include "fluidHelpers.h"

int N = 128;
int SCALE = 4;
int iteration = 4;

int IX(int x, int y) {
    x = ofClamp(x, 0, N - 1);
    y = ofClamp(y, 0, N - 1);
    return x + y * N;
}

void diffuse (int b, std::vector<float>& x, std::vector<float>& x0, float diffusion, float lengthOfTimestep, int iter)
{
    float a = lengthOfTimestep * diffusion * (N - 2) * (N - 2);
    linearSolve(b, x, x0, a, 1 + 6 * a, iter);
}

void linearSolve(int b, std::vector<float>& x, std::vector<float>& x0, float a, float c, int iter)
{
    float cRecip = 1.0 / c;
    for (int k = 0; k < iter; k++) {
        for (int j = 1; j < N - 1; j++) {
            for (int i = 1; i < N - 1; i++) {
                x[IX(i, j)] =
                    (x0[IX(i, j)]
                        + a*(    x[IX(i+1, j)]
                                +x[IX(i-1, j)]
                                +x[IX(i  , j+1)]
                                +x[IX(i  , j-1)]
                       )) * cRecip;
            }
        }
    }
    setBoundaries(b, x);
}

void setBoundaries(int b, std::vector<float>& x)
{
    for(int i = 1; i < N - 1; i++) {
        x[IX(0, i)] = b == 1 ? -x[IX(1, i)] : x[IX(1, i)];
        x[IX(N-1, i)] = b == 1 ? -x[IX(N-1, i)] : x[IX(N-1, i)];
    }

    for (int i = 1; i< N - 1; i++) {
      x[IX(i, 0)] = b == 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
      x[IX(i, N-1)] = b == 2 ? -x[IX(i, N-1)] : x[IX(i, N-1)];
    }

    x[IX(0, 0)]       = 0.5f * (x[IX(1, 0)] + x[IX(0, 1)]);
    x[IX(0, N-1)]     = 0.5f * (x[IX(1, N-1)] + x[IX(0, N-1)]);
    x[IX(N-1, 0)]     = 0.5f * (x[IX(N-2, 0)] + x[IX(N-1, 1)]);
    x[IX(N-1, N-1)]   = 0.5f * (x[IX(N-2, N-1)] + x[IX(N-1, N-2)]);
}

void project(std::vector<float>& velocX, std::vector<float>& velocY, std::vector<float>& p, std::vector<float>& div, int iter)
{
    for (int j = 1; j < N - 1; j++) {
        for (int i = 1; i < N - 1; i++) {
            div[IX(i, j)] = -0.5f*(
                     velocX[IX(i+1, j)]
                    -velocX[IX(i-1, j)]
                    +velocY[IX(i  , j+1)]
                    -velocY[IX(i  , j-1)]
                )/N;
            p[IX(i, j)] = 0;
        }
    }
    setBoundaries(0, div);
    setBoundaries(0, p);
    linearSolve(0, p, div, 1, 6, iter);
    
    for (int j = 1; j < N - 1; j++) {
        for (int i = 1; i < N - 1; i++) {
            velocX[IX(i, j)] -= 0.5f * (  p[IX(i+1, j)]
                                            - p[IX(i-1, j)]) * N;
            velocY[IX(i, j)] -= 0.5f * (  p[IX(i, j+1)]
                                            - p[IX(i, j-1)]) * N;
        }
    }
    
    setBoundaries(1, velocX);
    setBoundaries(2, velocY);
}

void advect(int b, std::vector<float>& d, std::vector<float>& d0,  std::vector<float>& velocX, std::vector<float>& velocY, float dt)
{
    float i0, i1, j0, j1;
    
    float dtx = dt * (N - 2);
    float dty = dt * (N - 2);
    
    float s0, s1, t0, t1;
    float tmp1, tmp2, x, y;
    
    float Nfloat = N;
    float ifloat, jfloat;
    int i, j;
    
    for(j = 1, jfloat = 1; j < N - 1; j++, jfloat++) {
        for(i = 1, ifloat = 1; i < N - 1; i++, ifloat++) {
            tmp1 = dtx * velocX[IX(i, j)];
            tmp2 = dty * velocY[IX(i, j)];
            x    = ifloat - tmp1;
            y    = jfloat - tmp2;
            
            if(x < 0.5f) x = 0.5f;
            if(x > Nfloat + 0.5f) x = Nfloat + 0.5f;
            i0 = floorf(x);
            i1 = i0 + 1.0f;
            if(y < 0.5f) y = 0.5f;
            if(y > Nfloat + 0.5f) y = Nfloat + 0.5f;
            j0 = floorf(y);
            j1 = j0 + 1.0f;
            
            s1 = x - i0;
            s0 = 1.0f - s1;
            t1 = y - j0;
            t0 = 1.0f - t1;
            
            int i0i = i0;
            int i1i = i1;
            int j0i = j0;
            int j1i = j1;
            
            //TODO: Look at paper how it is done
            d[IX(i, j)] =
                s0 * ( t0 * d0[IX(i0i, j0i)] + t1 * d0[IX(i0i, j1i)] ) +
                s1 * ( t0 * d0[IX(i1i, j0i)] + t1 * d0[IX(i1i, j1i)] );
        }
    }
    setBoundaries(b, d);
}
