import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { ValueResolver } from './value.resolver';

@Pipe({
  name: 'chatRoomName'
})
export class ChatRoomNamePipe implements PipeTransform {

  transform(chatRoom: ChatRoom): any {
    return this.values.resolveChatRoomName(chatRoom);
  }

  constructor(private values: ValueResolver){}
}
