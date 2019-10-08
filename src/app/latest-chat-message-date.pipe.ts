import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { DataStore } from './data.store';
import { ChatService } from './chat.service';
import { ValueResolver } from './value.resolver';

@Pipe({
  name: 'latestChatMessageDate'
})
export class LatestChatMessageDatePipe implements PipeTransform {

  transform(chatRoom: ChatRoom): string {
    return this.values.resolveLatestChatMessageDate(chatRoom);
    //TODO GORANS LOGIK FÜR DATUM IN HEUTE, GESTERN, MONTAG, DIENSTAG bis zum ender einer zurückliegenen woche
  }

  constructor(private store: DataStore, private chatService: ChatService, private values: ValueResolver) { }

}
