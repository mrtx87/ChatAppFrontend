import { LastestChatMessageBodyPipe } from './lastest-chat-message-body.pipe';

describe('LastestChatMessageBodyPipe', () => {
  it('create an instance', () => {
    const pipe = new LastestChatMessageBodyPipe();
    expect(pipe).toBeTruthy();
  });
});
