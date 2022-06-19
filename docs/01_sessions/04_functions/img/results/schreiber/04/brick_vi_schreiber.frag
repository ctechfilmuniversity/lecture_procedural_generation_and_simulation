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

    vec2 coord = gl_FragCoord.xy/u_resolution;
    

    // All parameter values between 0..1
    float brick_mortar_w = BRICK_W + MORTAR;
    float brick_mortar_h = BRICK_H + MORTAR;
    float mortar_half_norm_w = (MORTAR * 0.5) / brick_mortar_w;
    float mortar_half_norm_h = (MORTAR * 0.5) / brick_mortar_h;

    // BRICK PATTERN
    // TODO: comment the following steps

    // we devide the current x coord by the brick+mortar_w to define the "Cell size" of this pattern, after the length of brick+mortar_w it will be repeated
    float x = coord.x / brick_mortar_w;
    // same goes for y, pattern repeats after brick+mortar_h 
    float y = coord.y / brick_mortar_h;
    // float x = coord.x;
    // float y = coord.y;

    // creating the half width offset of the bricks 
    // flooring y creates an index for the "row" the current pixel is in
    float y_index = floor(y);
    // only if the y_index is evenly divisable we add an offset to the x
    if( mod(y_index, 2.0 ) == 0.0)
    {
        //x gets an added 0.5 offset for the "bricky" pattern
        x += 0.5;
    }

    // ... this somehow makes the pattern repeat. It seems to be a value reset?
    // we reset x to zero by removing all whole numbers
    x = x - floor(x);
    // we reset y to zero by removing all whole numbers (which already have because of line 66!)
    y = y - y_index;

    // Simplified versions:
    // here, we tell the shader when change the pixel color value (black and white only, so interpolating 2 float values is sufficient). 
    // a good ol' step "transition":
    // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
    // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
    // or
    // a little gradient which smoothly interpolates the 2 values:
    // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
    // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);


    // a much more finetuned smooth gradient version (the transition is way less linear):
    float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) 
                 - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
    float h = getBias(smoothstep(0.0, mortar_half_norm_h, y), 0.3) 
                 - getBias(smoothstep(1.0 - mortar_half_norm_h, 1.0, y), 0.7);
    

    // vec3 color = vec3(w * h);

    // this line doesn't work - the compiler (?) said: mvec4 is not a function, dimension mismatch (vec4 vs vec3, maybe?) and a syntax error.
    // vec3 color = mvec4(0.3059, 0.1529, 0.1529, 1.0)15), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

    // I fixed it !! B) i think changing the dimensions of the vectors helped:
    vec3 color = mix(vec3(0.3059, 0.1529, 0.1529), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

    //applying our colors to the global / uniform variable:
    gl_FragColor = vec4(color, 1.0);
}
