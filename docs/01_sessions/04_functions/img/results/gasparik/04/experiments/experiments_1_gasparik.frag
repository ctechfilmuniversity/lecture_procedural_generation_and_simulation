//After hours of trial and error, I wanted to leave the creative part for another date,
//but then I remembered, how interesting results came out from using coord values instead of simple floats.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float m=mod(u_time,floor(u_time));
float t=abs(sin(u_time));

float CELLSIZE=.6;
vec2 OFFSET=vec2(.666);

mat2 rotate2d(float angle){
    return mat2(cos(angle),-(sin(angle)),
    sin(angle),cos(angle));
}

void main()
{
    
    vec2 coord=gl_FragCoord.xy/u_resolution;
    
    float rotM=mod(u_time,360.);
    coord*=rotate2d(rotM*.5)*sin(6.*coord)*.2/coord;
    
    float x=coord.x/CELLSIZE;
    float y=coord.y/CELLSIZE;
    
    x-=floor(x);
    y-=floor(y);
    
    float x_remap=(x-.5)*2.;
    float y_remap=(y-.5)*2.;
    
    // vec2 translate=vec2(cos(u_time),sin(u_time));
    // x_remap+=translate.x;
    // y_remap+=translate.y;
    
    float d=distance(vec2(abs(x_remap),abs(y_remap)),OFFSET);
    d*=8.;
    d-=floor(d-m);
    
    vec3 color=mix(vec3(.1804,0.,.4157),vec3(.5137,.702,.3098),d-m);
    gl_FragColor=vec4(color,1.);
}