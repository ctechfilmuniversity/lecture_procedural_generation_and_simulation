#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float CELLSIZE = 0.2; //relative, hence 0..1
vec2 OFFSET = vec2(0.3);
void main()
{
    vec2 coord = (gl_FragCoord.xy/u_resolution);
    // 3. Create Cells
    // Get into one cell
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;
    x -= floor(x);
    y -= floor(y);


    float pct = abs(sin(x+y+u_time));

    vec3 color = mix(vec3(0.9, .0, 0.8), vec3(1., 1., .4), pct);
    gl_FragColor = vec4(color, 1.0);
}