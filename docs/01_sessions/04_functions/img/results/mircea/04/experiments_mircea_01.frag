//experiment based on https://github.com/lewislepton/shadertutorialseries/blob/master/024_circleColorPulse/024_circleColorPulse.frag
//basically mapped it to the mouse
//and changed the oscilations


#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main(){
  vec2 coord = gl_FragCoord.xy / u_mouse;
  vec3 color =- vec3(221.0, 3.949, 0.04);
  vec2 translate = vec2(-0.65);
  coord += translate;

  color.r += abs(50.1 + length(coord) - 15.6 * abs(sin(u_time * 51.9 / 4.0)));
  color.g += abs(1.1 + length(coord) - 33.6 * abs(sin(u_time * 10.6 / 4.0)));
  color.b += abs(0.21 + length(coord) - 30.6 * abs(sin(u_time * 10.3 / 9.0)));

  gl_FragColor = vec4(0.1 / color, 12.0);
}
