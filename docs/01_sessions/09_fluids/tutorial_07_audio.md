---
layout: default
title: Session
nav_exclude: true
---

# Procedural Generation and Simulation


# Audio Tutorial by Simon Stimberg

In this Tutorial we are looking at how to create a music visualization in Houdini by using audio data to deform a mesh.  
Using audio analysis data for visualizing music can sometimes be a bit tricky, since the visual representations of audio (like a waveform or a spectrogram) often not really correspond with the perceived musical components.   
So here I want to show you two ways how audio information can be used to animate an object corresponding to a music file. One will be by analysing its frequencies, the second one by detecting beats and employ them as trigger. We will then use the information to control a 3D noise that deforms our mesh.  
To work with sound in Houdini we will use the [CHOP network](https://www.sidefx.com/docs/houdini/nodes/chop/index.html), which is dedicated for manipulating time-based channel data such as audio.

* [Click here to see the final result!](https://owncloud.gwdg.de/index.php/s/ObgghnkawW2QXeU) (video file WITH SOUND!)

![ResultFinal_5sec](img/ResultFinal_5sec.gif)

---

## Audiofile

So first you will need some music of your choice. This can be anything, but as we are using beat detection in the second part of the tutorial, it will be much easier if you choose some beat driven music (like electronic music), or anything that has a well pronounced bass drum or pulse in it.  

To use the sound file in Houdini it has to be in the right format, in order to be played back and worked with fluently and without hassle. So you will want to use the following format:

uncompressed WAV / 44.1 kHz / 16 bit

In order to convert your file (e.g. mp3) you can simply use the Adobe Media Encoder or any other conversion tool like for example ffmpeg:

``
ffmpeg -i mySong.mp3 -acodec pcm_s16le -ar 44100 mySong.wav
``


## Tutorial-Videos

So here are the Tutorial Videos:
* [Part 1: Using Frequency Analysis](https://owncloud.gwdg.de/index.php/s/Q8CyMaJFWx4iwwf) (17:45 min)
* [Part 2: Using Beat Detection](https://owncloud.gwdg.de/index.php/s/ePiGhekG5sKcCgO) (21:09 min)

## References

* [The Sound Wave](https://vimeo.com/159852217) by Niels Prayer.
* [Sound Driven Deformations](https://vimeo.com/133310380) by Danil Krivoruchko.
* [Audio Driven Animation](https://www.youtube.com/watch?v=eu891VQy3WE) by Varomix Trix.
* [Spectrum Visualizer](https://www.youtube.com/watch?v=Iv_tlbzYgN4) by  Junichiro Horikawa.
  
---

Have fun!
