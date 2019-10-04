import { ChatRoomNamePipe } from './chat-room-name.pipe';

describe('ChatRoomNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ChatRoomNamePipe();
    expect(pipe).toBeTruthy();
  });
});
