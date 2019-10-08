import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { DataStore } from './data.store';
import { ChatService } from './chat.service';
import { ValueResolver } from './value.resolver';

@Pipe({
  name: 'lastestChatMessageBody',
  pure: false
})
export class LastestChatMessageBodyPipe implements PipeTransform {

  transform(chatRoom: ChatRoom): string {
      return this.values.resolveLatestChatMessageBody(chatRoom);
  }

  constructor(private store: DataStore, private chatService: ChatService, private values: ValueResolver){}

}
