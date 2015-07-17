/**
 * Load dependencies.
 */
//    { Push, Pull } = require('basemq');
const { Push, Pull } = require('../../src/basemq');

/**
 * Initialize Pull socket.
 */
const socketPull = new Pull();
socketPull.bind('tcp://127.0.0.1:12345').then(() => {
  socketPull.recv(() => {
    socketPush.close();
    socketPull.close();
  });
});

/**
 * Initialize Push socket.
 */
const socketPush = new Push();
socketPush.connect('tcp://127.0.0.1:12345');

/**
 * Action
 */
setTimeout(() => {
  const value = Math.floor(Math.random() * 10) + 1;
  socketPush.send(value);
}, 1000);
