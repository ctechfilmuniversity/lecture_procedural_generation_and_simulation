**Procedural Generation and Simulation**

# Questions Session 01

## Questions 1 - Topics & Syllabus

* Which of the chapter topics given in the syllabus are of most interest to you? Why?
    > Since I have no experience with the topic procedural generation, all the topics sound interesting to me. But what I remember most is the topic "noise". It sounds like an really powerful tool to generate endless worlds, by "controlling the randomness". I think this topic stand out the most for me, because I always ask myself how game developers of huge games can create such worlds with all the details and variance in appearance.
    
* Are there any further topics in regard to procedural generation and simulation that would interest you?
    > Because I'm completely new to this topic, I have no subtopic in my mind that could be interesting,too.

* Which tool would you personally prefer to use for the practical tasks (e.g. Houdini, Unreal, Unity, Maya, Blender, JavaScript, p5, GLSL, ...)?
    > When I choose the tool with which I have the most experience then it would be JavaScript. But after the explanation in the lecture and the fact that I like to learn something new, Houdini sounds really interesting. I rarely tried out Unity, so that one would be good, too.

* How would you rate your level of experience with SideFX's Houdini?
    * [x] Completely new
    * [ ] I have only used it in TI
    * [ ] Novice
    * [ ] Intermediate
    * [ ] Advanced
    * [ ] God-like

## Questions 2 - Procedural Generation

Briefly in your own words: how would you explain your nanny what *procedural generation* means?

> Procedural generation means to create something mostly automatic only by specifying certain parameters/rules. For example, instead of building every single detail of a landscape, you just create some single segments of the landscape and with help of some tools it can create infinite landscapes out of the segments.

## Questions 3 - Patterns

### 3.1 Seeing Patterns

Take at least three pictures of natural patterns and at least three pictures of man-made ones (patterns can be two or three dimensional). Try to include at least one pattern with self-similarity. Taking the pictures with your smart phone is just fine. Link all images in this markdown file.

> Human pattern

<img src="img/human_pattern01.jpg" width="400" alt="Floor tiles" />
<img src="img/human_pattern02.jpg" width="400" alt="Blanket" />
<img src="img/human_pattern03.jpg" width="500" alt="shelf" />

> Nature pattern

<img src="img/nature_pattern01.jpg" width="400" alt="Branch" />
<img src="img/nature_pattern02.jpg" width="400" alt="Monstera leaf" />
<img src="img/nature_pattern03.jpg" width="400" alt="bark" />

### 3.2 Understanding and Implementing Patterns

Write for one of your pattern images a generating algorithm in pseudo-code or code. Submit the code below.

```
void ofApp::createTile(float base, float offsetX, float offsetY) {
    float hTopBaseTriangle = (sqrt(3)/2)*base;

    // Top Base Triangle
    ofSetColor(255);
    ofDrawTriangle(offsetX, offsetY, offsetX+base, offsetY, offsetX+(base/2), offsetY+hTopBaseTriangle);
    
    // Bottom Base Triangle
    ofSetColor(77);
    float hBottomBaseTriangle = (sqrt(3)/2)*(base/2);
    float translateBBT = offsetX+base/2;

    ofDrawTriangle(offsetX, offsetY+hTopBaseTriangle, offsetX+(base/2), offsetY+hTopBaseTriangle, offsetX+(base/4), offsetY+hBottomBaseTriangle);

    ofDrawTriangle(translateBBT, offsetY+hTopBaseTriangle, translateBBT+(base/2), offsetY+hTopBaseTriangle, translateBBT+(base/4), offsetY+hBottomBaseTriangle);

    // Side Top and Bottom Triangle
    ofDrawTriangle(offsetX, offsetY, offsetX+(base/4), offsetY+hBottomBaseTriangle, offsetX, offsetY+base/3);

    ofDrawTriangle(offsetX+base, offsetY, translateBBT+(base/4), offsetY+hBottomBaseTriangle, offsetX+base, offsetY+base/3);
    ofSetColor(255);

    ofDrawTriangle(offsetX, offsetY+base/3, offsetX, offsetY+hTopBaseTriangle, offsetX+(base/4), offsetY+hBottomBaseTriangle);

    ofDrawTriangle(offsetX+base, offsetY+base/3, translateBBT+(base/4), offsetY+hBottomBaseTriangle, offsetX+100, offsetY+hTopBaseTriangle);
}

//--------------------------------------------------------------
void ofApp::draw(){
    float base = 100;
    float offsetX = 0;
    float offsetY = 0;
    
    int width = 5;
    int height = 3;
    
    float heightY = (sqrt(3)/2)*base;
    
    for (int x = 0; x <= base*width; x+=base) {
        for (float y = 0; y <= heightY*height; y+=heightY){
            createTile(base, x, y);
        }
    }
}
```

<img src="img/tiles.png" />

### 3.3 Seeing Faces

As an exercise to see and understand the environment around you (and to have some fun 😊), try to find at least two faces. Link all images in this file.

<img src="img/Face01.jpg" width="400" alt="bark" />
<img src="img/Face02.jpg" width="500" alt="bark" />
<img src="img/Face03.jpg" width="500" alt="bark" />
<img src="img/Face04.jpg" width="400" alt="bark" />
<img src="img/Face05.jpg" width="500" alt="bark" />

## Questions 4 - Abstraction

### 4.1 Abstraction in Art

Chose one "traditional" painting, which is inspirational to you. The image can come from the script or you can refer to any artists or image you like.  

Explain briefly what you like about the painting and how it might inspire you for your own work.

<img src="img/Dancing.jpeg" width="600" alt="bark" />

>This street art is from SOBR a french artist. This piece is part of the project "It's time to dance". You can find parts of the art pieces in different big cities all over the world (e.g. Paris, London and Berlin). Especially in Berlin you can find a lot of these. The artist depicts people of the nightlife and surrounds them with glitter and confetti. I really like about this picture that it shows everyday people who just feeling the moment and forget their environment while dancing.

>It inspires me because the artist took situation out of the daily life and converts it into art. This reminds me to pay more attention to my environment in order to find some inspiration for my own work.

### 4.2 Abstracted Artistic Expression in CGI

Chose one CG image, which you like and of which you think that it has an artistic quality to it. The image doesn't need to be from the script, again you can chose any CGI image you like (it should use 3D graphics). You can find more examples in the [Summary of Artists](../../02_scripts/pgs_ss22_01_intro_script.md#summary-of-artists) section.  

Explain briefly what you like about the image and why you consider it to be somewhat a pice of art.

<img src="img/arashi_nectar_339.jpeg" />

> I really enjoy the animation of Alberto Moss, because it is kind of satisfying to watch. I like the texture, that he creates with the animation of the layers and the "candy-style" that he creates with the colors.


