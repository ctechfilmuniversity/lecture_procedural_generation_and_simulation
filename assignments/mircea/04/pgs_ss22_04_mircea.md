---
layout: default
title: Session
nav_exclude: true
---

# Procedural Generation and Simulation

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de \| Film University Babelsberg KONRAD WOLF

# Session 04

We will discuss this session on **Monday, May 30th**.   

This week's session is a bit more focused on gaining an understanding than practical exercise. All tasks should take less than 3 hours.

---

## Task 1: Setup Fragment Shader

For this chapter we will take a quick break from working with Houdini and work with code and filling a 2D canvas instead. The easiest environment for this are fragment shaders. 

You should be roughly familiar with working with a fragment shader from last term's lecture *Theoretical Backgrounds in Audio and Graphics*. 

If you want some brushing up right now, I recommend - especially for the topics of this lecture - [The Book of Shaders](https://thebookofshaders.com/). This is a truly excellent very first introduction to shaders. However, we will come back to this topic in the Shader Programming workshop. For this exercise you do not need to get any deep with shaders than running the code and seeing a result

You are free to work in any environment you want to run your shader. Options are:

* My recommendation for now: The Visual Studio Code plugin [glsl-canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
    * With this plugin, you can display a `.frag` fragment shader file directly in VSCode. Also, the plugin gives you access to the most commonly needed uniforms `u_resolution`, `u_time`, `u_mouse`, `u_camera` and `u_trails[10]`.
* [Shadertoy](https://www.shadertoy.com/)
* The [online editor](http://editor.thebookofshaders.com/) of the Book of shaders.
* OpenFrameworks
    * For this follow the setup steps in [Introducing Shaders](https://openframeworks.cc/ofBook/chapters/shaders.html)
* p5
    * For this follow the setup steps in [Setting up shaders in p5.js](https://itp-xstory.github.io/p5js-shaders/#/./docs/setting-up-shaders-in-p5)  

Keep in mind that input uniforms might be named differently in different contexts. Make sure that you know the names of the uniform variable for your environment.  

As of now, we only work with the fragment shader, no vertex shader, etc. needed! Please do not hesitate to get in touch with me if you have any issues running a fragment shader.

## Task 2: Function Design

Read [Chapter 04 - Function Design](../../02_scripts/pgs_ss22_04_functions_script.md)

*Optional*: In case the chapter wasn't clear, you can also refer to the Book of Shader's chaper [Shaping functions](https://thebookofshaders.com/05/). My script is in parts based on that chapter.

## Task 3: Brick Pattern

Understand the given brick pattern code in the [`brick.frag`](brick.frag) file and insert comments explaining for each code line of the brick pattern what it does and submit your copy as `brick_lastname.frag` in your assignments folder.

[brick_mircea.frag](./brick_mircea.frag)

## Task 4: Experiments

Come up with your own experimental pattern. You do not need to follow a design goal with this task and the result does not need to look good. The goal of this task is that you experiment with the different functions components. Submit your fragment shader as `experiments_lastname.frag`
Based on Lewis Leptons tutorials (commented at the beginning of each example):

[experiments_mircea_01.frag](./experiments_mircea_01.frag)

![experiment_1.gif](./img/experiment_1.gif)

[experiments_mircea_02.frag](./experiments_mircea_02.frag)

![experiment_2.gif](./img/experiment_2.gif)

## Task 5: Inspiration

Go to the [shadertoy](https://www.shadertoy.com/) site and browse the examples a bit. Submit the link to one example you like (you don't have to understand the code). Add that link to a file `pgs_ss22_04_lastname.md` and submit it in your folder.

THIS IS INCREDIBLE - it's a bit glitchy and due to the fact that it also moves with the mouse its sometimes weird but SOMETIMES it looks incredibly natural.
[seascape](https://www.shadertoy.com/view/Ms2SD1)

![seascape](./img/seascapee.gif)

---

