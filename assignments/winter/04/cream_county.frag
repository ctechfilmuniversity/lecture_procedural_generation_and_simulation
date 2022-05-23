precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

//Returns a pseudo-random number that is always the same for the same given number.
float random(in float value){
    return fract(sin(value)*1000000.0);
}

//A very basic one dimensional noise function.
float basic_noise(in float value){
    float integer = floor(value);
    float fraction = fract(value);

    return mix(random(integer), random(integer +1.0), smoothstep(0., 1.0, fraction));
}

//The perlin noise approach used for just stacking sine-waves.
float perlin_waves(in vec2 xy, in float frequency, in float amplitude, in float animation_value){
    float y;
    float lacunarity = 1.;
    
    //for some reason I can't get it to work with a const int
    #define OCTAVES_WAVES 5
    for (int i = 0; i < OCTAVES_WAVES; i++){
        y+= sin(xy.x*frequency*lacunarity+animation_value*random(amplitude))*amplitude;
        lacunarity += 0.5;
        amplitude -= amplitude /4.0;
    }

    return y;
}

//One dimennsional perlin-noise.
float perlin_mountains(in vec2 xy, in float frequency, in float amplitude){
    float y;
    float lacunarity = 2.0;
    float gain = 0.5;

    #define OCTAVES_MOUNTAINS 6
    for (int i = 0; i < OCTAVES_MOUNTAINS; i++) {
        y += amplitude * basic_noise(frequency*xy.x);
        frequency *= lacunarity;
        amplitude *= gain;
    }  

    return y;    
}

//Draws a cricle that is always round regardless of the window resolution.
float circle(in vec2 xy, in vec2 location, in float radius){
    xy.x *=u_resolution.x;
    xy.y *=u_resolution.y;

    location.x  *= u_resolution.x;
    location.y *= u_resolution.y;
    return step(distance(xy,location), radius);
}

void main() {
    vec2 xy = gl_FragCoord.xy/u_resolution.xy;

    //Paints the sky gradient.
    vec3 color = vec3(0.5098, 0.4118, 0.3961);
    float sky_high = smoothstep(0.6, 1.0, xy.y);
    float sky_low = smoothstep(1.0, 0.6, xy.y);
    color =vec3(sky_high)*vec3(0.4902, 0.7686, 0.7725)+vec3(sky_low)*vec3(0.9529, 0.7608, 0.7255);

    //Paints the sun(or moon?).
    float sun_moon = circle(xy, vec2(0.5, 0.87 ), 70.0);
    color = mix(color, vec3(0.9529, 0.7608, 0.7255), smoothstep(xy.y, xy.y+0.5, sun_moon)*smoothstep(xy.x, xy.x+0.5, sun_moon));
    
    //Animates the foreground.
    xy.x+=u_time*0.05;

    //Sets up the mountains. The mountain parameters as well as the smoothing settings have no particular meaning.
    float mountain0 = perlin_mountains(xy, 2.0, .45);
    float mountain1 = perlin_mountains(xy-10.0, 2.0, .4);
    float mountain2 = perlin_mountains(xy-20.0, 2.0, 0.475);
    float mountain3 = perlin_mountains(xy-30.0, 2.0, .5);
    
    color = mix (color, vec3(0.949,0.929,0.863), smoothstep(xy.y, xy.y+0.005, mountain3));
    color = mix (color, vec3(0.7725, 0.5059, 0.5059), smoothstep(xy.y, xy.y+0.005, mountain3-0.001));
    color = mix (color,  vec3(0.949,0.929,0.863), smoothstep(xy.y, xy.y+0.005, mountain1));
    color = mix (color,  vec3(0.6824, 0.7961, 0.6627), smoothstep(xy.y, xy.y+0.005, mountain1-0.001)-smoothstep(xy.y, xy.y+0.45, mountain0-0.3));
    color = mix (color, vec3(0.949,0.929,0.863), smoothstep(xy.y, xy.y+0.005, mountain2-0.002)-smoothstep(xy.y, xy.y+0.007, mountain2));
    color = mix (color, vec3(0.949,0.929,0.863), smoothstep(xy.y, xy.y+0.005, mountain2-0.002)-smoothstep(xy.y, xy.y+0.65, mountain0+0.25));

    //Sets up the waves.
    float wave0 = perlin_waves(xy, 5.0, 4.0, u_time*7.0)*0.005;
    float wave1 = perlin_waves(xy, 10.0, 3.0, (u_time*-1.0)*5.0)*0.0025;
    float wave2 = perlin_waves(xy, 15.0, 3.0, u_time*4.0)*0.00125;

    color = mix (color, vec3(0.3059, 0.3569, 0.5608), smoothstep(xy.y, xy.y+0.005, wave0+0.2));
    color = mix (color, vec3(0.4902, 0.7686, 0.7725), smoothstep(xy.y, xy.y+0.005, wave1+0.3)-smoothstep(xy.y, xy.y+0.45, wave0+0.3));
    color = mix (color, vec3(0.9529, 0.7608, 0.7255), smoothstep(xy.y, xy.y+0.005, wave2+0.335)-smoothstep(xy.y, xy.y+0.3, wave1+0.35));

    gl_FragColor = vec4(color,1.0);
}