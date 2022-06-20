#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float CELLSIZE = 0.2;
vec2 OFFSET = vec2(0.3);

float timeSin (float value, float range){
    return clamp(cos(u_time), 0.0, range);
    
}



void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //CELLSIZE -= clamp((CELLSIZE + sin(u_time / 5.0)), 0.4, 0.7);

    float x = st.x / CELLSIZE;
    float y = st.y / CELLSIZE;

    // modulate the x,y value representations of gl_FragCoord to create geometric movement
    // How do I get a linear wave of lines.. No oscillation?
    x = abs(mod(x, sin(u_time)));
    y = abs(mod(x, sin(u_time)));
  

    // center the horizonal line movement
    float xDist = distance(x, 0.5);
    float yDist = distance(y, 0.5);
    

    // center the circles
    float d = distance(st, vec2(0.5));
    d *= 5.0;
  
    
    float xTime = abs(sin(u_time)) + (d + PI);
    float yTime = mix((abs(sin(u_time)) + x), (abs(sin(u_time)) + xDist), 0.5);
    float zebra = sin(xDist);

    vec3 colorA = vec3(zebra, xDist, d);


    vec3 colorB = vec3(d, d, 1.0);

    vec3 finalColor = mix(colorA, colorB, 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
}

