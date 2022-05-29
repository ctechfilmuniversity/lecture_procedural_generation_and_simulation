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
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


float BRICK_W = 0.3;  
float BRICK_H = 0.1; 
float MORTAR =  0.02; 

// HELPER FUNCTIONS
// (no need to comment these)

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

    //The coordinates of each fragment of screen is being normalized by being devided by the total canvas resultion.
    //After being normalized the coord variable holds values for 0 to 1 for each pixel.
    vec2 coord = gl_FragCoord.xy/u_resolution;
    

    // All parameter values between 0..1
    //BRICK_W and BRICK_H are the brick width and height, MORTAR is the space between and brick_mortar_w and brick_mortar_h are the width and height with the space between.
    //mortar_half_norm_w and mortar_half_norm_h are the normalized values 
    float brick_mortar_w = BRICK_W + MORTAR;
    float brick_mortar_h = BRICK_H + MORTAR;
    float mortar_half_norm_w = (MORTAR * 0.5) / brick_mortar_w;
    float mortar_half_norm_h = (MORTAR * 0.5) / brick_mortar_h;

    // BRICK PATTERN
    // TODO: comment the following steps

    //the current pixel is devided by the brick width and height. That changes the scale of the bricks and makes the brick size of 0.3 30% of the screen width and the same for the height which is 0.1 and therefore 10% of the screen.
    float x = coord.x / brick_mortar_w;
    float y = coord.y / brick_mortar_h;
    // float x = coord.x;
    // float y = coord.y;

    // y-index floors the y value which means its rounded down.
    // if the remainder of the y-index and 2.0 is 0 the x increases by 0.5
    // this leads to the x offset, so every second row is offset by 0.5
    float y_index = floor(y);
    if( mod(y_index, 2.0 ) == 0.0)
    {
        x += 0.5;
    }

    // the x and y are subtracted with their rounded down value which creates the repetition of the bricks.
    x -= floor(x);
    y -= y_index;

    // Simplified versions:
    // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
    // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
    // or
    // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
    // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);


    // The blurry mortar is being calculated and the bricks are left out.
    float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) 
                - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
    float h = getBias(smoothstep(0.0, mortar_half_norm_h, y), 0.8) 
                - getBias(smoothstep(1.0 - mortar_half_norm_h, 1.0, y), 0.5);
    

    //vec3 color = vec3(w * h);

    // 
    // vec3 color = mvec4(0.3059, 0.1529, 0.1529, 1.0)15), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));
     vec3 color = mix(vec3(0.3059, 0.1529, 0.1529), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

    gl_FragColor = vec4(color, 1.0);
}
