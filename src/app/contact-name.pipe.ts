import { Pipe, PipeTransform } from '@angular/core';
import { ValueResolver } from './value.resolver';
import { Contact } from './Entities/contact';
import { ChatService } from './chat.service';
import { DataStore } from './data.store';

@Pipe({
  name: 'contactName',
  pure: false

})
export class ContactNamePipe implements PipeTransform {

  transform(contactId: string): string {
    let contact: Contact;
    contact = this.values.resolveContactId(contactId);
    if(contact){
      return contact.name;
    }
    return contactId;
  }

  constructor(private store: DataStore, private chatService: ChatService, private values: ValueResolver){}
}
