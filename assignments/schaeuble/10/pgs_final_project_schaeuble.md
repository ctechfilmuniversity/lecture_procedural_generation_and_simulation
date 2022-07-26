# Final Project

I would like to check out topics either from the *beauty in maths* or *dynamics* chapters, but in Blender and using python.

# Working Process

## Intro to Python in Blender Code
Completed this tutorial to get aquainted with scripting in Blender:
https://www.youtube.com/watch?v=XqX5wh4YeRw

```python
import bpy
from math import radians

bpy.ops.mesh.primitive_cube_add()
so = bpy.context.active_object

# translation
# so.location[0] = 5

# rotation
so.rotation_euler[0] += radians(45)

# create modifier
mod_subsurf = so.modifiers.new("my-modifier", 'SUBSURF')

mod_subsurf.levels = 3
# bpy.ops.object.shade_smooth()

# iterate over a polygon
for face in so.data.polygons:
        face.use_smooth = True
        
#create a displacement modifier
mod_displace = so.modifiers.new("my_displacement", 'DISPLACE')

#create texture
new_tex = bpy.data.textures.new("my_texture", "DISTORTED_NOISE")

#change the texture settings
new_tex.noise_scale = 2.0

#assign the texture to displacement modifier
mod_displace.texture = new_tex
```

## Physics Simulation in Blender with Python
Started to look at procedurally generating with python.
https://www.youtube.com/watch?v=KI0tjZUkb5A

Procedurally generated cubes made into a tower.
![tower fall - code below](media/tower-fall.gif)

### Tower Fall Simulation
```python
import bpy

number = 4
counter1 = 0

#make floor
bpy.ops.mesh.primitive_plane_add(enter_editmode=False, align='WORLD', location=(0, 0, 0), scale=(1, 1, 1))
bpy.ops.transform.resize(value=(58.8978, 58.8978, 58.8978), orient_type='GLOBAL', orient_matrix=((1, 0, 0), (0, 1, 0), (0, 0, 1)), orient_matrix_type='GLOBAL', mirror=False, use_proportional_edit=False, proportional_edit_falloff='SMOOTH', proportional_size=1, use_proportional_connected=False, use_proportional_projected=False)
bpy.ops.rigidbody.object_add()
bpy.context.object.rigid_body.type = 'PASSIVE'
bpy.context.object.rigid_body.collision_shape = 'MESH'


#make cube group
for a in range(0, number + 20):
    counter1 += 2
    counter2 = 0
    for b in range(0, number):
        counter2 += 2
        counter3 = 0
        for c in range(0, number):
            bpy.ops.mesh.primitive_cube_add(size=2, location=(counter3+2, counter2-2, 40 + counter1-2), scale=(1, 1, 1))
            counter3 += 2
            bpy.ops.rigidbody.object_add()
            bpy.context.object.rigid_body.mass = 500
            bpy.context.object.rigid_body.collision_shape = 'BOX'
            bpy.context.object.rigid_body.friction = 1
            bpy.context.object.rigid_body.use_margin = True
            bpy.context.object.rigid_body.collision_margin = 0
            bpy.context.object.rigid_body.linear_damping = 0.35
            bpy.context.object.rigid_body.angular_damping = 0.6
            
# rigid body settings
bpy.context.object.rigid_body_constraint.use_breaking = True
```

### Fracture Tutorials
Looked into how to do fracturing in Blender to see if I wanted to go down that path for the project and how achievable it would be with scripting. 

cell fracture: https://www.youtube.com/watch?v=T2nsntEzlAw
cell fracture without pre-fractured visual: https://www.youtube.com/watch?v=Xdrz7icUvC4

Got to this but its a cheap trick result. The cell fracture addon prefracture an object, unlike in houdini where a collission defines the fracture dynamics 💩 Apparently there's a new node in the latest insider version that allows procedurally generated fracturing, but I can't find access to it... yet. 
![blender-fracture. deliberately poor qual export](./media/blender-fract-magick.gif)


## Procedural Generation Scenes
As I really wanted to go down the scripting path in Blender for this project, I decided to drop the fracturing idea - or at least not make it the focus of the project - as it seems a bit out of scope to script it in python. 

https://www.youtube.com/watch?v=r8hqLh_HE08

### Rose Curve Implementation
Direct implementation of code from script:
```python
import bpy
import math

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False, confirm=False)

theta = 0
r = 10
k = 6


while theta < 2 * math.pi:
    x = r * (math.cos(k*theta) * math.cos(theta))
    y = r * (math.cos(k*theta) * math.sin(theta))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, enter_editmode=False, align='WORLD', location=(x, y, 0), scale=(1, 1, 1))
    theta += 0.01
```
![first result - Cauliflower Curve](media/rose-curve-1.png)

Used a constant of 1 for sphere radius and radius used in function (r)
```diff
+ bpy.ops.mesh.primitive_uv_sphere_add(radius=sphere_1, enter_editmode=False, align='WORLD', location=(x, y, 0), scale=(1, 1, 1))
- bpy.ops.mesh.primitive_uv_sphere_add(radius=r, enter_editmode=False, align='WORLD', location=(x, y, 0), scale=(1, 1, 1))
```

