import { Component, OnInit } from '@angular/core';
import { Contact } from '../Entities/contact';
import { ChatRoom } from '../Entities/chat.room';
import { ThrowStmt } from '@angular/compiler';
import { ChatService } from '../chat.service';
import { Constants } from '../constants';
import { DataStore } from '../data.store';

@Component({
  selector: 'app-addgroupchat',
  templateUrl: './addgroupchat.component.html',
  styleUrls: ['./addgroupchat.component.css']
})
export class AddgroupchatComponent implements OnInit {

  creatingRoomContacts: Contact[] = [];
  query: string = "";

  get contacts(): Contact[] {
    return this.chatService.contacts.filter(contact => contact.name.includes(this.query));
  }
  set contacts(val: Contact[]) {
    this.chatService.contacts = val;
  }

  constructor(private chatService: ChatService, private constants: Constants, private store: DataStore) {

  }

  ngOnInit() {
  }


  addToCreatingRoom(contact: Contact) {
    if (this.creatingRoomContacts) {
      if (!this.creatingRoomContacts.includes(contact)) {
        this.creatingRoomContacts.push(contact);
      }
    }
  }
  ToRoomProfileCreation() {
    this.store.addEntryWithouthKeyToTEMPDATA(this.constants.CREATING_ROOM_CONTACTS_ID, this.creatingRoomContacts);
    this.chatService.initDisplayChatRoomProfileComponent();
    this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.GROUP_CHAT_PROFILE;
  }

  removeFromCreatingRoomContacts(contact: Contact) {
    this.creatingRoomContacts = this.creatingRoomContacts.filter(c => c.id !== contact.id);
  }

  isValid() : boolean{
    return this.creatingRoomContacts && this.creatingRoomContacts.length > 0;
  }

}
