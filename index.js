const dataStore = require('./lib/data-store.js')

dataStore.watch('./data');

console.log(dataStore.data)
