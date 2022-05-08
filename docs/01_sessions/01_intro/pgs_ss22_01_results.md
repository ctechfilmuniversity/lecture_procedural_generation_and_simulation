**Procedural Generation and Simulation**

# Results Session 01


<!-- #### Andreea
#### Anna
#### Jannis
#### Jonathan
#### Katja
#### Marco B.
#### Marco W.
#### Marton
#### Tillman
#### Tim
#### Vivien

 -->







## Questions 2 - Procedural Generation

Briefly in your own words: how would you explain your nanny what *procedural generation* means? 


#### Andreea
#### Anna

#### Jannis

> Procedural generation is a way of creating things – say, a chair – based on simple rules. Instead of manually building a chair, which leaves you with a single chair, you develop a recipe that lets a machine create a chair without you having to do anything. So in the beginning, it might be a little harder to come up with that recipe, but then you are left with as much chairs as you can acquire resources for.

#### Jonathan
#### Marco B.

> Procedual generation decribes the process to create something graphical, by defining rules and algorithms that can be modified to modify the whole creation.

#### Marco W.

> Making seamless and endless patterns with computers.

#### Marton

> Generating procedurally is like explaining our paintbrush how to paint instead of painting ourselves.


#### Tillman

> Procedural Generation is where you create something by telling a machine to follow rules. But these rules interact with one another as well, meaning that each time you run the instructions again, you will end up with something that looks different than before. As to *how* different it will look, that is dependent on how much potential for variation you include in your rules. 

#### Tim


#### Vivien

