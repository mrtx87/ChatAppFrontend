import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoom } from './Entities/chat.room';
import { ValueResolver } from './value.resolver';
import { Contact } from './Entities/contact';

@Pipe({
  name: 'onlineStatus',
  pure: false
})
export class OnlineStatusPipe implements PipeTransform {

  transform(room: ChatRoom): any {
    let contact: Contact = this.values.resolveNotLocalUser(room.userIds);
    if (contact) {
      return this.values.resolveOnlineStatusOfUser(contact.id) ? 'online' : '';
    }
    return '';
  }

  constructor(private values: ValueResolver) { }


}
