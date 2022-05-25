//TRIED TO TEST THE CODE SNIPPETS BY MYSELF

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
float u_time;

float myClamp(in float x,in float lLimit,in float uLimit){
    if(x<lLimit){
        return lLimit;
    }
    if(x>uLimit){
        return uLimit;
    }
    return x;
    
}

float mySmoothstep(in float edge0,in float edge1,in float x){
    float clampedX=myClamp((x-edge0)/(edge1-edge0),0.,1.);
    return clampedX*clampedX*(3.-2.*clampedX);
}

float wave_square(in float t,in float frequency,in float amplitude){
    return mod(floor(t*frequency),2.)*amplitude;
}

float wave_sawTooth(float t,float frequency,float amplitude)
{
    return(t*frequency-floor(t*frequency))*amplitude;
}

float wave_triangle(float t,float frequency,float amplitude)
{
    return abs(mod((t*frequency),amplitude)-(.5*amplitude));
}

float cubicPulse(float x,float c,float w)
{
    x=abs(x-c);
    if(x>w)
    {
        return 0.;
    }
    x/=w;
    return 1.-x*x*(3.-2.*x);
}

float gain(float x,float k)
{
    float a=.5*pow(2.*((x<.5)?x:1.-x),k);
    return(x<.5)?a:1.-a;
}

void main(){
    
    float t=abs(sin(u_time));
    
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    //gl_FragColor=vec4(1.);
    
    //vec3 color =vec3(sin(st.x));
    
    //vec3 color=vec3(sin(9.*PI*st.x)*.5+.5);
    
    //vec3 color = vec3(sin(st.y)+sin(st.y));
    
    //vec3 color=vec3(sin(5.*PI*st.x)*.5+.5)+vec3(sin(5.*PI*st.y)*.5+.5);
    
    //vec3 color=vec3(sin(100.*st.x)/st.x*0.5);
    
    //vec3 color=vec3(step(.4,st.x)*sin(st.y*20.));
    
    //vec3 color=vec3(st.x*sin(st.y*20.)+(1.-st.x));
    
    //vec3 color=vec3(sin(st.y*20.)*mySmoothstep(.5,.8,st.x));
    
    //vec3 color=vec3(mod(st.x,.5));
    
    //vec3 color=vec3((floor(sin(1.-st.x)*10.))/10.);
    
    //vec3 color=vec3(1.-st.x)+vec3(1.+st.x);!!!!!!!!!!
    
    //vec3 color=vec3(wave_square(st.x,5.,.2));
    
    vec3 color=vec3(wave_sawTooth(st.x,5.,1.));
    
    //vec3 color=vec3(wave_triangle(st.x,5.,1.));
    
    //vec3 color=vec3(cubicPulse(st.x,.5,.1));
    
    //vec3 color=vec3(gain(st.x,1.))-wave_triangle(st.y*10.*t,1.,1.);
    
    gl_FragColor=vec4(color,1.);
}