> Procedural generation is ... trying to find a "recipe" for patterns (which can be two- or three-dimensional).  
Like knowing which particular stitch is used, repeated again and again, to make a garment like e.g. a scarf. These "stitches" or "recipes" for computer graphics are often mathematical formulas, which tell the computer where to place a color (pixel) on the screen, or even objects like cubes. And just like with only having to memorize a few stitches for knitting big pieces, using these digital recipes can save a lot of "thinking power" for a computer (even though computers can't relax while knitting my digital scarves).


## Questions 3 - Patterns

### 3.1 Seeing Patterns

Take at least three pictures of natural patterns and at least three pictures of man-made ones (patterns can be two or three dimensional). Try to include at least one pattern with self-similarity. Taking the pictures with your smart phone is just fine. Link all images in this markdown file.

### 3.2 Understanding and Implementing Patterns

Write for one of your pattern images a generating algorithm in pseudo-code or code. Submit the code below.

---

#### Andreea
#### Anna

Natural Patterns  
 <img src="https://user-images.githubusercontent.com/66121204/166156193-07106967-0606-43b6-9d28-ad39f4fdfae2.jpg" alt="" width="90%"/>

<img src="https://user-images.githubusercontent.com/66121204/166156199-dda6d1da-66c1-4039-87f8-faa0fb0f706e.jpg" alt="" width="90%"/>

<img src="https://user-images.githubusercontent.com/66121204/166156452-e7fc0aee-7172-4387-a8bf-a6bde93fa0eb.jpg" alt="" width="90%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156205-23d90f03-33d8-42aa-9638-53d6d2963810.jpg" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166163558-4a77289e-b644-4f24-955f-1b1a56dbb299.jpeg" alt="" width="45%"/>

Human-made Patterns  

<img src="https://user-images.githubusercontent.com/66121204/166156339-b3ed767d-526b-48b7-98b7-0a75c74f8af1.png" style="float: left;" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156374-15148983-97f0-4672-9e0f-65e413059764.png" style="float: right;" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156382-0d8a8233-45bb-4499-b4c3-ed01090f5dc6.jpg" style="float: left;" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156433-9d9fd7dc-c632-4e53-90a8-465bed66f966.jpg" style="float: right;" alt="" width="90%"/>
<img src="https://user-images.githubusercontent.com/66121204/166158211-9780d397-54bb-433a-9f17-7cbee1ef789b.jpg" style="float: right;" alt="" width="90%"/>


#### Jannis


Natural     
   

![](img/results/volz/blatt.jpg)
![](img/results/volz/kastanie.jpg)
![](img/results/volz/efeu.jpg)   
    


 Man-made   
Self-similar glass patterns with three layers: larger outlines of irregalur shapes can be noticed from a distance. These larger shapes consist of smaller irregular (but similar) shapes, which consist of even smaller irregular shapes
![](img/results/volz/window2.jpg)
![](img/results/volz/window3.jpg)  
  
    

![](img/results/volz/door1.jpg)
![](img/results/volz/door2.jpg)

![](img/results/volz/zaun.jpg)

---

```
draw:
    int x, z = 0
    while(endOfFrameNotReached)
        drawCylinder(diameter, height, rotation, x, z)
        x+= 30
    
    z += 10
    while(endOfFrameNotReached)
        drawCylinder(diameter, height, -rotation, x, z)
        x+= 30
```

#### Jonathan

#### Katja


> Human pattern

<img src="img/results/ka_schreiber/human_pattern01.jpg" width="400" alt="Floor tiles" />
<img src="img/results/ka_schreiber/human_pattern02.jpg" width="400" alt="Blanket" />
<img src="img/results/ka_schreiber/human_pattern03.jpg" width="500" alt="shelf" />

> Nature pattern

<img src="img/results/ka_schreiber/nature_pattern01.jpg" width="400" alt="Branch" />
<img src="img/results/ka_schreiber/nature_pattern02.jpg" width="400" alt="Monstera leaf" />
<img src="img/results/ka_schreiber/nature_pattern03.jpg" width="400" alt="bark" />


#### Marco B.


**Natural Patterns:**

*1: Leaf*

![](img/results/braune/Pattern4.jpeg)

*2: Branches with self-similarity:*

![](img/results/braune/Pattern5.jpeg)

*3: Tree bark*

![](img/results/braune/Pattern6.jpeg)


*4: Sand "hills"*

![](img/results/braune/Pattern7.jpeg)

**Man-made Patterns:**

*1: Speaker*

![](img/results/braune/Pattern1.jpeg)

*2: Tiles*
![](img/results/braune/Pattern2.jpeg)

*3: Grid*
![](img/results/braune/Pattern3.jpeg)


-----------------

> p5.js Code for man-made pattern 2 - *Tiles*:

````
let tileX = 50;
let tileY = 25;
let space = 2;

function setup() {
  createCanvas(200, 200);
  background(0);
  noStroke();
  fill(255);
}

function draw() {
  for (let y=0; y*(tileY+space)<height;y++){
    for(x=0; x<=width; x+=tileX+space){
      //add an offset every second row
      if(y%2!==0 && x==0){  
        x-=(tileX+space)/2;
      }
      //draw tile
      rect(x,y*(tileY+space),tileX,tileY);
    }
  }
}
````
![](img/results/braune/sketch.png)




#### Marco W.

From natural- to human-made patterns in ascending order. For some of them, I find it hard to say!

<img src="img/results/winter/01.jpg" width="250">
<img src="img/results/winter/02.jpg" width="250">
<img src="img/results/winter/03.jpg" width="250">
<p/p>
<img src="img/results/winter/04.jpg" width="760">
<img src="img/results/winter/05.jpg" width="240">
<img src="img/results/winter/06.jpg" width="760">
<img src="img/results/winter/07.jpg" width="240">

---


<img src="img/results/winter/08.png" width="1000">

````glsl
//Based on the bookofshaders.com and this tutorial by Inigo Quilez:
//https://iquilezles.org/articles/warp/
//It's the same code as for my tbag fluid shader, just with some minor changes.

precision highp float;

uniform vec2 u_resolution;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 7

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.6;
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st*=1.75;
        a *= 0.5;
    }
    return v;
}

