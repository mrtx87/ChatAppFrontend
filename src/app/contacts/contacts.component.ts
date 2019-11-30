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

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  /**
   * Uses sets displayed chat room (dialog) regarding local user and given contact.
   * @param contact 
   */
  setDisplayedChatRoomByContact(contact: Contact) {
    this.chatService.displayedChatRoom = this.values.resolveDialogRoomByContact(contact);
    this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
  }

  ngOnInit() { }

  constructor(private chatService: ChatService, private values: ValueResolver, private constants: Constants, private store: DataStore) {
    this.chatService.registerContactsComponent(this);
    this.chatService.currentComponent(constants.CONTACTS_COMPONENT);

  }

  initDisplayAddGroupChat() {
    this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.ADD_GROUP_CHAT;
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