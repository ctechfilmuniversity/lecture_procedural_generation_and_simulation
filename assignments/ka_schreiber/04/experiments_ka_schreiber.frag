#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float CELLSIZE = 0.2; //relative, hence 0..1
vec2 OFFSET = vec2(0.3);

float FREQ = 15.0;
float WIDTH = 0.3;
float HEIGHT = 0.1;

void main()
{

    vec2 coord = gl_FragCoord.xy/u_resolution;

    float x = coord.x / WIDTH;
    float y = coord.y / HEIGHT;

    float y_index = floor(y);
    if( mod(y_index, 2.0 ) == 0.0)
    {
        x += 0.5;
    }

    x -= floor(x);
    y -= y_index;

    float red = (((cos(FREQ * x) + 1.0)) / 4.0) + (((cos(FREQ * y) + 1.0)) / 4.0);
    float green = ((sin(FREQ * x - 0.25 * PI) + 1.0) / 4.0) + ((sin(FREQ * y - 0.25 * PI) + 1.0) / 4.0);
    float blue = ((cos(FREQ * x + 0.75 * PI) + 1.0) / 4.0) + ((cos(FREQ * y + 0.75 * PI) + 1.0) / 4.0);

    gl_FragColor = vec4(red, green, blue, 1.0);
}