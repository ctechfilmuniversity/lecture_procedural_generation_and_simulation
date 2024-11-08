/***********************************************************
 * Procedural Brick Pattern
 *
 * Author: Lena Gieseke
 * 
 * Implementation based on:
 * Ebert, David S. Texturing & Modeling a Procedural Approach. San Francisco, Calif.: Morgan Kaufmann, 2003.
 *
 * Date: April 2019
 *
 * Purpose: Prototyping a procedural brick pattern
 *
 *********************************************************/ 


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


float BRICK_W = 0.4;  
float BRICK_H = 0.1; 
float MORTAR =  0.02; 

// HELPER FUNCTIONS
// (no need to comment these)


//
float getBias(float t, float bias)
{
  return (t / ((((1.0 / bias) - 2.0) * (1.0 - t)) + 1.0));
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
    float mortar_half_norm_w = (MORTAR * 0.5) / brick_mortar_w;
    float mortar_half_norm_h = (MORTAR * 0.5) / brick_mortar_h;

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
    if( mod(y_index, 2.0 ) == 0.0)
    {
        x += 0.5;
    }

    //Here we repeat the bricks over the x and y axis. We normalize each brick to use a coordinate system between 0 and 1.
    //We use a Floor() function to normalize the coordinate system.
    x -= floor(x);
    y -= y_index;

    // Simplified versions:
    // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
    // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
    // or
    // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
    // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);


    //smoothstep add a bit of a blur to the brick textures (a gradient on both sides of the line). Changing
    //values in the getBias function can make the edges sharper. The subtraction operation combines the functions 
    //defining the left and right edges and top and bottom edges respectively.
    float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
    float h = getBias(smoothstep(0.0, mortar_half_norm_h, y), 0.3) - getBias(smoothstep(1.0 - mortar_half_norm_h, 1.0, y), 0.7);
    
    //Here we actually create the brick texture by combining the w factor (creates the vertical lines) and the
    // h factor, which creates the horizontal lines
    vec3 color = vec3(w * h);

    //
    // vec3 color = vec4(0.3059, 0.1529, 0.1529, 1.0), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

    //boilerplate line to assign a color value to the built-in gl_FragColor variable
    gl_FragColor = vec4(color, 1.0);
}