float pattern( in vec2 st, out vec2 q, out vec2 w) {
    float a = 30.0;
    q = vec2( fbm( st + vec2(0.0,0.0) ),
                   fbm( st + vec2(5.2,1.3) ) );

    w = vec2( fbm( st + a*q + vec2(1.7,9.2) ),
                   fbm( st + a*q + vec2(8.3,2.8) ) );
                                   
    return fbm(st);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.2157, 0.0784, 0.0078);
    vec2 q = vec2(0.0);
    vec2 w = vec2(0.0);

    st.y*=0.22;
    st *= 2.0;
    st.x+=0.9;

    float f = pattern(st, q, w);

    color = mix (color, vec3(0.5529, 0.2588, 0.0745), dot(w.y, q.x));

    gl_FragColor = vec4(color,1.0);
}
````

#### Marton

Natural  

Strange pattern on my flatmate's plant  
<img src="img/results/gasparik/img_1.jpg" width="500" >

---

Wind + snow on a Romanian mountaintop  
<img src="img/results/gasparik/img_2.jpg" width="500">

---

Original photo of a Wellingtonea Gigantea's trunk   
<img src="img/results/gasparik/img_3.jpg" width="500">

---

Displacement noise in Tiergarten   
<img src="img/results/gasparik/img_4.jpg" width="760">

---

Human-made  
Wall on my balcony  
<img src="img/results/gasparik/img_5.jpg" width="760">

---

Kitchen's window  
<img src="img/results/gasparik/img_6.jpg" width="760">

---

Taking a picture with an iPhone while covering a camera, with maximum ISO  
<img src="img/results/gasparik/img_7.jpg" width="760">

---

Bonus: Nature taking back property from the humans  
<img src="img/results/gasparik/img_8.jpg" width="760">
<img src="img/results/gasparik/img_9.jpg" width="760">
<img src="img/results/gasparik/img_10.jpg" width="760">

<img src="img/results/gasparik/img_7.jpg" width="200">

```glsl
//Based on p5's 2D Noise example:
//https://p5js.org/examples/math-noise2d.html

let noiseVal;
let noiseScale = 0.1;

function setup() {
  createCanvas(200, 200);
        colorMode(HSB);
}

function draw() {
  background(0);


for (let y = 0; y < height ; y++) {
    for (let x = 0; x < width; x++) {
      // noiseDetail of the pixels octave count and falloff value
      noiseDetail(4, 0.9);
      noiseVal = noise((mouseX + x) * noiseScale, (mouseY + y) * noiseScale);
      stroke(noiseVal * 255,noiseVal * 255,noiseVal * 30 );
      point(x, y);
    }
  }
}
```

#### Tillman

![](img/results/schaeuble/img_0.png)   
![](img/results/schaeuble/img_1.png)   
![](img/results/schaeuble/img_2.png)   
![](img/results/schaeuble/img_3.png)   
![](img/results/schaeuble/img_5.png)   
![](img/results/schaeuble/img_6.png)
![](img/results/schaeuble/img_09.png)

---

![](img/results/schaeuble/img_6.png)

```js
var threadThickness = something; 

for (i = 0; i < height; i + threadThickness){

  - draw one ellipse at x = 0: 
  - ellipse height = threadThickness and x width = random width
  - random selection from colour pallette 
  - duplicate that ellipse along the x axis until x = width
}
}
```

#### Tim



#### Vivien


Human-made Patterns:

![tiling](img/results/schreiber/mensch_esthersfliese.png)  |  ![cloth](img/results/schreiber/mensch_stoff.jpeg)
:-------------------------:|:-------------------------:
Tiling and glass pattern in a bathroom  | Crocheted applique on a dress 

---

Natural Patterns:

![clouds](img/results/schreiber/natur_wolken.jpeg)  |  ![log](img/results/schreiber/natur_stamm.jpeg)
:-------------------------:|:-------------------------:
The edges of clouds are kind of self-similar (maybe?)  | Radially symmetric & repeating wood pattern

![anthill](img/results/schreiber/natur_ameisen.jpeg)  |  ![stone](img/results/schreiber/natur_stein.jpeg)
:-------------------------:|:-------------------------:
The plants and anthill could (almost) be seamless textures  | There is definitely a "recipe" to this stone as well

![self-similar tree](img/results/schreiber/natur_baum_selfsimilar.jpeg)


![Tiling photo with processing sketches](img/results/schreiber/processing_sketches.png)

