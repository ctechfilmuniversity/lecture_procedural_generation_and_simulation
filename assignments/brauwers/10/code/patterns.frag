#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float u_time;
uniform int mode;

//int mode = 1;

float Thickness = 1.;

float a = 1.0;

float patternsize =1.0;

vec2 OFFSET = vec2(0.3);

vec3 blue = vec3(0.0,0.6,0.6);
vec3 white = vec3(1.0,0.9,0.8);
vec3 yellow = vec3(1.0,0.7,0.2);
vec3 red = vec3(0.8,0.3,0.3);

const float e = 2.7182818284590452353602874713527;
//mode 5
#define N 12
#define depth 1.0
#define rate 0.8
#define huecenter 60.

#define grid 5

mat2 rotate(float angle){
    return mat2 (sin(angle), -cos(angle), sin(angle), cos(angle));
}
vec4 noise(vec2 st)
{
    //https://www.shadertoy.com/view/4lfSWl

    float G = e + ((u_time+1.) * 50.1);
    vec2 r = (G * sin(G * st.xy));
    return vec4(fract(r.x * r.y * (1.0 + st.x)));
}

vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y);
}

vec3 hash3( vec2 p )
{
    vec3 q = vec3( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)), 
				   dot(p,vec2(419.2,371.9)) );
	return fract(sin(q)*43758.5453);
}

float voronoise( in vec2 p, float u, float v )
{
	float k = 1.0+10.0*pow(1.0-v,7.0);

    vec2 i = floor(p);
    vec2 f = fract(p);
    
	vec2 a = vec2(0.0,0.0);
    for( int y=-2; y<=2; y++ )
    for( int x=-2; x<=2; x++ )
    {
        vec2  g = vec2( x, y );
		vec3  o = hash3( i + g )*vec3(u,u,1.0);
		vec2  d = g - f + o.xy;
		float w = pow( 1.0-smoothstep(0.0,1.414,length(d)), k );
		a += vec2(o.z*w,w);
    }
	
    return a.x/a.y;
}


float mergeBlobs(float d1, float d2, float d3,float d4, float d5, float d6)
{
    float k = 22.0;
    return -log(exp(-k*d1)+exp(-k*d2)+exp(-k*d3)+exp(-k*d4)+exp(-k*d5)+exp(-k*d6))/k;
}

vec2 randomizePos(vec2 amplitude, float fTime)
{
    return amplitude*vec2(sin(fTime*1.00)+cos(fTime*0.51),
                          sin(fTime*0.71)+cos(fTime*0.43));
}

vec3 computeColor(float d1, float d2, float d3,float d4, float d5, float d6)
{
    float blobDist = mergeBlobs(d1,d2,d3,d4,d5,d6);
    float k = 7.0; //k=Color blend distance.
    float w1 = exp(k*(blobDist-d1)); //R Contribution : highest value when no blending occurs
    float w2 = exp(k*(blobDist-d2)); //G Contribution
    float w3 = exp(k*(blobDist-d3)); //b Contribution
    float w4 = exp(k*(blobDist-d4)); //b Contribution
    float w5 = exp(k*(blobDist-d5)); //b Contribution
    
    //Color weighting & normalization
    vec3 pixColor = vec3(w1,w2,w3)/(w1+w2+w3);
    
    //2.5 = lightness adjustment.
    return 2.5*pixColor;
}