![second result - now identifiable](media/rose-curve-2.png)

#### Animation
This animates the growth in scale of the spehres, so the rose "grows" in size. 
```python 
import bpy
import math

# Utility
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False, confirm=False)

bc = bpy.context
bd = bpy.data


# Start
sphere_r = 0.5
theta = 0
r = 10
k = 6



# draw flower
while theta < 2 * math.pi:
    x = r * (math.cos(k*theta) * math.cos(theta))
    y = r * (math.cos(k*theta) * math.sin(theta))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=sphere_r, enter_editmode=False, align='WORLD', location=(x, y, 0), scale=(1, 1, 1))
    theta += 0.01

# set variable for accessing objects in collection
flower_nodes = bd.collections['Collection'].objects

# iterate over objects in collection
for i in flower_nodes:
    # set initial state at frame 1
    i.scale = [ 0, 0, 0]
    i.keyframe_insert(data_path = 'scale', frame = 1)
    
    i.scale = [ 5, 5, 5]
    i.keyframe_insert(data_path = 'scale', frame = 150)
    
```

Trying now to figure out how to input the frame value into `k` to animate moving through the different formations of rose curve. A quick google / youtube search didn't solve this.   
At the moment it seems like I need to implement it programatically into the for loop as so far I've only found how to set keyframes in the python script, rather than read values from the playbar.

I'm now perhaps seeing a limitation of scripting in blender which is that the script is run once at setup, rather than in a loop. But maybe there are ways around this. 

The sollution I found was to add a keyframe at each step, which I managed to do with a for loop but of course it pooled every sphere together into the same location.

![all balls moving together](media/all-balls-moving-together.mov)


Got to this point with about 8 hours to go on the clock. 
There are two problems. 
1. The for loop is setting all spheres to the same position on frame 1 and frame 50 (360 degrees). This means that *all* balls only know *two* positions to interpolate between: 0 degrees and 360 degrees...
2. But I only accidentally saw that the x and y parameters are actually not being saved as information into the animation keyframes... This is more of a problem right now. 

![x and y not being mapped](media/ani-variables-no-in-keyframe.png)

```python
/ ... /
# draw rose
while theta < 2 * math.pi:
    x = r * (math.cos(k*theta) * math.cos(theta))
    y = r * (math.cos(k*theta) * math.sin(theta))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=sphere_r, enter_editmode=False, align='WORLD', location=(x, y, 0), scale=(1, 1, 1))
    
    theta += 0.01

        # set variable for accessing objects in collection.
        # needs to be set after sphere creation
flower_nodes = bd.collections['Collection'].objects

# for animation
# iterate over objects in collection
for i in flower_nodes:

    # set initial state at frame 1
    x = r * (math.cos(k * 0) * math.cos(0))
    y = r * (math.cos(k * 0) * math.sin(0))
    i.location = [x, y, 0]
    i.keyframe_insert(data_path = 'location', frame = 1)
    
    x = r * (math.cos(k * 6.28999999999991) * math.cos(6.28999999999991))
    y = r * (math.cos(k * 6.28999999999991) * math.sin(6.28999999999991))
    i.location = [x, y, 0]
    i.keyframe_insert(data_path = 'location', frame = 50)
```

I think a solution to address each sphere on its own with its relative starting position relative to theta is to give the sphere an id on creation and to parametrically map that id to a starting point of theta. Could even give it the id of `id_theta` within the while loop. 

After a short search, I decided it was a smarter move to work with what I have and start getting more creative rather than stumbling over the same technical issue for hours.    
If I have time to spare at the end, it is something I can implement regardless of what I have - considering I'm going to continue with the same process of iteratively drawing spheres to create a path / shape. 

### Creative Direction

The obvious idea was to start integrating the z axis. Here drawing two iterations of the rose curve; one with k = 2 and the other with k = 3. 
![zaxis-exp](media/zaxis-exp.png)


```python 
while theta < 2 * math.pi:
    k = 2
    x = r * (math.cos(k*theta) * math.cos(theta))
    y = r * (math.cos(k*theta) * math.sin(theta))
    z = r * (math.sin(k*theta) * math.tan(theta))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=sphere_r, enter_editmode=False, align='WORLD', location=(x, y, z), scale=(1, 1, 1))
    
    k = 3
    x = r * (math.cos(k*theta) * math.cos(theta))
    y = r * (math.cos(k*theta) * math.sin(theta))
    z = r * (math.sin(k*theta) * math.tan(theta))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=sphere_r, enter_editmode=False, align='WORLD', location=(x, y, z), scale=(1, 1, 1))
    
    
    
    theta += 0.01
    print('build stage')
     
```



### Other Tutorials I Viewed
Here mostly to do with the fact it was the first time using blender. 

HDRI / Polyhaven - https://www.youtube.com/watch?v=Pi4Ft7M8UOU
Animation with Python - https://www.youtube.com/watch?v=QnvN1dieIAU