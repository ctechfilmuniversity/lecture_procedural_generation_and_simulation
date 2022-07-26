////////////
// mainly code found here: https://dev.to/jessesolomon/creating-an-impossible-box-with-glsl-three-js-3mi5
// by Jesse Solomon
///////////

in vec3 worldPosition;
in vec3 worldNormal;

uniform int face;
uniform vec3 color;
varying vec4 vColor;
varying float z;

// Define the corners of the box, we don't need to define the whole cube, just the 2D area
//const vec2 corners[4] = vec2[](vec2(0.5, 0.5), vec2(-0.5, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5));
const vec2 corners[4] = vec2[](vec2(200, 200), vec2(-200,200), vec2(-200, -200), vec2(200, -200));

// Line intersection code ported from Python
// Source: https://stackoverflow.com/questions/3838329/how-can-i-check-if-two-segments-intersect#answer-9997374
bool ccw(vec2 A, vec2 B, vec2 C) {
    return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);
}

bool intersect(vec2 A, vec2 B, vec2 C, vec2 D) {
    return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D);
}

void main() {


	// Define a line from the fragnent's position (A) to the camera (B)
	vec2 a = worldPosition.xz;
	vec2 b = cameraPosition.xz;

	// Get the second point to define the face. Example: (Face 0 = Corners 0 & 1; Face 3 = Corners 3 & 0)
	int next = int(mod(float(face + 1), 4.0));

	// Define a line at the given face
	vec2 c = corners[face];
	vec2 d = corners[next];


	// If the defined lines do NOT intersect, then discard the fragment
	if (!intersect(a, b, c, d)) {
		discard;
	}


	// Fake colors for now
    float z2 = 0.2 + ( 1000. - z ) / 1000. * vColor.x;
    gl_FragColor = vec4( vColor.xyz, 1. );

}