#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float CELLSIZE = 0.95;
vec2 OFFSET = vec2(0.3);

float timeSin (float value, float range){
    return clamp(cos(u_time), 0.0, range);
    
}



void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //CELLSIZE -= clamp((CELLSIZE + sin(u_time / 5.0)), 0.4, 0.7);

    float x = st.x / CELLSIZE;
    float y = st.y / CELLSIZE;

    x = abs(mod(x, cos(u_time)));
    y = abs(mod(y, cos(u_time)));


    float d = distance(st, vec2(0.5));
    d *= 200.0;
    d -= floor(x);


    float yTime = min(cos(u_time) + (x), 0.9);
    float xTime = sin(u_time / 2.0) + (d * PI);
    float zebra = sin((abs( xTime ) * fract( yTime )));

    vec3 colorA = vec3(zebra, min(zebra * yTime, 0.3), 0.5);



    vec3 colorB = vec3(x, y, 0.3);

    vec3 finalColor = mix(colorA, colorB, 0.0);

    gl_FragColor = vec4(finalColor, 1.0);
}

