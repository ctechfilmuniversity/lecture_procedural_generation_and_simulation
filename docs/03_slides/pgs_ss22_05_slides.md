name: inverse
layout: true
class: center, middle, inverse
---


# Procedural Generation and Simulation

### Prof. Dr. Lena Gieseke | l.gieseke@filmuniversitaet.de  

#### Film University Babelsberg KONRAD WOLF


---
layout: false

## Today

* Recap of previous chapter 

--
* Homework

--
* Tilings

--
* Islamic Art

--
* Noise

---

## Today

.center[<img src="../02_scripts/img/05/islamic_slides_15.png" alt="islamic_slides_15" style="width:60%;">] 

---

## Today

![noise_24](../02_scripts/img/06/noise_24.png) vs. ![noise_25](../02_scripts/img/06/noise_25.png)  
[[scratchapixel]](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds)

---
template: inverse

### Chapter 04
#  Function Design

---
## Function Design

.center[<img src="../02_scripts/img/04/batman_03.png" alt="batman_03" style="width:90%;">]    


???
.task[COMMENT:]  

* Which idea do we follow here?

--

> The idea is to modify, shape and to combine different functions. 

---
## Function Design

.center[<img src="../02_scripts/img/04/func_06.png" alt="func_06" style="width:90%;">]  

???
.task[COMMENT:]  

* What is demonstrated here?

--

As if we project the 3D plot onto a 2D plane.


---
## Function Design

.center[<img src="../02_scripts/img/04/func_09.png" alt="func_09" style="width:90%;">]  


---
.header[Transitions]

## Interpolation Functions

