/**
 * Load dependencies.
 */
const {
  Dealer,
  Router,
  Request,
  Reply,
  Publisher,
} = require('zeromq');
const {
  v4,
} = require('uuid');

/**
 * Debugger.
 */
const debug = require('debug')('basemq:message:encode');

/**
 * Constants.
 */
const MESSAGE_IDENTIFIER_PATTERN = new RegExp('^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$');

/**
 * Encode send data.
 * @param args
 */
module.exports = function moduleExports(args = []) {
  let messageId;

  // generate message identifier for request <-> response
  if (this instanceof Request || this instanceof Reply
    || this instanceof Dealer || this instanceof Router) {
    // generate message uuid if not exists
    if (MESSAGE_IDENTIFIER_PATTERN.test(args[0])) {
      [messageId] = args;
    } else {
      args.unshift(messageId = v4());
    }
  } else if (this instanceof Publisher) {
    // publisher type has envelope as its first frame
    messageId = args.shift();
  }

  // encode message data
  args.forEach((arg, idx) => {
    // eslint-disable-next-line no-param-reassign
    args[idx] = JSON.stringify(arg);
  });

  // async has delimiter frame
  if (this instanceof Dealer || this instanceof Router) {
    args.unshift('');
  }

  // enter destination if exists
  if (this instanceof Router) {
    args.unshift(this.constructor.ROUTES[messageId]);
    delete this.constructor.ROUTES[messageId];
  } else if (this instanceof Publisher) {
    args.unshift(messageId);
  }

  debug('[%s] ENCODE', messageId, args);
  return [messageId, args];
};
module.exports.MESSAGE_IDENTIFIER_PATTERN = MESSAGE_IDENTIFIER_PATTERN;
