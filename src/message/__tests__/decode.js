/**
 * Load dependencies.
 */
const {
  Request,
  Reply,
  Dealer,
  Router,
  // Publisher,
  // Subscriber,
  // Push,
  // Pull,
} = require('zeromq');

/**
 * Test controller.
 */
const decode = require('../decode');

/**
 * Test cases.
 */
// --------------------------------------------------------------------------------------------- //
describe('Request', () => {
  const requestMessageId = '2ef1deea-76d8-4439-bb61-618b96218603';
  const requestData = 'b1927afc-0c86-40f8-aa4a-880401c7e083';
  let self;

  beforeEach(() => {
    self = new Request();
  });

  it('...', () => {
    // given
    const args = [
      JSON.stringify(requestMessageId),
      JSON.stringify(requestData),
    ];
    // when
    const [messageId, decoded] = decode.call(self, args);
    // then
    expect(messageId).toBe(requestMessageId);
    expect(decoded[0]).toBe(requestMessageId);
    expect(decoded[1]).toBe(requestData);
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Reply', () => {
  const replyMessageId = '2ef1deea-76d8-4439-bb61-618b96218603';
  const replyData = 'b1927afc-0c86-40f8-aa4a-880401c7e083';
  let self;

  beforeEach(() => {
    self = new Reply();
  });

  it('...', () => {
    // given
    const args = [
      JSON.stringify(replyMessageId),
      JSON.stringify(replyData),
    ];
    // when
    const [messageId, decoded] = decode.call(self, args);
    // then
    expect(messageId).toBe(replyMessageId);
    expect(decoded[0]).toBe(replyMessageId);
    expect(decoded[1]).toBe(replyData);
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Dealer', () => {
  const dealerMessageId = '2ef1deea-76d8-4439-bb61-618b96218603';
  const dealerData = 'b1927afc-0c86-40f8-aa4a-880401c7e083';
  let self;

  beforeEach(() => {
    self = new Dealer();
  });

  it('...', () => {
    // given
    const args = [
      '',
      JSON.stringify(dealerMessageId),
      JSON.stringify(dealerData),
    ];
    // when
    const [messageId, decoded] = decode.call(self, args);
    // then
    expect(messageId).toBe(dealerMessageId);
    expect(decoded[0]).toBe(dealerMessageId);
    expect(decoded[1]).toBe(dealerData);
  });
});
// --------------------------------------------------------------------------------------------- //
describe('Router', () => {
  const routerRoutingId = 'b1927afc-0c86-40f8-aa4a-880401c7e083';
  const routerMessageId = '2ef1deea-76d8-4439-bb61-618b96218603';
  const routerData = 'b1927afc-0c86-40f8-aa4a-880401c7e083';
  let self;

  beforeEach(() => {
    self = new Router();
  });

  it('...', () => {
    // given
    const args = [
      JSON.stringify(routerRoutingId),
      '',
      JSON.stringify(routerMessageId),
      JSON.stringify(routerData),
    ];
    // when
    const [messageId, decoded] = decode.call(self, args);
    // then
    expect(messageId).toBe(routerMessageId);
    expect(decoded[0]).toBe(routerMessageId);
    expect(decoded[1]).toBe(routerData);
  });
});
// --------------------------------------------------------------------------------------------- //
