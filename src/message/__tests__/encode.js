/**
 * Load dependencies.
 */
const {
  Request,
  Reply,
  Dealer,
  Router,
  Publisher,
  // Subscriber,
  Push,
  // Pull,
} = require('zeromq');

/**
 * Test controller.
 */
const encode = require('../encode');

/**
 * Test cases.
 */
// --------------------------------------------------------------------------------------------- //
describe('Request', () => {
  const requestMessageId = '2ef1deea-76d8-4439-bb61-618b96218603';
  let self;

  beforeEach(() => {
    self = new Request();
  });

  it('should create message identifier if not exists', () => {
    // given
    const args = [];
    // when
    const [messageId, encoded] = encode.call(self, args);
    // then
    expect(messageId).toMatch(encode.MESSAGE_IDENTIFIER_PATTERN);
    expect(encoded[0]).toBe(JSON.stringify(messageId));
  });

  it('should use existing message identifier', () => {
    // given
    const args = [requestMessageId];
    // when
    const [messageId, encoded] = encode.call(self, args);
    // then
    expect(messageId).toMatch(encode.MESSAGE_IDENTIFIER_PATTERN);
    expect(encoded[0]).toBe(JSON.stringify(requestMessageId));
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Reply', () => {
  const replyMessageId = '661727e0-c36a-43ae-a1f2-5ea29f736528';
  let self;

  beforeEach(() => {
    self = new Reply();
  });

  it('should create message identifier if not exists', () => {
    // given
    const args = [];
    // when
    const [messageId, encoded] = encode.call(self, args);
    // then
    expect(messageId).toMatch(encode.MESSAGE_IDENTIFIER_PATTERN);
    expect(encoded[0]).toBe(JSON.stringify(messageId));
  });

  it('should use existing message identifier', () => {
    // given
    const args = [replyMessageId];
    // when
    const [messageId, encoded] = encode.call(self, args);
    // then
    expect(messageId).toMatch(encode.MESSAGE_IDENTIFIER_PATTERN);
    expect(encoded[0]).toBe(JSON.stringify(replyMessageId));
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Dealer', () => {
  const dealerMessageId = 'ee61dc3a-13b2-4a45-babd-09b2732fe93a';
  let self;

  beforeEach(() => {
    self = new Dealer();
  });

  it('should be prefixed with delimiter frame', () => {
    // given
    const args = [];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[0]).toBe('');
  });

  it('should create message identifier if not exists', () => {
    // given
    const args = [];
    // when
    const [messageId, encoded] = encode.call(self, args);
    // then
    expect(messageId).toMatch(encode.MESSAGE_IDENTIFIER_PATTERN);
    expect(encoded[1]).toBe(JSON.stringify(messageId));
  });

  it('should use existing message identifier', () => {
    // given
    const args = [dealerMessageId];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[1]).toBe(JSON.stringify(dealerMessageId));
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Router', () => {
  const routerDestination = 'b1927afc-0c86-40f8-aa4a-880401c7e083';
  const routerMessageId = '028aa592-c0f6-4222-b17f-8a733d74a928';
  let self;

  beforeEach(() => {
    self = new Router();
    self.constructor.ROUTES = {};
    self.constructor.ROUTES[routerMessageId] = routerDestination;
  });

  it('should be prefixed with destination', () => {
    // given
    const args = [routerMessageId];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[0]).toBe(routerDestination);
  });

  it('should be prefixed with delimiter frame', () => {
    // given
    const args = [routerMessageId];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[1]).toBe('');
  });

  it('should use existing message identifier', () => {
    // given
    const args = [routerMessageId];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[2]).toBe(JSON.stringify(routerMessageId));
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Publisher', () => {
  const publisherTopic = 'topic';
  const publisherData = 'data';
  let self;

  beforeEach(() => {
    self = new Publisher();
  });

  it('should not encode topic', () => {
    // given
    const args = [publisherTopic, publisherData];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[0]).toBe(publisherTopic);
    expect(encoded[1]).toBe(JSON.stringify(publisherData));
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Subscriber', () => {
  it.skip('should never send/encode any message', () => {});
});
// --------------------------------------------------------------------------------------------- //
describe('Push', () => {
  const pushData = 'data';
  let self;

  beforeEach(() => {
    self = new Push();
  });

  it('should encode first frame', () => {
    // given
    const args = [pushData];
    // when
    const [, encoded] = encode.call(self, args);
    // then
    expect(encoded[0]).toBe(JSON.stringify(pushData));
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Pull', () => {
  it.skip('should never send/encode any message', () => {});
});
// --------------------------------------------------------------------------------------------- //
