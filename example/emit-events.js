const util = require('util'),;
const EventEmitter = require('events');


function Module () {
    EventEmitter.call(this)
}
util.inherits(Module, EventEmitter);


Module.prototype.sendMessage = function (msg) {
    this.emit('message', {msg:msg});
};


module.exports = First;

/* In another module:

var MyModule = require('./this.file.js');
var myModule = new MyModule();

// listen for the 'message event from first.js'
myModule.on('message',function(data){
    console.log('recieved data',data);
});


// can trigger message emilts from outside
myModule.sendMessage('first message from first.js');


 */
