/**
 * Load dependencies.
 */
const { Dealer, Router, Subscriber } = require('zeromq');

/**
 * Debugger.
 */
const debug = require('debug')('basemq:message:decode');

/**
 * Decode sent data.
 * @param args
 */
module.exports = function moduleExports(args) {
  let routingId;

  // get routing identifier of connection
  if (this instanceof Router || this instanceof Subscriber) {
    routingId = args.shift().toString();
  }

  // async has delimiter frame
  if (this instanceof Dealer || this instanceof Router) {
    args.shift();
  }

  // decode arguments
  args.forEach((arg, idx) => {
    try {
      // eslint-disable-next-line no-param-reassign
      args[idx] = JSON.parse(arg);
    } catch (err) {
      debug('[%s] WARN', args[0], err);
      // eslint-disable-next-line no-param-reassign
      args[idx] = arg.toString();
    }
  });

  if (this instanceof Router) {
    this.constructor.ROUTES = this.constructor.ROUTES || {};
    this.constructor.ROUTES[args[0]] = routingId;
  } else if (this instanceof Subscriber) {
    args.unshift(routingId);
  }

  // resolve
  debug('[%s] DECODE', args[0], args);
  return [args[0], args];
};
