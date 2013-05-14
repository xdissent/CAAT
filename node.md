node-caat
=========

[![NPM version](https://badge.fury.io/js/caat.png)](http://badge.fury.io/js/caat)

CAAT for Node.js

**Note:** For information about the CAAT library itself, please see the [CAAT homepage](http://labs.hyperandroid.com/static/caat/).


About
-----

This package imports the CAAT library for use in Node.js. It uses the [jsdom](https://npmjs.org/package/jsdom) and [canvas](https://npmjs.org/package/canvas) packages to allow for offscreen rendering.


Requirements
------------

The canvas implementation requires [Cairo](http://cairographics.org). Please see the [canvas Wiki](https://github.com/LearnBoost/node-canvas/wiki) for installation details for various platforms.


Installation
------------

Install with npm:

```sh
$ npm install caat
```

or via git:

```sh
$ npm install git+https://github.com/xdissent/node-caat.git
```


Usage
-----

```coffeescript
fs = require 'fs'
CAAT = require 'caat'

# Create a director and register it
director = new CAAT.Foundation.Director().initialize 200, 200
CAAT.RegisterDirector director

# Create a scene
scene = director.createScene()

# Create an actor
circle = new CAAT.Foundation.UI.ShapeActor()
  .setLocation(20, 20)
  .setSize(60, 60)
  .setFillStyle('#ff0000')
  .setStrokeStyle('#000000')

# Add the actor to the scene
scene.addChild circle

# Write rendered scene to a PNG file
out = fs.createWriteStream "#{__dirname}/canvas.png"
png = director.canvas.createPNGStream()
png.on 'data', (chunk) -> out.write chunk

# Render the frame at time 0
director.render(0)
```


Notes
-----

*  **Rendering** 

  The director normally renders via `#renderFrame()`, called by `CAAT.loop()`. However, the CAAT render loop is based on time elapsed between frame renders - which makes sense in a browser context. In node, you should call `#render()` directly, passing the global time in milliseconds to indicate which frame to render.

  The only downside to this approach is that you lose render event notifications (since HTML events aren't supported by canvas). That's likely not a problem since you'll be manually rendering anyway.

* **Touch/Mouse Events**

  All user-interaction events are disabled for obvious reasons. They could theoretically be enabled by altering `CAAT.TOUCH_BEHAVIOR`, but canvas doesn't support the required event handlers currently.

* **`currentDirector`**

  CAAT uses the `currentDirector` property during the render loop to keep track of which director is rendering at the moment. It's also used for various things like image caching and actor positioning. Since the render loop is not used in node, you must manage `currentDirector` yourself. If you only have one director, calling `CAAT.RegisterDirector()` is sufficient. For multiple directors, you **MUST** set `CAAT.currentDirector` explicitly before calling `#render()` or manipulating actors within a scene (especially images).