float distanceToBlobs(vec2 p, out vec3 color)
{
    //Blob movement range.
    float mvtAmplitude = 0.15;
    
    //Randomized positions.
    vec2 blob1pos = vec2(-0.250, -0.020)+randomizePos(vec2(0.35,0.45)*mvtAmplitude,u_time*1.50);
	vec2 blob2pos = vec2( 0.050,  0.100)+randomizePos(vec2(0.60,0.10)*mvtAmplitude,u_time*1.23);
	vec2 blob3pos = vec2( 0.150, -0.100)+randomizePos(vec2(0.70,0.35)*mvtAmplitude,u_time*1.86);
    vec2 blob4pos = vec2(0.150, -0.20)+randomizePos(vec2(0.55,0.35)*mvtAmplitude,u_time*1.50);
	vec2 blob5pos = vec2( -0.150,  .300)+randomizePos(vec2(0.50,0.55)*mvtAmplitude,u_time*2.3);
	vec2 blob6pos = vec2( -0.150, -0.200)+randomizePos(vec2(0.70,0.35)*mvtAmplitude,u_time*1.86);
    
    //Distance from pixel "p" to each blobs
	float d1 = length(p-blob1pos);
    float d2 = length(p-blob2pos);
    float d3 = length(p-blob3pos);
    float d4 = length(p-blob4pos);
    float d5 = length(p-blob5pos);
    float d6 = length(p-blob6pos);
    
    //Merge distances, return the distorted distance field to the closest blob.
    float distTotBlob = mergeBlobs(d1,d2,d3,d4,d5,d6);
    
    //Compute color, approximating the contribution of each one of the 3 blobs.
    color = computeColor(d1,d2,d3,d4,d5,d6);
        
    return abs(distTotBlob);
}
float plot(vec2 st, float pct){
    return smoothstep (pct-0.02, pct, st.y)-smoothstep(pct,pct+0.02,st.y);
}
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}
//source line function: https://www.shadertoy.com/view/Ndt3Dl
float line(float p, float mi, float mx) {
    return step(mi, p) * (1.0-step(mx, p));
}
float drawLine( vec2 p1, vec2 p2) {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  float a = abs(distance(p1, st));
  float b = abs(distance(p2, st));
  float c = abs(distance(p1, p2));

  if ( a >= c || b >=  c ) return 0.0;

  float p = (a + b + c) * 0.5;

  // median to (p1, p2) vector
  float h = 2. / c * sqrt( p * ( p - a) * ( p - b) * ( p - c));

  return mix(1.0, 0.0, smoothstep(0.5 * Thickness, 1.5 * Thickness, h));
}
float movement(float speed, float direction){
    return map(-1.4+abs(sin(u_time*speed)),0.0,1.0,direction*.2,direction*0.4);
}
float grow(float speed){
    return map(abs(sin(u_time/speed)),.0,1.0,0.1,0.6);
}

float random (vec2 st) 
{
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123+u_time);
}
float kynd03( float height, float x, float power)
{
    return height + pow(abs(sin(PI*x)), power);
}

