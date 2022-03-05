var chokidar = require('chokidar');

/*
    EXPORTS:
        data is an object
        watch() fills and updates data given a directory of json files
 */

const DATA = {};
exports.data = DATA;


const handleNewData = path => {
    console.log("handleNewData", path)
}



exports.watch = (dir) => {
    console.log('watching',dir)
    var watcher = chokidar.watch(dir, {ignored: /^\./, persistent: true});

    watcher
        .on('add', handleNewData)
        .on('change', handleNewData)

    
}
