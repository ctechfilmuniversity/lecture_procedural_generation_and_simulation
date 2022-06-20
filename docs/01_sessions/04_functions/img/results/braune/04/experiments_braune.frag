#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main(){

    vec2 coord = gl_FragCoord.xy/u_resolution;
    float dist = 0.0;
    float val = 0.0;

    dist = pow(distance(coord,vec2(0.5)),u_time/19.0);
    dist = smoothstep(0.0, 0.9 ,dist);
    val = sin(60.0*dist)*0.8;

    //val += 0.5;
    

    float pct = abs(sin(u_time));

    vec3 color2 = vec3(0.82,1.0,1.0);
    vec3 color = mix(vec3(val), color2, 0.9);

	gl_FragColor = vec4( color, 1.0);
}