.center[<img src="../02_scripts/img/04/interpolation_03.png" alt="interpolation_03" style="width:100%;">]  
[[demofox]](https://blog.demofox.org/2015/08/15/resizing-images-with-bicubic-interpolation/)  

---
.header[Transitions]

## Interpolation Functions

.center[<img src="../02_scripts/img/04/interpolation_01.png" alt="interpolation_01" style="width:100%;">]  
[[paulbourke]](http://paulbourke.net/miscellaneous/interpolation/)


???
.task[COMMENT:]  

* For example, in 3D software such as Houdini, there are several interpolations functions to chose from. Here, some comparisons:
* These different functions lead to different visual designs, depending on the context, e.g. for interpolating between colors for an image or positions for an animation. From left to right, Nearest Neighbor, Bilinear, Lagrange Bicubic interpolation (only interpolates values, not slopes), Hermite Bicubic interpolation


---
.header[Transitions]

## Interpolation Functions

.center[<img src="../02_scripts/img/04/transition_05.png" alt="transition_05" style="width:100%;">]  

Linear and bilinear interpolation is usually called `lerp()`, e.g. [`lerp` in p5](https://p5js.org/reference/#/p5.Vector/lerp) or [`lerp` in vex](http://www.sidefx.com/docs/houdini/vex/functions/lerp.html) or [`mix`](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mix.xhtml) in glsl.

---
.header[Transitions]

## Smoothstep

--

Smoothstep is one of the most commonly used interpolation and clamping function in graphics and is often given as a build-in function from a framework. 

--

![smoothstep_01](../02_scripts/img/04/smoothstep_01.png)

--

.center[<img src="../02_scripts/img/04/smoothstep_02.png" alt="smoothstep_02" style="width:100%;">]  

---
## Function Primitive Components

???
.task[COMMENT:]  

* So far, we can only transition from one value or function exemplar to another one. That is a bit boring. The following presents a list of the most commonly used function components for putting together an individual design goal.

A great tool to work with function components and test how to put them together is the [Graph Toy](https://graphtoy.com/).

---
.header[Function Primitive Components]

## Modulo

```js
y = x % 0.5;
```

.center[<img src="../02_scripts/img/04/modulo_01.png" alt="modulo_01" style="width:100%;">]  

--

With modulo you can easily iterate ranges and therefore loops, for example.

--

`fract()` is also often used in similar scenarios.

---
.header[Function Primitive Components]

## Floor

```js
y = floor(x);
```

.center[<img src="../02_scripts/img/04/floor_01.png" alt="floor_01" style="width:100%;">]  

--

Floor ignores fraction and creates with that a continuous step function.

---
.header[Function Primitive Components]

## Absolute

```js
y = abs(x);
```

.center[<img src="../02_scripts/img/04/absolute_01.png" alt="absolute_01" style="width:100%;">]  

The absolute keeps values always positive.


---
.header[Function Primitive Components]

## Min and Max

```js
y = min(x, 0.5);
```

.center[<img src="../02_scripts/img/04/minmax_01.png" alt="minmax_01" style="width:100%;">]  

Min and Max are used to define lower and upper borders.


---
## Periodicity

![wave_01](../02_scripts/img/04/wave_01.png)  
[[wiki]](https://en.wikipedia.org/wiki/Square_wave#/media/File:Waveforms.svg)


???
.task[COMMENT:]  

* Often times we want to repeat certain visual features, which can be done in its simplest form e.g. with a `sin` function. However, there are several other design options. The following functions are also often called *wave functions*.

---
.header[Periodicity]

## Wave Functions

Wave functions have two common properties

* frequency (“*how often*”), and
* amplitude (“*how much*”).

---
.header[Periodicity]

## Square

The square wave enables a sharp oscillation between two values.

```glsl
float wave_square(float t, float frequency, float amplitude)
{
  return floor(t* frequency) % 2 * amplitude;
}
```

.center[<img src="../02_scripts/img/04/wave_02.png" alt="wave_02" style="width:100%;">]  

---
.header[Periodicity]

## Sawtooth

The sawtooth wave enables a jagged oscillation — a value increases linearly and then resets.

```glsl
float waveSawTooth(float t, float frequency, float amplitude)
{
  return (t * frequency - floor(t* frequency)) * amplitude;
}
```

.center[<img src="../02_scripts/img/04/wave_03.png" alt="wave_03" style="width:100%;">]  

---
.header[Periodicity]

## Triangle

The triangle wave enables a linear oscillation between two values.

```glsl
float waveTriangle(float t, float frequency, float amplitude)
{
  return abs((t * frequency) % amplitude - (0.5 * amplitude));
}
```

.center[<img src="../02_scripts/img/04/wave_04.png" alt="wave_04" style="width:100%;">]  

---
## Function Design


.center[<img src="../02_scripts/img/04/bricks_01.png" alt="bricks_01" style="width:60%;">]  


???
.task[COMMENT:]  

* bricks.frag


---
template: inverse

### Chapter 08
# Tilings & The Universe

---

## Tilings


???
.task[COMMENT:]  

* What is a tiling?

--

A tiling is a flat surface with some pattern of geometric shapes (*tiles*), with no overlaps or gaps.  

---
## Tilings


![tilings_15](../02_scripts/img/05/tilings_15.png) [[pi.math.cornell]](http://pi.math.cornell.edu/~mec/2008-2009/KathrynLindsey/PROJECT/Page2.htm)

--

vs.

.center[<img src="../02_scripts/img/05/tilings_06.png" alt="tilings_06" style="width:50%;">]


---

## Tilings

.center[<img src="../02_scripts/img/05/pentagon_01.png" alt="pentagon_01" style="width:100%;">]

---

## Tilings

.center[<img src="../02_scripts/img/05/pentagon_02.png" alt="pentagon_02" style="width:100%;">]

---

## Tilings

Tillings can have various properties and and various mathematical questions can be derived from them.


???
.task[COMMENT:]  

* A tiling is said to be periodic if there exist, among the symmetries of the tiling, at least two translations in non-parallel directions.

--

.center[<img src="../02_scripts/img/05/tilings_18.png" alt="tilings_18" style="width:60%;">[[pi.math.cornell]](http://pi.math.cornell.edu/~mec/2008-2009/KathrynLindsey/PROJECT/Page2.htm)] 


???
.task[COMMENT:]  

* A non-periodic tiling can not simply be constructed based on two translations in non-parallel directions.
* Above, the central star occurs nowhere else in the tiling, and so no translations are possible.
  
* A much more complex question is to ask which shapes can tile a plane in a pattern that does not repeat?

---

## Tilings

.center[<img src="../02_scripts/img/05/tilings_30.png" alt="tilings_30" style="width:100%;">]
[[aperiodictiling]](https://www.aperiodictiling.org/wpaperiodictiling/) *Penrose rhomb tile*


???
.task[COMMENT:]  

* What kind of tiling is this?
* A non-repeating pattern, is call an *aperiodic* tiling. Hence, a set of polygons that tile the plane but never form a periodic tiling.
  
* This means the pattern is not constructable by simple translations of potentially arbitrarily large periodic patches. Shifting an aperiodic tiling cannot produce the same tiling. 
* It is not possible to create the tiling by taking some (potentially very large) section and repeating it over and over again. 
* Around 1973/74 Roger Penrose found a set of two tiles that only tile non periodically. 

---
template:inverse

# Islamic Patterns

---
## Islamic Patterns


.center[<img src="../02_scripts/img/05/islamic_slides_01.png" alt="islamic_slides_01" style="width:100%;">]


---
## Islamic Art

Covers a wide range of lands, periods, and genres.

--

Began in the 8th century

* Influences Roman and Persian cultures
* Islamic Golden age
    * 8th century to the 14th century
    * Fundamental advancements in science and mathematics
    * Resulting also in complex geometry in art

---
## Islamic Art

> Patterns are everywhere...

--

Some interpretations of Islam include a ban of depiction of animate beings

* Prohibition of idolatry
* Belief that creation of living forms is God's prerogative


???
.task[COMMENT:]  

* also known as aniconism

--

Characterized by three recurrent motifs


???
.task[COMMENT:]  

Based on this exclusion of depicting any figural form of living creatures, there are three distinct disciplines that constitute the core elements of Islamic art, namely

--
1. Calligraphy

--
2. Arabesques

--
3. Geometry

---
.header[Islamic Art]
## Calligraphy

Chapters and excerpts from the Qur'an are a common.

--

There are two major styles: Kufic and Naskh.



???
.task[COMMENT:]  

* Kufic is the oldest calligraphic form of the various Arabic scripts and consists of a modified form of the old Nabataean script. Kufic developed around the end of the 7th century in Kufa, Iraq, from which it takes its name, and other centres
* Naskh (Arabic: قلم النسخ, translit. qalam an-naskh, from نسخ, nasakha, "to copy") is a smaller, round script of Islamic calligraphy. Naskh is one of the first scripts of Islamic calligraphy to develop, commonly used in writing administrative documents and for transcribing books, including the Qur’an, because of its easy legibility. Naskh was standardized by Ibn Muqla as one of the six primary scripts of Islamic calligraphy in the 10th century CE.[1]

--

.center[<img src="../02_scripts/img/05/islamic_slides_02.png" alt="islamic_slides_02" style="width:100%;">]

---
.header[Islamic Art]
## Arabesque

"Surface decorations based on rhythmic linear patterns of scrolling and interlacing foliage, tendrils" or plain lines.

--

Used to symbolize the transcendent, indivisible and infinite nature of God.


.center[<img src="../02_scripts/img/05/islamic_slides_03.png" alt="islamic_slides_03" style="width:100%;">]

---
.header[Islamic Art]
## Geometry

Patterns and tile work that seem to repeat infinitely

--
* Kaleidoscopic effects

--
* Inspiring contemplation of eternal order


---

## Islamic Patterns


???
.task[COMMENT:]  

* What simple construction tools are the basis of Islamic pattern designs?

--

Traditional Islamic art is composed with only compasses and a ruler. Therefore, designs are based on circles and lines.

![composition_01](../02_scripts/img/05/composition_01.png)  
[[ricoflow]](https://www.youtube.com/watch?v=FqBWjJQKICk)

---

## Islamic Patterns

.center[<img src="../02_scripts/img/05/composition_02.png" alt="composition_02" style="width:60%;">] 

The circle as a symbol of unity and as ultimate source of all diversity in creation.

???
.task[COMMENT:]  

* Each design starts with a circle. 
* The division of the circle into regular divisions is a ritual starting point

---
.header[Islamic Patterns]

## Circle Division

.center[<img src="../02_scripts/img/05/islamic_slides_09.png" alt="islamic_slides_09" style="width:100%;">] 

Each division gives rise to a specific group of patterns.

---
.header[Islamic Patterns]

## Circle Division

.center[<img src="../02_scripts/img/05/islamic_slides_10.png" alt="islamic_slides_10" style="width:100%;">] 

These are called 4, 5 and 6-folds.

---
.header[Islamic Patterns]

## Circle Division

.center[<img src="../02_scripts/img/05/islamic_slides_11.png" alt="islamic_slides_11" style="width:100%;">] 

---
.header[Islamic Patterns]

## Circle Division

.center[<img src="../02_scripts/img/05/islamic_slides_12.png" alt="islamic_slides_12" style="width:100%;">] 


---

## Islamic Patterns

--

1. Cell design with construction lines
2. Tessellation

???
.task[COMMENT:]  

Construction lines
* Normally Invisible
* Determine the scale
* Maintain accuracy

--

Many different designs can be derived from the same construction lines by picking different segments.



---
.header[Islamic Patterns]

## Construction Example

--

> Trying to decipher the steps that led to finished patterns is like a mathematical puzzle. Constructing new pieces involves creativity mixed with an understanding of the various styles and embellishments the ancients used.

---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_01.jpeg" alt="construction_01" style="width:100%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_02.jpeg" alt="construction_02" style="width:100%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_03.jpeg" alt="construction_03" style="width:100%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_04.jpeg" alt="construction_04" style="width:100%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_05.jpeg" alt="construction_05" style="width:100%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_05.jpeg" alt="construction_05" style="width:100%;">] 


---
.header[Islamic Patterns]

## Construction Example

.center[<img src="../02_scripts/img/05/construction_06.jpeg" alt="construction_06" style="width:100%;">] 

---

## Islamic Patterns

Many different designs can be derived from the same construction lines by picking different segments.

--

.center[<img src="../02_scripts/img/05/islamic_slides_05.png" alt="islamic_slides_05" style="width:100%;">] 

---

## Islamic Patterns

.center[<img src="../02_scripts/img/05/islamic_slides_06.png" alt="islamic_slides_06" style="width:100%;">] 

---

## Islamic Patterns

.center[<img src="../02_scripts/img/05/islamic_slides_07.png" alt="islamic_slides_07" style="width:100%;">] 

---

## Islamic Patterns

.center[<img src="../02_scripts/img/05/islamic_slides_08.png" alt="islamic_slides_08" style="width:100%;">] 


---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_14.png" alt="islamic_slides_14" style="width:60%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_15.png" alt="islamic_slides_15" style="width:60%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_16.png" alt="islamic_slides_16" style="width:60%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_18.png" alt="islamic_slides_18" style="width:60%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_19.png" alt="islamic_slides_19" style="width:80%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_15.png" alt="islamic_slides_15" style="width:60%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_20.png" alt="islamic_slides_20" style="width:60%;">] 



---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_21.png" alt="islamic_slides_21" style="width:80%;">] 

---
.header[Islamic Patterns]

## Implementation

.center[<img src="../02_scripts/img/05/islamic_slides_15.png" alt="islamic_slides_15" style="width:60%;">] 



---

## Islamic Patterns

.center[<img src="../02_scripts/img/05/islamic_17.png" alt="islamic_17" style="width:85%;"> [[wiki]](https://en.wikipedia.org/wiki/File:Roof_hafez_tomb.jpg)]


???
.task[COMMENT:]  

* Complex girih patterns with 16-, 10- and 8-point stars at different scales in ceiling of the Tomb of Hafez in Shiraz, 1935.


???
.task[COMMENT:]  

* Through their intricate design, patterns and tile work often appear to repeat infinitely, with kaleidoscopic effects. This might be understood as invitation to contemplate eternal order.



---
template: inverse

### Chapter 06
# Noise

---
## Noise

.center[<img src="../02_scripts/img/06/noise_05.png" alt="noise_05" style="width:100%;">]

---
## Noise

.center[<img src="../02_scripts/img/06/noise_07.png" alt="noise_07" style="width:40%;">]

---
## Noise

.center[<img src="../02_scripts/img/06/noise_08.png" alt="noise_08" style="width:40%;">]

---
## Noise

.center[<img src="../02_scripts/img/06/noise_04.png" alt="noise_04" style="width:100%;">]

---
## Noise

.center[<img src="../02_scripts/img/06/noise_06.png" alt="noise_06" style="width:100%;">]


---
## Noise

.center[<img src="../02_scripts/img/06/noise_03.gif" alt="noise_03" style="width:60%;">]


---
## Noise

.center[<img src="../02_scripts/img/06/noise_10.png" alt="noise_10" style="width:100%;">]

---
## Noise

.center[<img src="../02_scripts/img/06/noise_11a.png" alt="noise_11a" style="width:100%;">]



---
## Applications for Noise

--

### Textures and Materials

For Textures and Materials, we map the output of a noise function to color, gradients and such.

.center[<img src="../02_scripts/img/06/noise_13.png" alt="noise_13" style="width:50%;">  
[[thebookofshaders]](https://thebookofshaders.com/11/)]



---
.header[Applications for Noise]

### Height Fields

--

With height fields, we use for example, a noise function value as a displacement along normals to make terrain.

![noise_15](../02_scripts/img/06/noise_15.png)  
![noise_17](../02_scripts/img/06/noise_17.png)

Houdini has also a special height field functionality, for which a volume on a 2D grid represents the distance of the terrain at each point on the map from the ground plane (the values can be negative).

![noise_18](../02_scripts/img/06/noise_18.png)  
[[planetside]](https://planetside.co.uk/forums/index.php/topic,22830.0.html)


---
.header[Applications for Noise]

### Faking Complex Systems

--

Noise adds variation for designed systems to look natural and for an aesthetic appeal.

![mush](../02_scripts/img/06/mush.gif)  
[[thisiscolossal]](https://www.thisiscolossal.com/wp-content/uploads/2016/11/mush-1.gif) 


???
.task[COMMENT:]  

* Almost all natural systems appear to combine structure with randomness even though they in fact follow complex creation rules on different scales. As proper simulations of the underlying rules are usually quite expensive to compute, a simple addition of noise is used fake natural systems.  
* The mushrooms appear to us to grow pretty random even though their growth is greatly controlled by factors such as light and foil properties.

---
template: inverse

## Procedural Noise

---

## Procedural Noise

Engineering of the appearance of randomness.

--

![noise_24](../02_scripts/img/06/noise_24.png) vs. ![noise_25](../02_scripts/img/06/noise_25.png)  
[[scratchapixel]](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds)

*What are the differences?*  

We want small variations locally and large variations globally.


---

## Procedural Noise

Engineering of the appearance of randomness.

.center[<img src="../02_scripts/img/06/noise_26.png" alt="noise_26" style="width:100%;">]

???
.task[COMMENT:]  

* [graphtoy](https://graphtoy.com/?f1(x,t)=fract(sin(floor(x))%20*%209999)&v1=false&f2(x,t)=smoothstep(0,%201,%20fract(x))&v2=false&f3(x,t)=f1(x)%20*%20f2(x)&v3=false&f4(x,t)=f1(x%20-1)%20*%20(f2(x-1)%20*%20-1%20+%201)%20&v4=false&f5(x,t)=f3(x)%20+%20f4(x)&v5=true&f6(x,t)=&v6=false&grid=1&coords=6.192408033759523,-4.246031813029018,68.71509170736068)


---
.header[Procedural Noise]

### Requirements For Procedural Noise

For good noise functions there are overall the following requirements.

* Spatial correlation

???
.task[COMMENT:]  

* Minimal location shifts should not result in huge value differences, creating a smooth behavior. This means that local value changes are gradual, while global changes can be large.

--
*  No Periodicity

???
.task[COMMENT:]  

* At least, we do not want to see it.

---
.header[Procedural Noise]

### Requirements For Procedural Noise

For good noise functions there are overall the following requirements.

* Spatial correlation
*  No Periodicity

![noise_27](../02_scripts/img/06/noise_27.png)  

---
.header[Procedural Noise]

### Requirements For Procedural Noise

For good noise functions there are overall the following requirements.

* Spatial correlation
* No Periodicity
* A Defined Distribution

???
.task[COMMENT:]  

* We want some control over the function, e.g. how smooth it is.

--
* Reproducibility

???
.task[COMMENT:]  

* The noise should look the same every time we compute is, e.g. in every frame we render unless we explicitly want a change e.g. for an animation.

---
template:inverse

## Noise Function Designs

---

## Noise Function Designs

![noise_29](../02_scripts/img/06/noise_29.png)  
[[scratchapixel]](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/procedural-patterns-noise-part-1/creating-simple-1D-noise)

    y = rng(x) 
vs. 

    y = noise(x)
???
.task[COMMENT:]  


---
.header[Noise Function Designs]

## (Lattice) Value Noise

--

* A fixed grid (the *lattice*)
    * Relates the noise to space
    * Defines the basic scale
* A random number for each grid point
* Interpolate in-between
    * Again, many interpolation algorithms available
    * Ensures spatial correlation

![noise_30](../02_scripts/img/06/noise_30.png)

---
.header[Noise Function Designs]

## (Lattice) Gradient Noise

![tron](../02_scripts/img/06/tron.png) [3]

Ken Perlin. 1985. An image synthesizer. In Proceedings of the 12th annual conference on Computer graphics and interactive techniques (SIGGRAPH ’85). Association for Computing Machinery, New York, NY, USA, 287–296. DOI:https://doi.org/10.1145/325334.325247


???
.task[COMMENT:]  

* Ken Perlin was commissioned to generate more realistic textures for the movie Tron in the early 1980s. He task was to break with the solid shaded look that have been used so far. The idea was to add to the solid colors a noise texture. For that he came up with an elegant noise algorithm, the *Perlin noise*. In 1997 he won the Academy Award for Technical Achievement from the Academy of Motion Picture Arts.

--
So what did Perlin invent? Instead of values, Perlin uses random normalized *gradients* on a grid for each sample point. 


---
.header[Noise Function Designs]

## (Lattice) Gradient Noise


To get uneven frequency changes under control, we can define random normalized gradients, meaning random vectors, on a grid for each sample point instead of simply using values. Then, we interpolate a smooth function between those vectors.

![perlin_03](../02_scripts/img/06/perlin_03.png)  
[[scratchapixel]](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/perlin-noise-part-2)

This causes the curve to go up on one side of the lattice point and down on the other side of that same point such as

---
.header[Noise Function Designs]

## (Lattice) Gradient Noise

The worst case in regard to a uneven frequency distribution happens when two successive lattice points have gradients that aim at opposite directions (one points up and the other points down). Then the noise function will have a "S" like shape between the two points.

.center[<img src="../02_scripts/img/06/perlin_06.png" alt="perlin_06" style="width:100%;">[[scratchapixel]](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/perlin-noise-part-2)]

Through the use of random vectors, the distribution of frequencies in the Perlin noise is more regular than the value noise's frequency spectrum.

---
.header[Noise Function Designs]

## (Lattice) Gradient Noise

![perlin_12](../02_scripts/img/06/perlin_12.png)  
[[iquilezles]](http://www.iquilezles.org/)


---
.header[Noise Function Designs]


## `noise()`

In almost all environments we are using you have pre-defined noise functions such as 

```glsl
// 1D
noise(x); 

//2D
noise(x, y);
```

For full control over your results, check which algorithm the `noise()` function is based and whether the noise creates the distribution you want. If not you can always go back to defining your own noise function. 

---
## Using Noise Functions

Noise functions are usually used as

```glsl
value = amplitude * noise(frequency * x + offset);
```

---
.header[Using Noise Functions]

### Amplitude

The amplitude controls the maximum absolute value that a specific noise function can output.  

For example, for a 1D `y = noise(x)` this would mean the range the noise can spread in `y`:

![amplitude](../02_scripts/img/06/amplitude.png)

---
.header[Using Noise Functions]

### Frequency

The frequency parameter can be understood as the density of the noise, or its *bumpiness*.

![frequency](../02_scripts/img/06/frequency.png)

<img src="../02_scripts/img/06/frequency_01.png" alt="frequency_01" style="width:60%;"><img src="../02_scripts/img/06/frequency_02.png" alt="frequency_02" style="width:40%;">

[[2]]()

---
.header[Using Noise Functions]

### Offset

The offset selects different locations of the noise function. Hence, the offset enables you to use the same noise function multiple times, each version looking differently.

![noise-curve-offset](../02_scripts/img/06/noise-curve-offset.gif)

---
## Component Frequencies

.center[<img src="../02_scripts/img/06/noise_14.png" alt="noise_14" style="width:100%;">[[thebookofshaders]](https://thebookofshaders.com/11/)]


???
.task[COMMENT:]  

* In the above example we can observe well that organic patterns have *multiple levels* of detail with self-similar structures.

---
## Component Frequencies

To represent this, we can sum up multiple noise functions (so-called *octaves*) at different frequencies and amplitudes.

![turbulence_03](../02_scripts/img/06/turbulence_03.png) [[2]]()

???
.task[COMMENT:]  

* The represent this, we remember the insights we gained from Fourier transformations and that any function, or signal, can be decomposed into simple component signals at different frequencies.

---
## Component Frequencies

.center[<img src="../02_scripts/img/06/turbulence_01.png" alt="turbulence_01" style="width:100%;">[[hugo.elias]](https://web.archive.org/web/20150316212611/http://freespace.virgin.net/hugo.elias/models/m_perlin.htm)]

There are several techniques for computing such multi-level noises and all follow the same principle of defining a relationship between frequency and amplitude and successive octaves.

Such noises are for example Turbulent noise, Fractal Brownian Motion (fBM), Fractal noise or Multi-Octave noise.


---
.header[Component Frequencies]

### Perlin’s Turbulence Noise

![turbulence_05](../02_scripts/img/06/turbulence_05.png)

Hence, the levels are

![turbulence_07](../02_scripts/img/06/turbulence_07.png)

![turbulence_06](../02_scripts/img/06/turbulence_06.png) [[2]]()


???
.task[COMMENT:]  

* *On a side note:* Turbulent noise is often considered as Perlin noise. This is not true. Perlin’s main contribution is the noise function itself. He used in his paper a specific turbulent noise setup as an example application for his noise function. But the internet doesn't understand this.
* This type of turbulence noise is also known as Fractal Brownian Motion (fBM) or Fractal Noise.

For example, Inigo Quiles applied fbm noise to wrap the space of a fbm noise again with the following results:

![fbm_fbm](../02_scripts/img/06/fbm_fbm.gif)  
[[Warping by Iq]](https://www.shadertoy.com/view/4s23zz)

If you want to understand this better, Inigo also wrote [an article](https://www.iquilezles.org/www/articles/warp/warp.htm) about it.

---
## Worley Noise

Steven Worley. 1996. A cellular texture basis function. In Proceedings of the 23rd annual conference on Computer graphics and interactive techniques (SIGGRAPH '96). ACM, New York, NY, USA, 291-294.

![cellular_01](../02_scripts/img/06/cellular_01.png)  
[[wiki]](https://en.wikipedia.org/wiki/Worley_noise)


???
.task[COMMENT:]  

* Worley noise is based on a distance field, for which you compute for each pixel the distance to a set of points. 
* This set of points are often randomly distributed feature points. Then, we take the closest distance to all points found and use that as color information, e.g. black and white.

---
## Worley Noise

![cellular_02](../02_scripts/img/06/cellular_02.png)  


???
.task[COMMENT:]  

* Worley noise is based on a distance field, for which you compute for each pixel the distance to a set of points. 
* This set of points are often randomly distributed feature points. Then, we take the closest distance to all points found and use that as color information, e.g. black and white.

--


![worley](../02_scripts/img/06/worley.gif) ![cellular_04](../02_scripts/img/06/cellular_04.png)  
[[thebookofshaders]](https://thebookofshaders.com/12/)


---
## Voronoi Algorithm

--

![voronoi_01](../02_scripts/img/06/voronoi_01.png) [[wiki]](https://en.wikipedia.org/wiki/Voronoi_diagram#/media/File:Euclidean_Voronoi_diagram.svg)


???
.task[COMMENT:]  

* A Voronoi diagram is a slight variation from the Worley noise in the sense that is doesn't save the closest distance for each pixel to a feature point, but it saves for each pixel the feature point itself, e.g. by assigning the color of the closest point, disregarding the actual distance. 

--

A Voronoi diagram has the following characteristics:

* Partitioning of a plane into *n* convex polygons (aka cells or regions).
* Each point in a region is guaranteed to be closer to the region’s generating point than any of the other *n* possible generating points.
* Line segments are equidistant to two points. Nodes (corners) are equidistant to three (or more) points.

---

## Distances

We are free to define any kind of distance. So far we have used the most common one, the *Euclidian distance*.


???
.task[COMMENT:]  

* Euclidean distance, Manhattan distance and Chebyshev distance are all distance metrics which compute a number based on two data points. All the three metrics are useful in various use cases and differ in some important aspects which we bring out in this article. 

--

Different distance might look as

.center[<img src="../02_scripts/img/06/voronoi_03.png" alt="voronoi_03" style="width:100%;">
[[wiki]](https://en.wikipedia.org/wiki/Taxicab_geometry)]

---

## Distances

![voronoi_06](../02_scripts/img/06/voronoi_06.png)  
[[iquilezles]](http://iquilezles.org/www/articles/cellularffx/cellularffx.htm)

---

## Noise in Houdini

There are several different generation approaches in Houdini.

.center[<img src="../02_scripts/img/06/houdini_01.png" alt="houdini_01" style="width:100%;">
[[sidefx]](https://vimeo.com/75313908)]


---
template:inverse

### Next

# Chapter 06 - Dynamics


???
.task[COMMENT:]  

*  

---
template:inverse

### The End

# 👋🏻
