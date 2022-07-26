---
layout: default
title: Session
nav_exclude: true
---

# Procedural Generation and Simulation

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de \| Film University Babelsberg KONRAD WOLF

## Task 2: Boids - Source Code


* [Procedural Generation and Simulation](#procedural-generation-and-simulation)
    * [Task 2: Boids - Source Code](#task-2-boids---source-code)
    * [System Init](#system-init)
    * [Update](#update)
    * [Boundaries](#boundaries)
    * [Separation](#separation)
    * [Alignment](#alignment)
    * [Cohesion](#cohesion)
    * [Geometry Shape](#geometry-shape)
    * [References](#references)

This is the code used in the swarm system tutorial.


## System Init

```c++
// make random velocity between -1..1
// rand() returns a value between 0..1
v@velocity = (rand(v@P) - {0.5,0.5,0.5}) * 2; 
v@acceleration = {0,0,0};

// radius in which we search for neighbors
f@radius = chf("radius");

f@max_force = chf("steering_force");
f@speed = chf("steering_speed");

f@strength_separation = chf("strength_separation");
f@strength_alignment = chf("strength_alignment");
f@strength_cohesion = chf("strength_cohesion");

f@bounds = chf("Bounds");
```

## Update

```c++
v@velocity += v@acceleration;

if(length(v@velocity) > f@speed)
{
    v@velocity = normalize(v@velocity);
    v@velocity *= f@speed;
}

//vector limitVelocity = {1,0,1}; 
//v@velocity *= limitVelocity;


v@P += v@velocity;
v@acceleration *= 0;
```


## Boundaries


```c++
float half = f@bounds * 0.5;

// X
if(v@P.x > f@bounds)
{
    v@P.x = f@bounds;
    v@velocity.x *= -1;
} 
else if (v@P.x < -f@bounds)
{
    v@P.x = -f@bounds;
    v@velocity.x *= -1;
} 

// Y
if(v@P.y > half)
{
    v@P.y = half;
    v@velocity.y *= -1;
} 
else if (v@P.y < -half)
{
    v@P.y = -half;
    v@velocity.y *= -1;
} 


// Z
if(v@P.z > half)
{
    v@P.z = half;
    v@velocity.z *= -1;
} 
else if (v@P.z < -half)
{
    v@P.z = -half;
    v@velocity.z *= -1;
} 
```

## Separation

```c++
vector force_separation = {0,0,0}; 
vector sum_difference = {0,0,0};
int count_inside_radius = 0; // the number of neighbors in our search radius

// Iterate over neighbours, sum up position differences
for(int i= 0; i < npoints(0); i++)
{
    if(i@ptnum != i) // if i is not the current point i@ptnum
    {
        vector neighbor_pt_pos = point(0, "P", i); //syntax to get the position of point with the number i
        
        float dist = distance(v@P, neighbor_pt_pos);
        
        if (dist > 0 && dist < f@radius)
        {
            count_inside_radius += 1;

            vector difference = v@P - neighbor_pt_pos;

            difference = normalize(difference);
            difference /= dist; // farther agents have less influence

            sum_difference += difference;
        }
    }
}

if(count_inside_radius > 0)
{
    sum_difference /= count_inside_radius;

    if(length(sum_difference) > 0)
    {
        force_separation = normalize(sum_difference); // Get only the direction
        force_separation *= f@speed; // Scale to user defined speed
         
        force_separation -= v@velocity;  // Reynold's steering formula

        if(length(force_separation) > f@max_force) // Clamp force to max_force
        {
            force_separation = normalize(force_separation);
            force_separation *= f@max_force;
        }
    }

}


v@acceleration += force_separation * f@strength_separation;
```

## Alignment

```c++

vector force_alignment = {0,0,0};
vector sum_velocity = {0,0,0};
int count_inside_radius = 0;

for(int i= 0; i<npoints(0); i++)
{
    if(i@ptnum != i)
    {
        vector neighbor_pt_pos = point(0, "P", i);
        float dist = distance(v@P, neighbor_pt_pos);
        
        if (dist > 0 && dist < f@radius)
        {
            count_inside_radius += 1;
            sum_velocity += point(0, "velocity", i);
        }
    }
}

if(count_inside_radius > 0)
{
    sum_velocity /= count_inside_radius;

    sum_velocity = normalize(sum_velocity);
    sum_velocity *= f@speed;

    force_alignment = sum_velocity - v@velocity;

    if(length(force_alignment) > 0)
    {
        force_alignment = normalize(force_alignment);
        force_alignment *= f@speed;
        force_alignment -= v@velocity;
        
        if(length(force_alignment) > f@max_force)
        {
            force_alignment = normalize(force_alignment);
            force_alignment *= f@max_force;
        }
    }
} 



v@acceleration += force_alignment * f@strength_alignment;
```

## Cohesion


```c++ 

vector force_cohesion = {0,0,0};
vector sum_position = {0,0,0};
int count_inside_radius = 0;

for(int i= 0; i<npoints(0); i++)
{
    if(i@ptnum != i)
    {
        vector neighbor_pt_pos = point(0, "P", i);
        float dist = distance(v@P, neighbor_pt_pos);

        if (dist > 0 && dist < f@radius)
        {
            count_inside_radius += 1;
            sum_position += neighbor_pt_pos;
        }
    }
}

if ( count_inside_radius > 0)
{
    sum_position /= count_inside_radius;

    vector target = sum_position - v@P;
    target = normalize(target);
    target *= f@speed;

    force_cohesion = target - v@velocity;

    if(length(force_cohesion) > 0)
    {
        force_cohesion = normalize(force_cohesion);
        force_cohesion *= f@speed;
        force_cohesion -= v@velocity;
        
        if(length(force_cohesion) > f@max_force)
        {
            force_cohesion = normalize(force_cohesion);
            force_cohesion *= f@max_force;
        }
    }
} 


v@acceleration += force_cohesion * f@strength_cohesion;
```



## Geometry Shape


```c++
int pts[] = primpoints(0, @primnum);

for(int i=0; i<len(pts); i++)
{

    float ramp_index = fit(i, 0, len(pts) - 1, 0, 1);
    setpointattrib(0, "ramp", pts[i], ramp_index);
    
    float shape = chramp("shape", ramp_index) / 2.0
   ;

    setpointattrib(0, "shape", pts[i], shape);
    
}
```

## References


* [Swarm Intelligence](https://www.youtube.com/watch?v=dUec3GXc6Tg) by Junichiro Horikawa.
* [Swarm System](https://www.patreon.com/posts/houdini-tutorial-26863021) by Doxia Studio.

