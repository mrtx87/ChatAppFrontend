import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Contact } from '../Entities/contact';
import { Constants } from '../constants';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';
import { ChatRoom } from '../Entities/chat.room';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  query: string = "";

  get contacts(): Contact[] {
    return this.store.contacts.filter(contact => contact.name.toLowerCase().includes(this.query.toLowerCase()));
  }
  set contacts(val: Contact[]) {
    this.store.contacts = val;
  }

  removeContact(contact: Contact){
    if(contact){
      console.log("Ya rly want to remove "+ contact.name +", huh? Well, let's try it.");
      // this.chatService.sendRemoveContact(contact);
    }else{
      console.log("Don't remove anything as there was no other user. (Which is strange. You should investigate this.");
    }
  }

  /**
   * Uses sets displayed chat room (dialog) regarding local user and given contact.
   * @param contact 
   */
  setDisplayedChatRoomByContact(contact: Contact){
    console.log("testestestestestest")
    this.chatService.displayedChatRoom = this.values.resolveDialogRoomByContact(contact);
    this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
  }

  ngOnInit() {}

  constructor(private chatService: ChatService, private values: ValueResolver, private constants: Constants, private store: DataStore) {}
  

  myTestEvent():void {
    console.log("myTestEvent");
  }
}