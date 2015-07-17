/**
 * Load dependencies.
 */
//    { Publisher, Subscriber } = require('basemq');
const { Publisher, Subscriber } = require('../../src/basemq');

/**
 * Initialize Subscriber socket.
 */
const socketSubscriber = new Subscriber();
socketSubscriber.bind('tcp://127.0.0.1:12345').then(() => {
  socketSubscriber.subscribe('test');
  socketSubscriber.recv(() => {
    socketPublisher.close();
    socketSubscriber.close();
  });
});

/**
 * Initialize Publisher socket.
 */
const socketPublisher = new Publisher();
socketPublisher.connect('tcp://127.0.0.1:12345');

/**
 * Action
 */
setTimeout(() => {
  const value = Math.floor(Math.random() * 10) + 1;
  socketPublisher.send('test:test', value);
}, 1000);
