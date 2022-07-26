////////////
// mainly code found here: https://dev.to/jessesolomon/creating-an-impossible-box-with-glsl-three-js-3mi5
// by Jesse Solomon
///////////

in vec3 worldPosition;

void main() {
	// Check if the fragment is far enough along any axis //TODO: Replace hard coded size with uniform (e.g. cubeSize variable)
	bool x_edge = abs(worldPosition.x) > 210.0;
	bool y_edge = abs(worldPosition.y) > 199.0;
	bool z_edge = abs(worldPosition.z) > 210.0;

	// Check that the fragment is at the edge of at least two axis'
	if (!y_edge && !z_edge) {
		discard;
	}

	if (!y_edge && !x_edge) {
		discard;
	}

	gl_FragColor = vec4(0.3647, 0.3647, 0.3647, 1.0);
}