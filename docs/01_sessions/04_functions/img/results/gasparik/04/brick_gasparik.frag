/***********************************************************
* Procedural Brick Pattern
*
* Author: Lena Gieseke
*
* Implementation based on:
* Ebert, David S. Texturing & Modeling a Procedural Approach. San Francisco, Calif.: Morgan Kaufmann, 2003.
*
* Date: April 2019
*
* Purpose: Prototyping a procedural brick pattern
*
*********************************************************/

//PRECOMPILER COMMANDS
#ifdef GL_ES
precision mediump float;
#endif

//DECLARATION OF UNIFORM VALUES
uniform vec2 u_resolution;
uniform float u_time;

//DECLARATION OF USER-DEFINED PARAMETERS
float BRICK_W=.3;
float BRICK_H=.1;
float MORTAR=.02;

// HELPER FUNCTIONS
// (no need to comment these)

float getBias(float t,float bias)
{
  return(t/((((1./bias)-2.)*(1.-t))+1.));
}

float getGain(float t,float gain)
{
  if(t<.5)
  return getBias(t*2.,gain)/2.;
  else
  return getBias(t*2.-1.,1.-gain)/2.+.5;
}

//MAIN FUNCTION
void main()
{
  
  //DECLARATION OF NORMALIZED SCREEN COORDINATES
  vec2 coord=gl_FragCoord.xy/u_resolution;
  
  //DECLARATION OF ANOTHER SET OF USER-DEFINED PARAMETERS
  // All parameter values between 0..1
  float brick_mortar_w=BRICK_W+MORTAR;
  float brick_mortar_h=BRICK_H+MORTAR;
  float mortar_half_norm_w=(MORTAR*.5)/brick_mortar_w;
  float mortar_half_norm_h=(MORTAR*.5)/brick_mortar_h;
  
  // BRICK PATTERN
  // TODO: comment the following steps
  
  // DIVIDING THE SCREEN SPACE INTO USER-DEFINED PORTIONS (DECLARED ABOVE)
  float x=coord.x/brick_mortar_w;
  float y=coord.y/brick_mortar_h;
  // float x = coord.x;
  // float y = coord.y;
  
  //OFFSETTING EVERY OTHER ROW IN  A FOR LOOP-LIKE FUNCTION: IF THE ROW NUMBER IS EVEN, X OFFSETS BY .5
  float y_index=floor(y);
  if(mod(y_index,2.)==0.)
  {
    x+=.5;
  }
  
  //POSITIONING THE "BRICKS" IN A ROW, AND DECREASONG THE Y VALUE AFTER EVERY ITERATION
  x-=floor(x);
  y-=y_index;
  
  // Simplified versions:
  // float w = step(mortar_half_norm_w, x) - step(1.0 - mortar_half_norm_w, x);
  // float h = step(mortar_half_norm_h, y) - step(1.0 - mortar_half_norm_h, y);
  // or
  // float w = smoothstep(0.0, mortar_half_norm_w, x) - smoothstep(1.0 - mortar_half_norm_w, 1.0, x);
  // float h = smoothstep(0.0, mortar_half_norm_h, y) - smoothstep(1.0 - mortar_half_norm_h, 1.0, y);
  
  //DEFINITION OF THE COLOR VALUES (ACTUAL BRICKS):
  //THE W IS CREATING THE HORIZONTAL-, WHILE THE H CREATES THE VERTICAL VALUES
  //THE SMOOTHSTEP FUNCTION'S FIRST PARAMETER SETS THE LEFT/LOWER EDGE OF THE BRICK
  //THE SECOND PARAMETER, WHICH WE DEFINED SETS THE RIGHT/UPPER SIDE OF THE BRICK. SINCE WE HAVE A REPETITIVE DISTRIBUTION, IT WAS ENOUGHTO ONLY SET THAT ONE
  //THE THIRD PARAMETER INDICES THE "SPACE" WE'RE WORKING IN. IN OUR CASE IT'S THE X AND Y VALUES OF THE CANVAS
  //THE SECOND PARAMETER OF THE USER DEFINED GETBIAS FUNCTION IS THE GAIN OF OUR GRADIENTS.
  float w=getBias(smoothstep(.9,mortar_half_norm_w,x),.8)
  -getBias(smoothstep(1.-mortar_half_norm_w,1.,x),.7);
  float h=getBias(smoothstep(5.,mortar_half_norm_h,y),.8)
  -getBias(smoothstep(1.-mortar_half_norm_h,1.,y),.7);
  
  //MULTIPLYING THE W AND H COORDINATES RESULTS IN OUR FINAL PICTURE
  vec3 color=vec3(w*h);
  
  //
  // vec3 color = mvec4(0.3059, 0.1529, 0.1529, 1.0)15), vec3(0.5, 0.25, 0.2), getBias(w * h, 0.2));
  
  gl_FragColor=vec4(color,1.);
}
