import { Component, OnInit } from '@angular/core';
import { Contact } from '../Entities/contact';
import { ChatRoom } from '../Entities/chat.room';
import { ThrowStmt } from '@angular/compiler';
import { ChatService } from '../chat.service';
import { Constants } from '../constants';
import { DataStore } from '../data.store';
import { User } from '../Entities/user';

@Component({
  selector: 'app-addgroupchat',
  templateUrl: './addgroupchat.component.html',
  styleUrls: ['./addgroupchat.component.css']
})
export class AddgroupchatComponent implements OnInit {


  creatingRoomContacts: Map<string, Contact> = new Map<string, Contact>();
  query: string = "";

  get selectedContacts() : Contact[] {
    return [...this.creatingRoomContacts.values()];
  } 

  get contacts(): Contact[] {
    return this.chatService.contacts.filter(contact => contact.name.includes(this.query) && !this.creatingRoomContacts.has(contact.id));
  }
  set contacts(val: Contact[]) {
    this.chatService.contacts = val;
  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  constructor(private chatService: ChatService, private constants: Constants, private store: DataStore) {
    this.chatService.registerAddgroupchatComponent(this);
    this.chatService.currentComponent(constants.ADD_GROUP_CHAT);
  }

  ngOnInit() {
  }


  addToCreatingRoom(contact: Contact) {
    if (this.creatingRoomContacts) {
      if (!this.creatingRoomContacts.has(contact.id)) {
        this.creatingRoomContacts.set(contact.id, contact);
      }
    }
  }

  ToRoomProfileCreation() {
    let room: ChatRoom = new ChatRoom();
    room.userIds = [...this.creatingRoomContacts.values()].map(contact => contact.id);
    this.chatService.asyncInitRoomProfile(room, false);
    this.chatService.currentDisplayedLeftPanel = this.constants.GROUP_CHAT_PROFILE;
  }

  removeFromCreatingRoomContacts(contact: Contact) {
    this.creatingRoomContacts.delete(contact.id);
  }

  isValid(): boolean {
    return this.creatingRoomContacts && this.creatingRoomContacts.size > 0;
  }


  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.chatService.initSlideOut(this, 200);
  }


  isFocused: boolean = false;

  isClicked() {
    this.isFocused = true;
  }

  focusOut() {
    this.isFocused = false;
  }

}
