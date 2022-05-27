#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float CELLSIZE = 0.3333333; //relative, hence 0..1
vec2 OFFSET = vec2(0.);

void main()
{

    vec2 coord = gl_FragCoord.xy/u_resolution;

    
    // 5a. Remapping the range to -1..1
    // 5b. and taking the absolute values

    float x = coord.x / CELLSIZE;
    float y = coord.y / CELLSIZE;

    float x_index = floor(x);
    if( mod(x_index, 2.0 ) == 0.0)
    {
        y += 0.5;
    }

    //before:
    // x += floor(x);
    // y += floor(y);

    //the big mess up:
    x += -floor(x);
    y -= floor(y);

    // Modify value range from 0..1 to -1..1
    float x_remap = (x - 0.5) * 2.0;
    float y_remap = (y - 0.5) * 2.0;
    
    float d = distance(vec2(abs(x_remap), abs(y_remap)), OFFSET);
    d *= 1.795;
    d -= floor(d);

    vec3 color = mix(vec3(0.2, 0.0392, 1.0), vec3(0.8196, 0.0588, 0.0588), d);
    gl_FragColor = vec4(color, 1.0);
}