/***********************************************************
 * Procedural Brick Pattern
 *
 * Author: Tim Rumpf
 * 
 * Implementation based on:
 * 
 *
 * Date: 20. May 2022
 *
 * Purpose: Experimenting with functions in fragmentshaders
 *
 *********************************************************/ 


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.1415926535897932384626433832795

float frequencyX = 20.;
float frequencyY = 100.;

// HELPER FUNCTIONS
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
    //map fragCoords to pixelresolution of canvas
    vec2 coord = gl_FragCoord.xy/u_resolution;
    
 
// LEAF/FEATHER
  // hairs
    float hairX = coord.x * 2. - 1.;
    float hairY = coord.y * 2.;
    float hair = abs(sin(((abs(hairX) - abs(hairY))/ 2.0) *PI *frequencyY)); 
    //invert
    hair = 1. - hair;

  // shape
    // polar coordinates inspired by bookofshaders.com
    vec2 pos = vec2(0.5)-coord;
    float a = atan(pos.y +0.5,pos.x*3.);
    float r = length(pos)*5.5;;
    
    // found a similar formula here: https://mathhelpforum.com/threads/using-polar-coordinates-for-leaf-design.199913/
    float f = (1.2- sqrt(abs(cos(a))) + sin(a));
    vec3 color = vec3( 1.-smoothstep(f,f+0.5,r) );

// FREESTYLE ADDONS
    color = color * hair;
    float horGradients = abs(sin((coord.x)  *PI *frequencyX)); 
    color =  color *vec3(horGradients);

    vec3 startColor = vec3(0.1569, 0.4706, 0.0);
    vec3 endColor = vec3(1.0, 1.0, 0.0);
    color = color * mix(startColor, endColor, smoothstep(0.2, 0.8, coord.y));
    
    gl_FragColor = vec4(color, 1.0);
}
