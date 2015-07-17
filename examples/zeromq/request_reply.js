/**
 * Load dependencies.
 */
//    { Request, Reply } = require('basemq');
const { Request, Reply } = require('../../src/basemq');

/**
 * Initialize Reply socket.
 */
const socketReply = new Reply();
socketReply.bind('tcp://127.0.0.1:12345').then(() => {
  socketReply.recv((messageId, ...args) => {
    setTimeout(() => {
      socketReply.send(messageId, args[0] + args[1]);
    }, 200);
  });
});

/**
 * Initialize Request socket.
 */
const socketRequest = new Request();
socketRequest.connect('tcp://127.0.0.1:12345');
socketRequest.recv(() => {
  socketReply.close();
  socketRequest.close();
});

/**
 * Action
 */
const randomValue = () => (Math.floor(Math.random() * 10) + 1);
setTimeout(() => {
  socketRequest.send(randomValue(), randomValue());
}, 1000);
