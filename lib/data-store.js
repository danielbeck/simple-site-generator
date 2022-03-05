const fs = require('fs')
const path = require('path');
const util = require('util');
const EventEmitter = require('events');
const chokidar = require('chokidar');

function DataStore () {
    EventEmitter.call(this);
}
util.inherits(DataStore, EventEmitter);


const DATA = {};
DataStore.prototype.data = DATA;

DataStore.prototype.watch = function(dir) {
    console.log("Watching", dir);
    const watcher = chokidar.watch(
        dir,
        {
            awaitWriteFinish: true,
            ignored: /^\./,
            persistent: true
        }
    );

    const handleNewData = file => {

        let inputFile = path.parse(file);

        // we only want json files:
        if (inputFile.ext !== '.json') {return}

        // make sure the file is readable before doing anything else
        fs.readFile(file, 'utf-8', (err, fileContents) => {
            if (err) {
                console.error(err)
                return
            }
            try {
                let loadedData = JSON.parse(fileContents);
                // File is readable, let's do our thing.

                // first we need to make sure the file's path exists on DATA:
                let pointer = DATA;
                let myPath = inputFile.dir?.split('/');
                myPath.shift(); // remove '/data' from the top of the path. This is a bit hacky, assumes the data directory will always be immediately below the main directory
                for (let p of myPath) {
                    pointer[p] = pointer[p] ? pointer[p] : {};
                    pointer = pointer[p]
                }

                // now we attach the loaded data from the file itself:
                pointer[inputFile.name] = loadedData;

                // signal to the caller that there's new data.
                // pass them the path to the data within DATA, and the pointer to it
                this.emit('change',[...myPath,inputFile.name], pointer[inputFile.name]);

            } catch(e) {
                console.error("Bad JSON in ", file);
            }
        });

    }

    watcher.on('add',handleNewData)
    watcher.on('change',handleNewData)

}
module.exports = DataStore;
