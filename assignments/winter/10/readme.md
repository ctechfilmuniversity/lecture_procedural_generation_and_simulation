# Realtime Mandelgrowth in Unity/Unreal



https://user-images.githubusercontent.com/93442123/182045598-4808273e-4099-4589-b881-96e6c94c796e.mp4



## Abstract
Houdini apprentice does not include the Unity/Unreal engine nor the export of VATs, FBXs or Alembic files (more about these later). The only usable export option available to us are oldschool OBJs. You can use Houdini's [ROP Geometry Output Node](https://www.sidefx.com/docs/houdini/nodes/sop/rop_geometry.html) to export a sequence of OBJs corresponding to the framenumber of the Houdini timeline. With the [Stop Motion OBJ Addon for Blender](https://github.com/neverhood311/Stop-motion-OBJ), these OBJs can be summed into a single Alembic file for a game engine. The video above is realtime-rendered in Unity, using this workaround. 

## The Whole Plate
Welcome to this place of misery (┛ಠ_ಠ)┛彡┻━┻.

My goal for this final pgs project is to explore the various options to free our assets of Houdini and Mantra to use them in a game engine for real-time-rendering. This documentation is more of a meta-guide than a super detailed retelling of my own learning process, which unfortunately was extremly frustrating.


### Engine Plug-ins

SideFX offers Houdini Plugin-ins for Maya, 3ds Max, Unity and Unreal, of which the latter two are "free". This means that you don't need a Houdini license to use the Plugins within your game engine, but to export assets from Houdini this way you still need at least a Indie license.

