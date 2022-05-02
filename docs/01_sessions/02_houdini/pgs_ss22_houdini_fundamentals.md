---
layout: default
title: Session
nav_exclude: true
---

# Procedural Generation and Simulation

Prof. Dr. Lena Gieseke \| l.gieseke@filmuniversitaet.de \| Film University Babelsberg KONRAD WOLF

# Houdini Fundamentals

* [Procedural Generation and Simulation](#procedural-generation-and-simulation)
* [Houdini Fundamentals](#houdini-fundamentals)
    * [Interface](#interface)
        * [UI Setups](#ui-setups)
        * [General UI Components](#general-ui-components)
    * [Node Viewports](#node-viewports)
        * [Network View](#network-view)
        * [Parameter View](#parameter-view)
    * [Selection in the Viewport](#selection-in-the-viewport)
    * [Working with Nodes](#working-with-nodes)
        * [The Geometry Node](#the-geometry-node)
        * [Adding a Primitive Node](#adding-a-primitive-node)
        * [Creating a Network](#creating-a-network)
        * [Switching Nodes](#switching-nodes)
        * [Finalizing a Network](#finalizing-a-network)
    * [References](#references)


These steps are roughly based on [SideFX Houdini For Absolute Beginners](https://www.youtube.com/watch?v=pu_i6jeayLA&list=PLs2aOcA-EaLOhnwvuDaZEfA_m5yHmGvvh&index=2). You can also follow the video tutorial itself, if you want to.

In the text below, follow all links and read as much as needed from those pages (there are also usually videos to that specific aspect).

## Interface

Know the basic elements of the interface: [Houdini user interface](http://www.sidefx.com/docs/houdini/basics/ui.html)

### UI Setups

`Menu -> Desktop`

* Gives you different pre-defined UI setups, depending on what your task is
* I personally like my own desktop layouts
    * Save them
* If you screw up your view, you can reload any saved layout

### General UI Components

* Menubar 
* Shelf Tools
    * Provide presets to create and modify network elements
    * You can achieve the same results with creating nodes in the node editor
    * It is up to personal taste which way to work
    * Example
        * Create -> Box
        * Pyro FX -> Flames
        * Select the created box
        * Whooom
* Navigation in the viewport
    * [Viewing the scene](http://www.sidefx.com/docs/houdini/basics/view.html)
    * Hold down `space`, drag mouse
        * \+ Left mouse button: tumbeling
        * \+ Middle mouse button: panning
        * \+ Right mouse button: dollying
        * `space + h` centers the view to show all objects
        * `space + g` centers the view to show all *selected* objects
* [Tree View](https://www.sidefx.com/docs/houdini/ref/panes/treeview.html)
    * Usually left side of the window
    * Shows all elements you have in your scene
    * Organized by network types (also called *contexts*), e.g.
        * `ch` -> compositing
        * `img` -> images
        * `mat` -> materials
        * `obj` -> objects / scene view
        * `out` -> rendering
        * `shop` -> shader materials
        * `stage` -> ?
        * `tasks` -> processors, schedulers, partitioners, and mappers
* [Network View](https://www.sidefx.com/tutorials/network-view/)
    * Usually right side, top or bottom, depending on the layout
    * Probably the most important view - here you spend most of your time
    * In this view you create nodes, wire them and create a network, hence building your scene
    * You have access to all the different network types. For now, we stay in `obj` view, which works with geometry data
* [Parameters View](https://www.sidefx.com/docs/houdini/network/parms.html)
    * Usually right side, top or bottom, depending on the layout
    * Gives the attributes for a node
* [Playbar](https://www.sidefx.com/docs/houdini/anim/playbar.html)
    * At the bottom
    * Controls to play all sorts of animations and simulations

## Node Viewports

* Open a new scene
* Shelf Create -> Box, place it in the scene

### Network View  

* Now we have a new `Geometry` node, probably called `box_object1` in the network view
* In the network view you can navigate with the mouse buttons the same way as in the scene view
* Double-clicking on the name, let's you rename it (e.g. to first_box)
* As you hove over the node, a number of options appear
    * On the right the visibility
    * On the left 1. the "select-ability" of the object and 2. the option to open an info box

### Parameter View

* In the Parameter View you can see the box's parameter
* E.g. set the translation to `0,0,0`

## Selection in the Viewport

Documentation: [Using handles](http://www.sidefx.com/docs/houdini/basics/handles.html)

* You can directly work with the scene objects in the viewport
* In the simplest case, e.g. to translate (`t`), rotate (`r`) and scale (`e`)
* You find the selection and transform buttons in the [Toolbox](http://www.sidefx.com/docs/houdini/basics/ui.html#toolbox) on the left of the viewport
* There is the [`multimode` handle](http://www.sidefx.com/docs/houdini/basics/handles.html#combined) (`enter`), which gives you translate and rotate in one handle
* Press `y` in the view to cycle between available handles for a selected node
* Holding the middle mouse can in general adjust certain handle attributes
    * For transforms you can chose a certain step size with a [value ladder](http://www.sidefx.com/docs/houdini/basics/ladder.html)
    * Drag the mouse horizontally in the step size (in the menu) you want to use

## Working with Nodes

* Open a new scene or simply delete the box
* We want to re-create the box in a different way

### The Geometry Node  

* Right-click or `tab` in the network editor
    * This opens a menu which gives you everything you can do at this particular network level
    * I personally prefer this workflow over buttons
* Select `Geometry -> Geometry`
    * Alternatively just start to type `Geometry` and the menu will select the matching entry
* Place the node with `enter` or click in the network view
* We now create only a geometry node, no actual geometry

### Adding a Primitive Node

* To create the geometry itself, we need to go *into* the geometry node
    * Double-click on the node to get on the second-level network
    * Indicated in the header as breadcrumb path (as we know it from the explorer or finder)
    * `Right-click` or `tab`, `Primitive -> Box`, or simply type `Box`, place the node in the network view

### Creating a Network

* Let's create a second primitive box inside of the geometry node
* Change its size to `2, 2, 2` and move its center in `y`to `-1`
* The second box is only displayed as wireframe or not displayed at all, as Houdini is conflicted on what to show
    * Networks must have only *one* output, we are currently having two
    * If you want to see both primitives you have to merge them into a single node, e.g. with the [`merge`](https://www.sidefx.com/docs/houdini/nodes/sop/merge.html) node
    * We don't need to do that as of now, as we will continue with a boolean operation
* We want to combine both boxes with a boolean operation
    * *We want to use the small box to cut a hole into the bigger one*
    * Create a `boolean` node
    * The little pins are in- (at the top of the node) and outputs (at the bottom)
    * You can wire pins of different nodes together
        * Wire both boxes into the boolean node
        * Change the attributes of the `boolean` node to create the hole
            * Right now it is doing an `intersection,` meaning of `box1` only the area stays which intersects with `box2`
            * To use `box1` to cut a hole into box2 we need `Operation -> Subtract` and `B - A` (this depends also on how you wired in the boxes)
    * We successfully combined the two primitives into one node and are output only one node from the network

Here we can already see the advantage of the procedural nature and this **non-destructive workflow** of Houdini

* We can adjust the "input" nodes `box1` and `box2` anytime we want
    * E.g. change the scale of `box1`
* We can also easily switch out input nodes

### Switching Nodes

* Now we want to cut the hole with a sphere, using the existing network.
* Create a sphere and connect the sphere instead of `box1` to the boolean node
    * The sphere has as default of type `Primitive`
    * The boolean node requires a `Polygon Mesh`
    * Change the `Primitive Type` of the sphere to `Polygon Mesh` and increase the number of `Rows` and `Columns` to give it a higher resolution
* Let's distort the sphere a bit
    * To insert a node between a connection, select the wire and then press `tab`
    * Select the wire between sphere and boolean
    * Select the `Mountain` node (it will be directly connected into the network)

### Finalizing a Network

* It is considered good style to explicitly mark the output of a network
* For this we create a `Null` node, which is just a placeholder, and call it something reasonable, e.g. output_box_cut

*Hints:*

* Pressing `h` in the network view zooms to show all you nodes
* Pressing `l` lays out all nodes on a grid


## References

* [SideFX Houdini For Absolute Beginners](https://www.youtube.com/watch?v=pu_i6jeayLA&list=PLs2aOcA-EaLOhnwvuDaZEfA_m5yHmGvvh&index=2)  
* [Houdini Foundations Book](https://www.sidefx.com/tutorials/houdini-foundations-book/) 
* [Houdini Getting Started](http://www.tokeru.com/cgwiki/index.php?title=HoudiniGettingStarted) 
* [Introduction to Houdini](http://www.sidefx.com/docs/houdini/basics/intro.html) 