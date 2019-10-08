import { LatestChatMessageDatePipe } from './latest-chat-message-date.pipe';

describe('LatestChatMessageDatePipe', () => {
  it('create an instance', () => {
    const pipe = new LatestChatMessageDatePipe();
    expect(pipe).toBeTruthy();
  });
});