[This video](https://www.youtube.com/watch?v=QZZp-Ob-OSA) gives a pretty good impression of what the engines can do and what not. For static enviroment design they are quite the dream, because you can give the procedural superpowers of Houdini to other artists through a simple interface of parameters sliders. This means that Houdini needs to cook all these simulations in the background. Therefore animations in realtime are not possible - you'd have to ship your game with Houdini 🤪. [Junichiro Horikawa manages to change parameters in realtime within the Unity editor](https://www.youtube.com/watch?v=J_dUTntd8lA&t=131s), but this does **not** work within the final build/game view.

Frankly I don't understand why SideFX doesn't offer some way to bake animations as an alembic or VAT within the engine. One workaround would be to create a  pseudo obj-sequence with a script that creates a new assets for each parameter setting. Another script could flip through all the meshes by hand, but depending on the asset, this would easily inflate the project size and make Unity extremly slow and sluggish. An alternative would be to export the assets to Maya/Blender and create an alembic there, but then you have no need to use the Engine Plug-ins to begin with :D. 

This tool could be so amazing as an official "it just works" solution , but as of now it hardly scratches its potential :( .


| Pro                              | Con                         |
|----------------------------------|-----------------------------|
| Tightest integration            | Not included in Apprentice |
| Procedural, customizable assets | No animations              |

### Alembics

Alembic is a truly wonderful format to not just share geomteries, but entire 3d scenes, including animations. A perfect fit for me! [This video by Doxia](https://www.youtube.com/watch?v=BPK-1nYXjUY&list=PLMUuuDyzvcZI1_Z_oNFcy8GtfNIqG3vIg&index=7&t=680s) shows you how easy it can be (I subscribed to their patreon for this...). However, none of this works in Houdini Apprentice 🤠. Just great. 
For most cases, it's probably the best option....

![fml](https://i.kym-cdn.com/photos/images/newsfeed/001/401/347/312.jpg)

| Pro                         | Con                         |
|-----------------------------|-----------------------------|
| Universally used            | Not included in Apprentice |
| Supports animations and more | Huge file sizes             |

### VATs

The new kid in town - VATs! Also known as Vertex Animation Textures. They're so pretty:

![vat](https://user-images.githubusercontent.com/93442123/182043279-a605b1de-6caf-40ff-b50f-e776f2af60b4.png)

This texture contains an animation that can be reproduced with a vertex shader. Compared to the cached meshes of an Alembic, this is much memory and computation efficient! Because this method relies on shaders, the result can be tweaked further inside the game engine, for example with Unreal's Cascade or Niagara. [This introduction by SideFX](https://www.sidefx.com/tutorials/vertex-animation-textures-for-unreal/) is a great gateway into the whole topic. This tutorial also explains how Houdini differentiates between four different methods to create a VAT, each suited for one specific use-case:

* Cloth/Soft Body Simulation
* Rigid Body Simulation (destruction)
* Fluids Simulation
* Particles Simulation / Sprite

As you can tell, this is mostly for typical procedural animations. For character or motion-tracked animations, alembics are probably still the more reasonable choice.

Just as with alembics, Unity needs a package to reads VATs. This wouldn't be a problem, but SideFX didn't bother to develop a package that works in Unity's High Definition Render Pipeline. Which makes VATs completely useless to me :/.

[There is this tutorial](https://github.com/keijiro/HdrpVatExample) on how to make VATs work in the HDRP, but only the sprite animation works for me without further research.

If you work in Unreal or Unity's Universal Render Pipeline though, this is a pretty cool option.
However, none of this works in Houdini Apprentice 🤠.

| Pro                               | Con                        |
|-----------------------------------|----------------------------|
| Smalles footprint                 | No export in Apprentice    |
| Supports animations               | Not procedural             |
| Can be used in Cascade/Niagara/Shader Graph | No native support for HDRP |

### OBJs and Alembics again (this is what I did)

Is there actually anything that can be exported out of Houdini Apprentice? Well, there are OBJ exports from within a geometry network. These Objs cannot contain an animation, they will just be a snapshot of the geometry at its current state in the timeline. This is not ideal, but it is enough to construct a alembic later. OBJs can be saved by right-clicking the last node in a geometry network and selecting "save" -> "geometry". Fortunately there is no need to save every frame by hand thanks to the extremly useful [ROP Geometry Output geometry node](https://www.sidefx.com/docs/houdini/nodes/sop/rop_geometry.html). With this most useful node, the whole process becomes automatic, so that a sequence of OBJs is exported for a set frame range. The controls should be quite familiar from the mantra render node. Keep in mind to include "$F" in the filename to save more than just one obj. 

This is a good moment to have a look at my Houdini project:

![houdini](https://user-images.githubusercontent.com/93442123/182043835-4d543b17-51c0-4c51-9ffe-3f7ab81e9502.png)


There is nothing crazy going this, this is mostly my original mandelbulb setup based on Lena's pseudocode. To reduce the size of the OBJs, I use a [PolyReduce node](https://www.sidefx.com/docs/houdini/nodes/sop/polyreduce.html). The quality tolerance setting is especially useful here since it allows Houdini to reduce polygons more dynamically depending on the geometry - you can see my settings in the screenshot (my calculation was wrong though and the meshes ended up a bit too big...).

For my animation I exported 1000 OBJs. Now the only step that is to finally create the Alembic that I wanted since the very beginning. Both Blender and Maya are flexible enough for this task, but in both cases it's a bit hacky (you can ask Vivien how to do it in Maya). I use Blender because it's free, here's a short tutorial:


https://user-images.githubusercontent.com/93442123/182043849-719514e2-a56c-4bb3-9462-19bbb62f2a74.mp4


I got this workaround from [this forum thread](https://blenderartists.org/t/stop-motion-obj-obj-stl-ply-sequence-importer-v2-1-1/670105/107). 

Now it's finally Unity-Time! I'd like to point out that the following workflow is in large the result of Vivien's additional reasearch. Without her I would not have made it through the 10000000000000000000 mental breakdowns that Houdini caused me. 


https://user-images.githubusercontent.com/93442123/182043730-39ac4a75-a427-4ed0-84b4-8a5488bb6d70.mp4



I used [this tutorial](https://learn.unity.com/tutorial/particle-system-lights#) for the particle systems. The Unity project/build is too big to upload it here, but I might put it on my Google drive if there is any interest. 

## Final Thoughts

After this whole ordeal, I'm quite sick of Houdini. I could make a Madelbulb in Blender and skip the whole OBJ export. What surprises me is how much more professional Blender felt to me, I never encountered any of the obscure (and often just wrong) errors that I'm so used to from Houdini, which unlike Blender isn't free. Of course Blender will never get close to the procedural powers of Houdini, but there are many workaround-tutorials already thanks the much larger community. I'm sorry Houdini, but I think this will be the end for us :(. 

*I uploaded the houdini project too late, sorry :|

