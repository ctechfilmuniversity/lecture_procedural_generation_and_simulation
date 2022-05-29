#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float CELLSIZE = 0.2; 
// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}



void main()
{
    vec2 coord = (gl_FragCoord.xy/u_resolution);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = gl_FragCoord.xy/u_mouse.xy;
    float x = noise(coord) / CELLSIZE;
    float y = noise(coord) / CELLSIZE;
    

    float pct = abs(cos(x+u_time));
    float pct2 = abs(cos(y+u_time));

    vec3 color = mix(vec3(0.9, .0, mouse.y), vec3(mouse.x, 1., .4), pct*pct2);
    gl_FragColor = vec4(color, 1.0);
}