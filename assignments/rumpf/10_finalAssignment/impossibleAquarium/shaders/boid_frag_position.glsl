////////////
// based on code found here:https://threejs.org/examples/webgl_gpgpu_birds.html
///////////


uniform float time;
uniform float delta;

void main()	{

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D( texturePosition, uv );


    // Check for Main Cube Size and make sure boids stay within bounds //TODO: Replace 190 with uniform (e.g. a cubeSize variable)
    if ( tmpPos.x > 190. ||  tmpPos.x < -190.){
            tmpPos.x = min(tmpPos.x, 190.);
            tmpPos.x = max(tmpPos.x, -190.);
    }
    if ( tmpPos.y > 190. ||  tmpPos.y < -190.){
            tmpPos.y = min(tmpPos.y, 190.);
            tmpPos.y = max(tmpPos.y, -190.);
    }
    if ( tmpPos.z > 190. ||  tmpPos.z < -190.){
                tmpPos.z = min(tmpPos.z, 190.);
            tmpPos.z = max(tmpPos.z, -190.);
    }


    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D( textureVelocity, uv ).xyz;


    float phase = tmpPos.w;

    phase = mod( ( phase + delta +
        length( velocity.xz ) * delta * 3. +
        max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

    gl_FragColor = vec4( position + velocity * delta * 15. , phase );
}
