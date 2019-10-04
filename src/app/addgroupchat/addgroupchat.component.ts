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

  constructor(private chatService: ChatService, private constants: Constants, private store: DataStore) { }

  ngOnInit() {
  }

  creatingRoomContacts: Contact[] = [];

  addToCreatingRoom(contact: Contact) {
    if(this.creatingRoomContacts) {
      this.creatingRoomContacts.push(contact);
    }
  }

  
  query: string = "";

  get contacts(): Contact[] {
    return this.chatService.contacts.filter(contact => contact.name.includes(this.query));
  }
  set contacts(val: Contact[]) {
    this.chatService.contacts = val;
  }

}
