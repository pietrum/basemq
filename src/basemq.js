/* eslint max-classes-per-file: ["error", 9] */
/**
 * Load dependencies.
 */
const {
  Request,
  Reply,
  Dealer,
  Router,
  Publisher,
  Subscriber,
  Push,
  Pull,
} = require('zeromq');
const {
  v4,
} = require('uuid');

/**
 * Debugger.
 */
const debug = require('debug')('basemq');

/**
 * Messages.
 */
const decode = require('./message/decode');
const encode = require('./message/encode');

/**
 * BaseMQ.
 *
 * @constructor
 */
const BaseMQ = (BMQ) => class extends BMQ {
  constructor(identifier = v4()) {
    super();

    if (this instanceof Request || this instanceof Reply
      || this instanceof Dealer || this instanceof Router) {
      this.routingId = identifier;
    }

    debug('[%s] initialize zmq.%s socket', this.routingId || this.constructor.name.substring(4), this.constructor.name.substring(4));
  }

  send(...args) {
    const [messageId, data] = encode.call(this, args);

    debug('[%s] SEND MESSAGE', this.routingId || this.constructor.name.substring(4), messageId);
    return super.send(data).then(() => (messageId));
  }

  async recv(callback = () => {}) {
    // eslint-disable-next-line no-restricted-syntax
    for await (const args of this) {
      const [messageId, data] = decode.call(this, args);

      debug('[%s] RECV MESSAGE', this.routingId || this.constructor.name.substring(4), messageId);

      callback(...data);
    }
  }
};

/**
 * Expose currently supported sockets.
 */
module.exports.Request = class BaseRequest extends BaseMQ(Request) {};
module.exports.Reply = class BaseReply extends BaseMQ(Reply) {};
module.exports.Dealer = class BaseDealer extends BaseMQ(Dealer) {};
module.exports.Router = class BaseRouter extends BaseMQ(Router) {};
module.exports.Publisher = class BasePublisher extends BaseMQ(Publisher) {};
module.exports.Subscriber = class BaseSubscriber extends BaseMQ(Subscriber) {};
module.exports.Push = class BasePush extends BaseMQ(Push) {};
module.exports.Pull = class BasePull extends BaseMQ(Pull) {};