float randomMovement(){
    return random(vec2(-1,1));
}
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st2 = st;
    float timer = u_time;
     float gridRows=float(grid);
        float gridCols=gridRows;
        float satFactor=0.5;
        int pixCol=int(st.x*gridCols);
        int pixRow=int(st.y*gridRows);
        vec2 mov = vec2(0.0);
        int normRows = int(st.x*gridRows);
         int normCols = int(st.y*gridCols);
         float speed = 1.0;
         vec2 mouse = u_mouse.xy/u_resolution.xy;
        if( normRows < 1 && normCols < 1){
            mov = vec2(-1.,1.);
            speed = 0.9;
        } else if(normRows < 1 && normCols < 2){
            mov = vec2(1.,-1.);
            speed = 1.3;
        } else if(normRows < 1 && normCols < 3){
            mov = vec2(1.,0.);
        } else if(normRows < 1 && normCols < 4){
            mov = vec2(0.,1.);
             speed = 2.;
        } else if(normRows < 1 && normCols < 5){
            mov = vec2(1.,0.);
            speed = 0.5;
        }else if(normRows < 2 && normCols < 1){
            mov = vec2(1.,0.);
        }else if(normRows < 2 && normCols < 2){
            mov = vec2(1.,1.);
        } else if(normRows < 2 && normCols < 3){
            mov = vec2(0.,-1.);
        } else if(normRows < 2 && normCols < 4){
            mov = vec2(1.,-1.);
            speed = 2.;
        } else if(normRows < 2 && normCols < 5){
            mov = vec2(1.,1.);
        } else if( normRows < 3 && normCols < 1){
            mov = vec2(-1.,1.);
             speed = 2.;
        } else if(normRows < 3 && normCols < 2){
            mov = vec2(1.,-1.);
        } else if(normRows < 3 && normCols < 3){
            mov = vec2(1.,0.);
        } else if(normRows < 3 && normCols < 4){
            mov = vec2(0.,1.);
        } else if(normRows < 3 && normCols < 5){
            mov = vec2(1.,0.);
        }else if(normRows < 4 && normCols < 1){
            mov = vec2(1.,0.);
        }else if(normRows < 4 && normCols < 2){
            mov = vec2(-1.,1.);
        } else if(normRows < 4 && normCols < 3){
            mov = vec2(-1.,0.);
             speed = 2.;
        } else if(normRows < 4 && normCols < 4){
            mov = vec2(1.,1.);
        } else if(normRows < 4 && normCols < 5){
            mov = vec2(-1.,0.);
        }else if(normRows < 5 && normCols < 1){
            mov = vec2(1.,-1.);
             speed = 2.;
        }else if(normRows < 5 && normCols < 2){
            mov = vec2(0.,1.);
        } else if(normRows < 5 && normCols < 3){
            mov = vec2(0.,1.);
        } else if(normRows < 5 && normCols < 4){
            mov = vec2(1.,0.);
             speed = 2.;
        } else if(normRows < 5 && normCols < 5){
            mov = vec2(-1.,1.);
        }

     

        if(mode== 0){
            patternsize = 1.;

        } else if(mode== 1){
            patternsize = gridRows;
        } else  if(mode== 2){
            patternsize = 5.;
        } else if (mode == 3){
            patternsize = 51.;
        } else if (mode == 4){
            patternsize = 2.;
        } else if (mode == 4){
            patternsize = 2.;
        }else if (mode == 5){
            patternsize = 6.;
        }else if (mode == 6){
            patternsize = 5.;
        }else if (mode == 7){
            patternsize = 7.;
        }
    
    st.x *= patternsize;      
    st.y *= patternsize; 
    st = fract(st); 

    
    vec3 color = vec3(0.0);
    if(mode == 0){

        vec4 col = noise(st);
        color = vec3(col.r,col.g,col.b);

    }


    if(mode== 2){
        vec2 gv = fract(st);
        float off = 0.5 - 0.5 * sin(u_time);

       
        //https://www.shadertoy.com/view/XdyBWh
        // Time varying pixel color
        vec3 col = satFactor + satFactor*cos(8.+vec3(pixCol,pixRow,pixCol)+vec3(0,2,4));
        

        color =mix(color,vec3(1.),circle(vec2(st.x+movement(1.,mov.x)*0.7,st.y+movement(speed, mov.y)),0.3));
        color = mix(color,vec3(1.0, 1.0, 1.0), circle(vec2(st.x,st.y),0.6) );
        color = mix(color,col, circle(vec2(st.x+movement(speed,mov.x)*0.7,st.y+movement(speed, mov.y)),0.2) );
        color = mix(color, vec3(0.), circle(vec2(st.x+movement(speed,mov.x)*0.7,st.y+movement(speed, mov.y)),0.1));

    } else if (mode ==1){
       //
        vec2 pos = vec2(0.5)-st;

        float r = length(pos)*2.;
        float a = atan(pos.y,pos.x);

        float f = abs(cos(a*19.)*sin(a*u_time))*.8+.1;
        //f = abs(cos(a*3.));
        //f = abs(cos(a*2.5))+.5+.3;
        //f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
        //f = smoothstep(-.5,1.,cos(a*10.))*.2+.5;


        color = vec3(1.-smoothstep(f,f+0.02,r))*vec3(0.9, st2.x*st2.y*2., st2.xy*st2.y);
    } else if (mode == 3){
         //this part is just an unfinished sketch.
        vec2 gv = fract(st);
        float off = 0.5 - 0.5 * sin(u_time);
        off *= 0.4;
        off = 0.287;

        color = mix(color, white, line(gv.x - gv.y, off + -1., off + -.9));
        color = mix(color, yellow, line(gv.x - gv.y, off + -.87, off + -.7));
        color = mix(color, blue, line(gv.x - gv.y, off + -.67, off + -.6));
        color = mix(color, blue, line(gv.x - gv.y, .9 - off, 1. - off));
        color = mix(color, white, line(gv.x - gv.y, .7 - off, .87 - off));
        color = mix(color, blue, line(gv.x - gv.y, .6 - off, .67 - off));
   
    } else if (mode == 4){
    st = (gl_FragCoord.xy-u_resolution.xy*0.5) / u_resolution.xx;
    
    vec3 blobColor;
    
    //Distance from this pixel to the blob (range ~= [0-0.5] )
    float dist = distanceToBlobs(st,blobColor);
    
    float stripeHz = 20.0;//BW Stripe frequency : 20 Hz frequency (cycles/image unit)
    float stripeTh = 0.25; //Switchover value, in the [0.-0.5] range. (0.25 = right in the middle)
    float aa = 0.001; //aa = transition width (pixel "antialiazing" or smoothness)
    float stripeIntensity = smoothstep(stripeTh-aa*stripeHz,stripeTh+aa*stripeHz,abs(fract(dist*stripeHz)-0.5));
    float blobContourIsovalue = 0.113; //Arbitrary distance from center at which we decide to set the blob boundary.
    float fBlobLerp = smoothstep(blobContourIsovalue-aa,blobContourIsovalue+aa,dist);

    color = mix(vec3(blobColor),vec3(0.),fBlobLerp);
    } else if (mode == 5){
    //https://www.shadertoy.com/view/7sdXz4
    //this code is a mofified & interactive version of the linked shader.
    st = (gl_FragCoord.xy - (u_resolution.xy * 0.5)) / min(u_resolution.y, u_resolution.x) * 10.0;
    float t = u_time* 0.2;
    float r = 40.0;
    float d = 0.0;
    for (int i = 1; i < N; i++) {
        d = (PI / float(N)) * (float(i) * 14.0);
        r += length(vec2(rate*st.y, rate*st.x)) + 1.21;
        st = vec2(st.x+cos(st.y+cos(r)+d)+cos(t),st.y-sin(st.x+cos(r)+d)+sin(t));
    }
    r = (sin(r*0.1*(map(mouse.x,0.,1.,0.2,1.)))*0.5)+0.5;

    r = pow(r, depth);

    
    color = vec3(r,pow(max(r-0.55,0.0)*2.2,8.0),0.3);


    } else if(mode == 7){
     

    float pct = abs(sin(st.x+st.y+u_time));

    color = mix(red, yellow, pct);

        }else if(mode == 9){
    //https://www.shadertoy.com/view/Xd23Dh
   // this is a modified version of the linked shader. It isn't finished and just here as part of my sktechbook.
    vec2 p = 0.5 - 0.5*sin( 0.1*u_time*vec2(2.3,0.0) );
     p = 0.5 - 0.5*(u_time - (2. * floor(u_time/2.)))*vec2(2.3,0.0) ;
 
	 //p = vec2(0.0,1.0) + vec2(1.0,-1.0)*u_mouse.xy/u_resolution.xy;
	
	p = p*p*(3.0-2.0*p);
	p = p*p*(3.0-2.0*p);
	p = p*p*(3.0-2.0*p);
	
	float f = voronoise( (cos(.5)*20.)*st, p.x, p.y );
	color = blue;
	color =vec3( f, f, f)*color;
    color = mix(color, red, yellow);

    } else if (mode == 6){
    float x = st.x ;
    float y = st.y;
    x -= sqrt(x*(u_time/7.));
    y -= sqrt(y);


    float d = distance(vec2(abs((x - 0.3) * 2.), abs((y - 0.5) * 2.0)), OFFSET);
    d *= 20.0;
    d -= floor(d);

    color = mix(blue, red, d);
    } else if (mode == 8){
    //this part is just an unfinished sketch.

    float off = 1.0;
  
    vec3 col = red;
    
    float stripe_str = 2.;

    float stripes = ceil(sin(st.x*PI*60.));

    st = rotate(0.0)*st;
 
    color = mix(col, stripe_str*red, stripes);
    
      
    } 

    gl_FragColor = vec4(color,a);
}