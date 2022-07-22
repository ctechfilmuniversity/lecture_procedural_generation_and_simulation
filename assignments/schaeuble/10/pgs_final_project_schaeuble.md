# Final Project

I would like to check out topics either from the *beauty in maths* or *dynamics* chapters, but in Blender and using python.

# Working Process

## Intro to Python in Blender Code
Completed this tutorial as an intro to python in Blender:
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
https://www.youtube.com/watch?v=KI0tjZUkb5A

### Basic Physics Simulation
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

## Fracture Tutorials
cell fracture: https://www.youtube.com/watch?v=T2nsntEzlAw
cell fracture without pre-fractured visual: https://www.youtube.com/watch?v=Xdrz7icUvC4

Got to this but its a cheap trick result. The cell fracture addon prefracture an object, unlike in houdini where a collission defines the fracture dynamics 💩 Apparently there's a new node in the latest insider version that allows procedurally generated fracturing, but I can't find access to it... yet. 
![blender-fracture. deliberately poor qual export](./media/blender-fract-magick.gif)

### HDRI / Design Tutorial
HDRI / Polyhaven - https://www.youtube.com/watch?v=Pi4Ft7M8UOU