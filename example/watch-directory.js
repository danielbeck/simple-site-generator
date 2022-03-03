var chokidar = require('chokidar');

var dir = "./data/";

var watcher = chokidar.watch(dir, {ignored: /^\./, persistent: true});

watcher
    .on('add', function(path) {console.log('File', path, 'has been added');})
    .on('change', function(path) {console.log('File', path, 'has been changed');})
    .on('unlink', function(path) {console.log('File', path, 'has been removed');})
    .on('error', function(error) {console.error('Error happened', error);})