I made the sketches in Processing 4.0b2

```java
// sketch_glass
int rectSize=10;
int space=4;

void setup() {
  size(300, 350);
  background(200,180,180);
  noLoop();
}

void draw(){
  
  stroke(255,255,255,90);
  fill(240, 210, 210, 50);
  strokeWeight(2);

  for (int x = -1; x < 29; x++) {
    for (int y = -1; y < 29; y++) {
      rect(space + x * (rectSize + space) + random(-3, 3), space + y *(rectSize + space) + random(-3, 3), rectSize + random(1, 20), rectSize + random(1, 20));
    }
  }  
}

// sketch_wall
int rectSize=20;
int space=4;

void setup() {
  size(700, 700);
  background(185);
  noLoop();
}

void draw(){
  
  stroke(150);
  fill(210,125,70);
  strokeWeight(2);

  for (int x = 0; x < 29; x++) {
    for (int y = 0; y < 29; y++) {
      rect(space + x * (rectSize + space), space + y *(rectSize + space), rectSize, rectSize);
    }
  }
}
```



### 3.3 Seeing Faces

As an exercise to see and understand the environment around you (and to have some fun 😊), try to find at least two faces. Link all images in this file.





#### Andreea
#### Anna

<img src="https://user-images.githubusercontent.com/66121204/166156410-e4644296-ee9f-4322-abde-8ffa4e579208.jpg" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156411-e9adb566-a19c-4c2c-814b-3a420f3b5fe5.jpg" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156415-b5457db3-c7bb-4654-9442-0b20da45ebdb.jpg" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156419-261a902c-f322-4582-a894-40c150c59a7d.jpg" alt="" width="45%"/>
<img src="https://user-images.githubusercontent.com/66121204/166156437-3f7c8f75-88aa-4bd1-8ab4-61d523eed659.png" alt="" width="45%"/>


#### Jannis

![](img/results/volz/face.jpg)

#### Jonathan

#### Katja

<img src="img/results/ka_schreiber/Face01.jpg" width="400" alt="bark" />
<img src="img/results/ka_schreiber/Face02.jpg" width="500" alt="bark" />
<img src="img/results/ka_schreiber/Face03.jpg" width="500" alt="bark" />
<img src="img/results/ka_schreiber/Face04.jpg" width="400" alt="bark" />
<img src="img/results/ka_schreiber/Face05.jpg" width="500" alt="bark" />

#### Marco B.

![](img/results/braune/Face1.jpeg)
![](img/results/braune/Face2.jpeg)


#### Marco W.

