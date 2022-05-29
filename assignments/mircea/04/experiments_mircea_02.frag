//experiment based on https://github.com/lewislepton/shadertutorialseries/blob/master/024_circleColorPulse/024_circleColorPulse.frag
//modified colors and shape

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main(){
  vec2 coord = (gl_FragCoord.xy / u_resolution);
  float color = 1.0;

  color += sin(coord.x * 20. + sin(u_time + coord.y * 30.0 + cos(coord.x * 13.0 + u_time * 33.0))) * 23.5;

  gl_FragColor = vec4(vec3(23,  coord.x, color), 3.0);
}
