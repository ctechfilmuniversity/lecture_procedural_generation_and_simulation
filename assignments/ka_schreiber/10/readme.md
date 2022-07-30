# Abstract

During the lecture, I was fascinated by the topic "fluid" and enjoyed implementing the fluid simulation of the paper "Real-Time Fluid Dynamics for Games". The implementation of the fluid homework took me over a day. That's why I thought it would fit better as a final project. Even after I implemented the paper, I had only understood the broad concept of how the algorithm works. So I thought it would be interesting to add a GUI to the fluid simulation, where I can play around with all the values, that can influence the fluid simulation. In order to get a better understanding of the algorithm. 

# Concept

My concept is pretty simple. I want to implement the fluid simulation of the paper "Real-Time Fluid Dynamics for Games" in openframeworks. In the end, the fluid simulation should be represented next to a GUI where I can influence its motion with different parameters. Additionally, I want to try visualizing the fluid movement with different visualizations.

# Implementation

For my implementation of the fluid simulation, I used the following sources:
- [Fluid Simulation for Dummies - Mike Ash](https://mikeash.com/pyblog/fluid-simulation-for-dummies.html) 
- [Coding Challenge #132: Fluid Simulation - Daniel Shiffman](https://www.youtube.com/watch?v=alhpH6ECFvQ)
- [Live Stream #46: Perlin Noise and Flow fields - Daniel Shiffman](https://www.youtube.com/watch?v=sor1nwNIP9A)
- [Real-Time Fluid Dynamics for Games - Jos Stam](https://www.dgp.toronto.edu/public_user/stam/reality/Research/pdf/GDC03.pdf)

First of all, I had to implement the algorithm which was explained in the paper "Real-Time Fluid Dynamics for Games". After reading the paper I had a brief overview of the topic but wasn't able to implement the algorithm. But after some research, I found the tutorial of Daniel Shiffman which helped me a lot with the implementation. I had to make some adjustments to implement the code in openframeworks and the code of the tutorial wasn't completely correct so I compared it to some other repositories with fluid simulation and finally got it debugged. After I managed to run the fluid simulation in openframeworks, I decided which parameters I want to influence with the GUI:

- viscosity
- diffusion
- time step
- fade
- color gradient
- noise
- flow field

My implementation is splitted into 3 parts:
The first part is the ofApp-class where all the logic for displaying the fluid simulation and the settings for the GUI are implemented. The ofFluid-class contains all the attributes (density, velocity, viscosity etc.) and functions (addDensity, addVelocity, renderDensity etc.) that are directly connected with the fluid. The fluidHelper-class contains functions that influence the attributes of the ofFluid-class (diffuse, advect, project etc.).

The GUI parameter "fade" and "diffusion" are sliders and behave similarly. Both let the density of the fluid disappear. The viscosity influences the thickness/viscous of the fluid. The time step parameter influences how fast the density of the fluid spreads out. The color gradient parameter adds a color gradient to the fluid. The color depends on the position of the x-axis and the transparency of the color depends on the density. The color is modeled with different sine and cosine functions for the RGB-values depending on the x-axis. The noise parameter is adding a perlin noise to the density of the fluid. The flow field consists out of multiple small lines. The angle of those small lines is influenced by the density of the fluid at this position.

# Results

https://user-images.githubusercontent.com/103817814/181996165-dadfec7b-3593-4bd6-866a-2d9349ce94c9.mov

# Project Reflection & Diskussion

I'm pretty happy with my result and still impressed how the change of the density of the single pixels can lead to this natural-looking fluid movement. But there are still some issues with the visualization: 
- In my code is something wrong with the correct edge detection and this leads to some weird unexpected behavior:

...video
- It is just possible to run the fluid simulation in a window that has the same height and width.
- The density pixels that are close to the cursor are a bit blocky.
- I couldn't find the perfect parameters for the spinning of the flow field lines that's why they are rotating too much at some points.
- The resolution is really low, but if I would choose a higher resolution the movement wouldn't be fluid.

# Lessons Learned

While implementing the algorithm of the paper I got a better understanding of how fluid movement works. After adding the GUI to the simulation I've learned how the different properties of fluid influence the motion of the fluid. For example, before I added the GUI I couldn't imagine what the time step parameter was doing. To summarize in the end I honestly do not completely understand the fluid equation and algorithm, but I have a better overview and understanding of how I can choose the parameters to get a certain behavior.
