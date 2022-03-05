const DataStore = require('./lib/data-store.js')
const dataStore = new DataStore();


dataStore.watch('./data');

dataStore.on('change', (dataPath,changedData) => {
    console.log("got new data:", dataPath,"\n",changedData);
    console.log("DATA:")
    console.log(dataStore.data);
    console.log("----------------")
})
