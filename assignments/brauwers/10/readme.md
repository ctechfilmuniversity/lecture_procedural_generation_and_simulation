
## [Switch, Shader!](http://annabrauwers.de/switch/)
# Abstract
*Switch, Shader!* is a GLSL Shader which is like an endless loop of animated patterns.
# Concept
My intention was to create a shader "sketchbook" where I can explore different topics from the sessions, mainly patterns and noise. 

Instead of doing one complex project I thought it'd be great to work on my ideas in smaller projects and combine everything into a combined project. I chose this approach because instead of dealing with one very complex code I wanted to improve my basic skills so I can work on more complex shaders in the future. I think the better you understand the basics the better the better you can work on more complicated projects.

Everything is wrapped in the concept of a tv where each sketch is a tv channel. The tv switches through the sketches/channels. The switching is time-based and happens automatically. 

The sketchbook consists of finished results and unfinished ideas. The time a sketch is shown is chosen intentionally, the very short ones are unfinished.

# Implementation
I wanted to work in GLSL, because I really enjoy it and want to get good at it. Houdini was not for me, I alway ran into issues that I tried to solve myself but in the end I always needed help. It was a really frustrating experience. With GLSL, as with programming in general, it's easy to google an issue or just how to do something and you can figure it out without watching a long video tutorial (like in Houdini). I just like that a lot more and I wanted to take something from this assignment by learning more about shaders and getting better in implementing them.

I used The Book of Shaders as a resource for learning and as a starting point for some of my sketches. I also used Shadertoy as inspiration and to learn how to implement some of my ideas. Some of the sketches are done by me from ground up and others are modified versions of Shadertoy shaders. (See comments in the code)


# Results
[Link to web version](http://annabrauwers.de/switch/)
## Video
(videos load slowly)
![0](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/0.mov)
![1](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/1.mov)
![2](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/2.mov)
![3](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/3.mov)
![4](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/4.mov)
![5](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/5.mov)
![6](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/6.mov)

## Images
![0](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/0.png)
![1](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/1.png)
![2](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/2.png)
![3](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/3.png)
![4](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/4.png)
![5](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/5.png)
![6](https://github.com/ctechfilmuniversity/lecture_procedural_generation_and_simulation/blob/main/assignments/brauwers/10/assets/6.png)

# Project Reflection & Discussion
I'm happy with my choice of using GLSL and doing a sketchbook. I think in two days of work (20 hours) I was able to learn a lot more of the basics of GLSL and I could implement a variety of my ideas. The sketchbook format is also great in order to not get into too big time management issues, because I could be done when I was done without the pressure to finish one bigger project.

Because it's a sketchbook it's open end and I can imagine continuing working on this. Since I want to improve more and more 

I put everything into one fragment shader and I think the next step would be to separate every sketch into it's own shader and bring them together in p5 to make it more accessible.

# Lessons Learned

I improved my understanding how to create shapes and learned how to create a shader that consist of many parts which are switched by time.
My biggest learning was to actually understand how to combine colors, shapes, how to layer them in different ways and how to color shapes intentionally.

I achieved what I intended to by understanding more of the basics of GLSL.
