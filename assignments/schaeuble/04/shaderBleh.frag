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

    // 2. Ridges
    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;

    x -= floor(x);
    y -= floor(y);

    float x_map = (x - 0.5) * 2.0;
    float y_map = (y - 0.5) * 2.0;

    float d = distance(vec2(abs(x_map), abs(y_map)), OFFSET);
    d *= 8.0;
    d -= floor(d) * cos(u_time);

    vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(0.35, 0.2, 0.5), sin(d));
    gl_FragColor = vec4(color, 1.0);
}