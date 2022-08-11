attribute vec3 aPosition;


varying vec3 vPos;
varying vec3 vNormal;



void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);
  vPos = aPosition;
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
