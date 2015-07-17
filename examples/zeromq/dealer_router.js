/**
 * Load dependencies.
 */
//    { Dealer, Router } = require('basemq');
const { Dealer, Router } = require('../../src/basemq');

/**
 * Initialize Router socket.
 */
const socketRouter = new Router('router');
socketRouter.bind('tcp://127.0.0.1:12345').then(() => {
  socketRouter.recv((messageId, ...args) => {
    setTimeout(() => {
      socketRouter.send(messageId, args[0] + args[1]);
    }, 200);
  });
});

/**
 * Initialize Dealer socket.
 */
const socketDealer = new Dealer('dealer');
socketDealer.connect('tcp://127.0.0.1:12345');
socketDealer.recv(() => {
  socketRouter.close();
  socketDealer.close();
});

/**
 * Action
 */
const randomValue = () => (Math.floor(Math.random() * 10) + 1);
setTimeout(() => {
  socketDealer.send(randomValue(), randomValue());
}, 1000);
