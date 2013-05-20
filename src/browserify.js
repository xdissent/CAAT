var fs = require('fs'),
  vm = require('vm'),
  src = fs.readFileSync(__dirname + '/caat.js');

context = {}
vm.runInContext(src, context, 'caat.js');

module.exports = context.CAAT