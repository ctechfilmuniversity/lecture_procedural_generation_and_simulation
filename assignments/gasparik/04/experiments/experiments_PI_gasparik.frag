//Named this PI version, because tried to replace every value with a variation of PI

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
uniform float u_time;

float m=mod(u_time,floor(u_time));
float t=abs(sin(u_time));

float CELLSIZE=PI*.4;
vec2 OFFSET=vec2(PI*.1);

mat2 rotate2d(float angle){
    return mat2(cos(angle),-(sin(angle)),
    sin(angle),cos(angle));
}

void main()
{
    
    vec2 coord=gl_FragCoord.xy/u_resolution;
    
    float rotM=mod(u_time,360.);
    coord*=rotate2d(rotM*.5)*sin(6.*coord)*.2/coord;
    
    float x=coord.x/CELLSIZE*PI/1.3;
    float y=coord.y/CELLSIZE;
    
    x-=floor(x);
    y-=floor(y);
    
    float x_remap=(x-.5)*PI;
    float y_remap=(y-.5)*PI;
    
    // vec2 translate=vec2(cos(u_time),sin(u_time));
    // x_remap+=translate.x;
    // y_remap+=translate.y;
    
    float d=distance(vec2(abs(x_remap),abs(y_remap)),OFFSET);
    d*=PI*6.;
    d-=floor(d-m);
    
    vec3 color=mix(vec3(.1725,.5804,.6745),vec3(.2078,.0275,.1137),d-m);
    gl_FragColor=vec4(color,1.);
}