<img src="img/results/winter/11.jpg" width="500"> ![oh](https://media.tenor.com/images/73d2d8408cfeb40b31ea934ee4258707/tenor.png)

<img src="img/results/winter/12.jpg" width="500"> ![hm](https://i.imgur.com/bbSNgEP.jpeg)

<img src="img/results/winter/13.jpg" width="500"> ![dunno](https://i.pinimg.com/736x/a7/da/79/a7da79c61a581718c6716d106705126e.jpg) (I didn't find a good fit for this one...)

#### Marton

<img src="img/results/gasparik/img_11.jpg" width="500"> ![](https://static.wikia.nocookie.net/batman/images/7/7b/32322-scarecrow_400.jpg/revision/latest/top-crop/width/360/height/450?cb=20080329035709)


<img src="img/results/gasparik/img_12.jpg" width="500"> ![hm](https://worldbirds.com/wp-content/uploads/2020/05/swan-symbolism2.jpg)



#### Tillman

![](img/results/schaeuble/img_07.png)   
![](img/results/schaeuble/img_08.png)   
![](img/results/schaeuble/img_10.png)

#### Tim
#### Vivien

![gift card face](img/results/schreiber/gesicht_kassette.png)  |  ![face sketch](img/results/schreiber/gesicht_kassette_skizze.png)
:-------------------------:|:-------------------------:
  My photo | My sketch of the little face

![amongus](img/results/schreiber/gesicht_amogus.png)  |  ![amongus original](img/results/schreiber/gesicht_amogus_original.jpg)
:-------------------------:|:-------------------------:
  My (a bit older) photo | I know it's not quite a "face" but I took this picture because of a meme, which I felt like really fit the seeing "faces" assignment :D



## Questions 4 - Abstraction

### 4.1 Abstraction in Art

Chose one "traditional" painting, which is inspirational to you. The image can come from the script or you can refer to any artists or image you like.  

Explain briefly what you like about the painting and how it might inspire you for your own work.

#### Andreea
#### Anna

<img src="https://user-images.githubusercontent.com/66121204/166156529-0a59143b-485a-4327-915d-f40717e4f1fb.png" alt="" width="45%"/>


#### Jannis

![](img/results/volz/Arcimboldowater.jpg)

#### Jonathan

#### Katja

<img src="img/results/ka_schreiber/Dancing.jpeg" width="600" alt="bark" />

#### Marco B.

![Monet, Soleil Levant](img/results/braune/Monet_Painting.jpg)
[Monet, Soleil Levant](https://en.wikipedia.org/wiki/Impressionism#/media/File:Claude_Monet,_Impression,_soleil_levant.jpg)


#### Marco W.

![faces_around_us](img/results/winter/09.jpg)
*“Making Love to a Man Who isn’t All There” by Ann Leda Shapiro.*

#### Marton
<img src="img/results/gasparik/img_13.jpg" width="1000">


#### Tillman



![the endless enigma - Dali](https://storage.googleapis.com/hippostcard/p/6ff043d2dda1d05905a66c3ac9afbea7.jpg)


#### Tim
#### Vivien

![art](https://upload.wikimedia.org/wikipedia/commons/3/36/Kazimir_malevich%2C_quadrato_rosso_%28realismo_del_pittore_di_una_campagnola_in_due_dimensioni%29%2C_1915.JPG)
from: [Kazimir Malevich, "Quadrato rosso", 1915](https://eo.wikipedia.org/wiki/Dosiero:Kazimir_malevich,_quadrato_rosso_(realismo_del_pittore_di_una_campagnola_in_due_dimensioni),_1915.JPG)



### 4.2 Abstracted Artistic Expression in CGI

Chose one CG image, which you like and of which you think that it has an artistic quality to it. The image doesn't need to be from the script, again you can chose any CGI image you like (it should use 3D graphics). You can find more examples in the [Summary of Artists](../../02_scripts/pgs_ss22_01_intro_script.md#summary-of-artists) section.  

Explain briefly what you like about the image and why you consider it to be somewhat a pice of art. 

#### Andreea
#### Anna

![Iconographies_81__03](https://user-images.githubusercontent.com/66121204/166158450-982822d7-741b-4210-b093-b98c6146ddc5.jpg)
![Iconographies_81__Nome-02](https://user-images.githubusercontent.com/66121204/166158453-d599c085-07fb-4e85-88d8-1681aba01a0a.jpg)

Iconographies by Quayola. (https://quayola.com/work/series/iconographies-series.php)


#### Jannis

 by beeple_crap
![king](img/results/volz/king.png)


#### Jonathan
#### Marco B.

![](img/results/braune/cgi_11.jpg)

#### Marco W.

<img src="img/results/winter/10.jpg" width="1000">
<img src="https://i.imgur.com/5k02nee.gif" alt="gif">

#### Marton

Sage Jenson

[Link to the picture](https://cargocollective.com/sagejenson/tapestries)

#### Tillman

![lukas vojir](https://ctechfilmuniversity.github.io/lecture_procedural_generation_and_simulation/02_scripts/img/01/cgi_05c.jpg)

#### Tim
#### Vivien


![flower 2](https://www.stashmedia.tv/wp-content/uploads/Sirbu_Flower4.png)
![flower 1](https://www.stashmedia.tv/wp-content/uploads/Sirbu_Flower3.png)

found on: [StashMedia](https://www.stashmedia.tv/growing-flower-alexa-sirbu-lukas-vojir/) & [Vimeo](https://vimeo.com/232473927)  
made by: Alexa Sirbu, Lukas Vojir, with music Zelig Sound

