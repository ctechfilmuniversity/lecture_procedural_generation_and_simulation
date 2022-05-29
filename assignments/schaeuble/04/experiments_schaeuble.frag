#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float CELLSIZE = 0.4;
vec2 OFFSET = vec2(0.3);

float timeSin (float value, float range){
    return clamp(cos(u_time), 0.0, range);
    
}



void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    //CELLSIZE -= clamp((CELLSIZE + sin(u_time / 5.0)), 0.4, 0.7);

    float x = st.x / CELLSIZE;
    float y = st.y / CELLSIZE;

    x -= abs(cos(u_time) + 0.5);
    y -= abs(cos(u_time) + 0.5);


    float d = distance(st, vec2(x, y));
    d *= 8.0;
    d -= floor(d);


    float ax = min(cos(-u_time) + (d * PI), 0.1);
    float ay = cos(u_time / 2.0) + (d * PI);
    float aComb = sin((abs( ax ) * fract( ay )));

    vec3 colorA = vec3(aComb, min(aComb * ay, 0.5), 0.5);

    float bx = min(cos(-u_time) + (x * PI), 0.5);
    float by = cos(u_time / 2.0) + (y * PI);
    float bComb = sin((abs( bx ) * fract( by )));

    vec3 colorB = vec3(bx + x, by + y, 0.3);

    vec3 finalColor = mix(colorA, colorB, 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
}

