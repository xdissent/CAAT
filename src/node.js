var fs = require('fs'),
  vm = require('vm'),
  path = require('path'),
  Canvas = require('canvas'),
  jsdom = require('jsdom');

var doc = jsdom.jsdom("<html><body></body></html>"),
  win = doc.createWindow();

var context = vm.createContext({
  Canvas: Canvas,
  HTMLCanvasElement: Canvas,
  HTMLDivElement: win.HTMLDivElement,
  Image: Canvas.Image,
  setTimeout: setTimeout,
  setInterval: setInterval,
  window: win,
  document: doc,
  navigator: win.navigator,
  console: console
});

var src = fs.readFileSync(path.resolve(__dirname, 'caat.js'), 'utf8');
vm.runInContext(src, context, 'caat.js');

// Disable touch/mouse events
context.CAAT.TOUCH_BEHAVIOR = 0;

// Add Image access
context.CAAT.Image = Canvas.Image;

// Add Canvas access
context.CAAT.Canvas = Canvas;

// Fix isArray
context.isArray = context.Array.isArray;

module.exports = context.CAAT;