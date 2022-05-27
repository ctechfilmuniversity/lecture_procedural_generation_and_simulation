#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float CELLSIZE = 0.2; //relative, hence 0..1
vec2 OFFSET = vec2(0.3);

void main()
{

    vec2 coord = gl_FragCoord.xy/u_resolution;

    // 3. Create Cells
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);

    // 1. One Cell, distance to center point
    float d = distance(vec2(x, y), vec2(0.5));
    d *= 2.;
    d -= floor(d);

    float d_inner = distance(vec2(x, y), vec2(0.3));
    d_inner *= 2.;
    d_inner -= floor(d_inner);

    float d_middle = distance(vec2(x,y), vec2(0.4));
    d_middle *= 2.;
    d_middle -= floor(d_middle);

    vec3 color = vec3(1, 0.87, 0.);

    if (d >= d_middle && d < 0.63) {
        color = vec3(0.9216, 0.1608, 0.302);
    } else if (d_middle >= d_inner && d_middle < 0.5) {
        color = vec3(0.5098, 0.8902, 0.2196);
    } 

    gl_FragColor = vec4(color, 1.0);
}