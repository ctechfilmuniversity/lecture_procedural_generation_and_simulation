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

   // This step creates one brick that will be repeated further on.
   // brick_mortar_w - width (includes mortar)
    float x = coord.x / brick_mortar_w;
   //brick_mortar_h - height (includes mortar)
    float y = coord.y / brick_mortar_h;
    //float x = coord.x;
    //float y = coord.y;

    // Moves every second line in a half width offset
    float y_index = floor(y);
    if( mod(y_index, 2.0 ) == 0.0)
    {
        x += 0.5;
    }

    // Multiplies everything
    x -= floor(x);
    y -= y_index;

    // Simplified versions:
    //float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
    //float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
    // or
    //float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
    //float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);


    //Here we get the colors.
    //Smooth step helps to have a smooth gradient
    //w - the vertical mortar
    float w = getBias(smoothstep(0.0, mortar_half_norm_w, x), 0.3) 
                - getBias(smoothstep(1.0 - mortar_half_norm_w, 1.0, x), 0.7);
    //h - the vertical mortar 
    float h = getBias(smoothstep(0.0, mortar_half_norm_h, y), 0.3) 
                - getBias(smoothstep(1.0 - mortar_half_norm_h, 1.0, y), 0.7);
    

    vec3 color = vec3(w * h);

    // vec3 color = mvec4(0.3059, 0.1529, 0.1529, 1.0)15), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));

    //I suppose it attributes color to everything
    gl_FragColor = vec4(color, 8.0);
}
