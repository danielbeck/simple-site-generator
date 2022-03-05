const fs = require('fs')
const path = require('path');

const chokidar = require('chokidar');

const dir = "./data/";

/* -------------------------------------------------- */
const handleNewData = (file) => {
        let inputFile = path.parse(file);
        let myPath = inputFile.dir?.split('/')
        myPath.shift();

        // step through each element of myPath, add it to DATA.
        let pointer = DATA;
        for (p of myPath) {
                pointer[p] = pointer[p] ? pointer[p] : {};
                pointer = pointer[p]
        }

        // fill pointer with the content of the file
        fs.readFile(file, 'utf-8', (err,fileContents) => {
                if (err) {
                        console.error(err)
                        return
                }
                try {
                        let loadedData = JSON.parse(fileContents);

                        pointer[inputFile.name] = loadedData;
                        console.log(DATA);
                        /* Here should signal back to the caller
                           that we've got new data.
                         */


                } catch(e) {
                        console.error("BAD JSON in ", file)
                }
                        console.log('-----');
        });

}

/* -------------------------------------------------- */

const DATA = {};

const watcher = chokidar.watch(
    dir,
    {
            awaitWriteFinish: true,
            ignored: /^\./,
            persistent: true
    }
);
watcher.on('add',handleNewData)
watcher.on('change',handleNewData)

/*
watcher
    .on('add', function(path) {console.log('File', path, 'has been added');})
    .on('change', function(path) {console.log('File', path, 'has been changed');})
    .on('unlink', function(path) {console.log('File', path, 'has been removed');})
    .on('error', function(error) {console.error('Error happened', error);})
*/
