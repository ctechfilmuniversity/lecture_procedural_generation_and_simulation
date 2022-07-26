////////////
// based on code found here:https://threejs.org/examples/webgl_gpgpu_birds.html
///////////


uniform float time;
uniform float testing;
uniform float delta; // about 0.016
uniform float separationDistance; 
uniform float alignmentDistance; 
uniform float cohesionDistance; 
uniform float freedomFactor;

const float width = resolution.x;
const float height = resolution.y;

const float PI = 3.141592653589793;
const float PI_2 = PI * 2.0;
// const float VISION = PI * 0.55;

float zoneRadius = 40.0;
float zoneRadiusSquared = 1600.0;

float separationThresh = 0.45;
float alignmentThresh = 0.65;

const float UPPER_BOUNDS = BOUNDS;
const float LOWER_BOUNDS = -UPPER_BOUNDS;

const float SPEED_LIMIT = 9.0;

float rand( vec2 co ){
    return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
}

void main() {

    zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
    separationThresh = separationDistance / zoneRadius;
    alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
    zoneRadiusSquared = zoneRadius * zoneRadius;


    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 boidPosition, boidVelocity;

    vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
    vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

    float dist;
    vec3 dir; // direction
    float distSquared;

    float f;
    float percent;

    vec3 velocity = selfVelocity;

    float limit = SPEED_LIMIT;



    if (testing == 0.0) {}
    if ( rand( uv + time ) < freedomFactor ) {}


    // Attract flocks to the center
    vec3 central = vec3( 0., 0., 0. );
    dir = selfPosition - central;
    dist = length( dir );

    dir.y *= 0.5;
    velocity -= normalize( dir ) * delta * 5.;

    for ( float y = 0.0; y < height; y++ ) {
        for ( float x = 0.0; x < width; x++ ) {

            vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
            boidPosition = texture2D( texturePosition, ref ).xyz;

            dir = boidPosition - selfPosition;
            dist = length( dir );

            if ( dist < 0.0001 ) continue;

            distSquared = dist * dist;

            if ( distSquared > zoneRadiusSquared ) continue;

            percent = distSquared / zoneRadiusSquared;

            if ( percent < separationThresh ) { // low

                // Separation
                f = ( separationThresh / percent - 1.0 ) * delta;
                velocity -= normalize( dir ) * f;

            } else if ( percent < alignmentThresh ) { // high

                // Alignment
                float threshDelta = alignmentThresh - separationThresh;
                float adjustedPercent = ( percent - separationThresh ) / threshDelta;

                boidVelocity = texture2D( textureVelocity, ref ).xyz;

                f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
                velocity += normalize( boidVelocity ) * f;

            } else {

                // Attraction / Cohesion
                float threshDelta = 1.0 - alignmentThresh;
                float adjustedPercent;
                if( threshDelta == 0. ) adjustedPercent = 1.;
                else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

                f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;


                // Make Boids bounce off the bounds of the cube
                if ( boidPosition.x > 180. ||  boidPosition.x < -180.){
                    dir.x = -dir.x;
                    f = 1.;
                }
                 if ( boidPosition.y > 180. ||  boidPosition.y < -180.){
                    dir.y = -dir.y;
                    f = 1.;
                }
                 if ( boidPosition.z > 180. ||  boidPosition.z < -180.){
                    dir.z = -dir.z;
                    f = 1.;
                }

                velocity += normalize( dir ) * f;

            }

        }

    }



    // this make tends to fly around than down or up
   //if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

    // Speed Limits
    if ( length( velocity ) > limit ) {
        velocity = normalize( velocity ) * limit;
    }

    gl_FragColor = vec4( velocity, 1.0 );

}

