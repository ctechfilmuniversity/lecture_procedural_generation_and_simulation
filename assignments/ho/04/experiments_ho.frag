/***********************************************************
 * Procedural Function Experiments
 *
 * Author: Jonathan Ho
 * 
 * Implementation based on:
 * Lena Gieseke's implementation of
 * Ebert, David S. Texturing & Modeling a Procedural Approach. San Francisco, Calif.: Morgan Kaufmann, 2003.
 *
 * Date: May 2022
 *
 * Purpose: Prototyping with functions in GLSL
 *
 *********************************************************/ 


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


float BRICK_W = 0.9;  
float BRICK_H = 0.001; 
float MORTAR =  0.04; 

// HELPER FUNCTIONS
// (no need to comment these)


//I'm not sure how these affect the
float getBias(float t, float bias)
{
  return (t / ((((1.0 / bias) - 1.0) * (1.0 - t)) + 1.0));
}

float getGain(float t, float gain)
{
  if(t < 0.5)
    return getBias(t * 2.0, gain) / 2.0;
  else
    return getBias(t * 2.0 - 1.0, 1.0 - gain) / 2.0 + 0.5;
}

void main()
{
    //gl_FragCoord is an input variable that contains the 
    //window relative coordinate (x, y, z, 1/w) values for 
    //the fragment, it is divided by the size of the viewport
    //in pixels, to get the relative position of the fragment
    //within the viewport

    vec2 coord = gl_FragCoord.xy/u_resolution;
    

    // All parameter values between 0..1
    float brick_mortar_w = BRICK_W + MORTAR;
    float brick_mortar_h = BRICK_H + MORTAR;
    float mortar_half_norm_w = (MORTAR * 10.0) / brick_mortar_w * sin(u_time);
    float mortar_half_norm_h = (MORTAR * 10.5) / brick_mortar_h  * sin(u_time);

    // BRICK PATTERN
    // TODO: comment the following steps

    //Here we take the x and y components of the coordinate 
    //vector (relative position of the fragment within the viewport)
    //and divide them by the width of the brick + mortar width and height
    // to get the starting position of the rows
    float x = coord.x / brick_mortar_w;
    float y = coord.y / brick_mortar_h;
    // float x = coord.x;
    // float y = coord.y;

    //Create a row index in the vertical axis
    float y_index = floor(y);
    
    // This section offsets the x axis of each second brick row by 0.5 the width of a brick
    if( mod(y_index, abs(sin(u_time)) * 2.0 ) == 0.0)
    {
        x += 1.0;
    }

    //Here we repeat the bricks over the x and y axis. We use a Floor() function to set the 
    //placement of the mortar in the X axis, and the row index (y_index) to set the row mortar positions
    x -= floor(x * y) * abs(sin(u_time));//* abs(sin(u_time));
    y = y_index * abs(sin(u_time));

    // Simplified versions:
    // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
    // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
    // or
    // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
    // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);


    //smoothstep add a bit of a blur to the brick textures (a gradient on both sides of the line). Changing
    //values in the getBias function can make the edges sharper
    float w = getBias(smoothstep(0.0, mortar_half_norm_w, y), 20.3) - getBias(smoothstep(1.0 - mortar_half_norm_h, 1.0, x), 10.7);
    float h = getBias(smoothstep(0.0, mortar_half_norm_h, x), 20.3) - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, y), 10.7);
    
    //Here we actually create the brick texture by combining the w factor (creates the vertical lines) and the
    // h factor, which creates the horizontal lines
    vec3 color = vec3(w, h, abs(cos(u_time / 5.)));

    //
    // vec3 color = vec4(0.3059, 0.1529, 0.1529, 1.0), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

    //boilerplate line to assign a color value to the built-in gl_FragColor variable
    gl_FragColor = vec4(color, 1.0);
}
