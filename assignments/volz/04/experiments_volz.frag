#version 300 es 
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 fragColor;


// return value is positive if point is outside,
// negative if p is inside of the circle
float sdf_circle(vec2 position, vec2 p, float radius)
{

    return length(p - position) - radius;
}

float smin(float a, float b, float k)
{
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * (1.0 / 4.0);
}

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    
    vec3 xyz = gl_FragCoord.xyz / vec3(u_resolution.xy, 1.0);
    float radius1 = (sin(u_time) + 1.1) * 0.2 ;
    float radius2 = (sin(u_time) + 1.1) * 0.3;

    vec2 position1 = vec2(radius1 * cos(u_time*2.13), radius1 * sin(u_time*1.96));
    vec2 position2 = sin(u_time * 0.31) * vec2(0.2, 0.0);
    float circle1 = sdf_circle(position1, p, radius1);
    float circle2 = sdf_circle(position2, p, radius2);

    float d = smin(circle1, circle2, 0.1);

    vec3 color = d < 0. ? vec3(xyz) : vec3(1.);
    fragColor = vec4(color, 1.0);
}
