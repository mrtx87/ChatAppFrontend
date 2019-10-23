import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { ChatRoom } from './Entities/chat.room';
import { AppComponent } from './app.component';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';
import { TransferMessage } from './Entities/transfer.message';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChatMessage } from './Entities/chat.message';
import * as moment from 'moment';
import { DataStore } from './data.store';
import { ChatService } from './chat.service';




@Injectable({
  providedIn: 'root'
})
export class ValueResolver {



  get chatMessagesByRoom(): Map<string, ChatMessage[]> {
    return this.store.chatMessagesByRoom;
  }
  set chatMessagesByRoom(val: Map<string, ChatMessage[]>) {
    this.chatMessagesByRoom = val;
  }
  get contacts(): Contact[] {
    return this.store.contacts;
  }
  set contacts(val: Contact[]) {
    this.store.contacts = val;
  }

  get newContactsList(): Contact[] {
    return this.store.newContactsList;
  }
  set newContactsList(val: Contact[]) {
    this.store.newContactsList = val;
  }

  get searchNewContactInputText(): string {
    return this.store.searchNewContactInputText;
  }
  set searchNewContactInputText(val: string) {
    this.store.searchNewContactInputText = val;
  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  get loginUsername(): string {
    return this.store.loginUsername;
  }
  set loginUsername(val: string) {
    this.store.loginUsername = val;
  }

  get loginPassword(): string {
    return this.store.loginPassword;
  }
  set loginPassword(val: string) {
    this.store.loginPassword = val;
  }

  get isLoggedIn(): boolean {
    return this.store.isLoggedIn;
  }
  set isLoggedIn(val: boolean) {
    this.store.isLoggedIn = val;
  }

  get availableRooms(): Map<string, ChatRoom> {
    return this.store.availableRooms;
  }
  set availableRooms(val: Map<string, ChatRoom>) {
    this.store.availableRooms = val;
  }

  get registerUsername(): string {
    return this.store.registerUsername;
  }
  set registerUsername(val: string) {
    this.store.registerUsername = val;
  }

  get registerPassword(): string {
    return this.store.registerPassword;
  }
  set registerPassword(val: string) {
    this.store.registerPassword = val;
  }

  get registerPasswordRepeat(): string {
    return this.store.registerPasswordRepeat;
  }
  set registerPasswordRepeat(val: string) {
    this.store.registerPasswordRepeat = val;
  }

  resolveChatRoomName(chatRoom: ChatRoom): string {
    if (chatRoom) {
      if (chatRoom.userIds && chatRoom.userIds.length == 2) {
        //1on1 room
        let userId = this.getNotLocalUserId(chatRoom.userIds);
        let contact: Contact = this.resolveContactId(userId);
        return contact ? contact.name : 'unknown name';

      }
      return chatRoom.title;
    }
    return "";
  }

  resolveLatestChatMessageDate(chatRoom: ChatRoom): string {
    if (chatRoom) {
      let chatMessage: ChatMessage = this.resolveLatestChatMessage(chatRoom);
      return chatMessage ? chatMessage.createdAt : "";;    }

    return "";
  }


  private resolveLatestChatMessage(chatRoom: ChatRoom): ChatMessage {
    const chatMessages: ChatMessage[] = this.store.chatMessagesByRoom.get(chatRoom.id);
    if (chatMessages) {
      return chatMessages[chatMessages.length - 1];
    }
  }

  resolveLatestChatMessageBody(chatRoom: ChatRoom): string {
    if (chatRoom) {
      let chatMessage: ChatMessage = this.resolveLatestChatMessage(chatRoom);
      return chatMessage ? chatMessage.body : "";
    }
    return "";
  }

  resolveContactId(userId: string): Contact {
    let lookedUpcontact: Contact = this.store.lookUpInDATA(userId);
    if (lookedUpcontact) {
      return lookedUpcontact;
    }
    return null;
  }

  resolveDialogRoomByContact(contact: Contact) {
    this.availableRooms.forEach(room => {
      if (room.userIds.length == 2 && room.userIds.includes(contact.id) && room.userIds.includes(this.localUser.id)) {
        this.chatService.displayedChatRoom = room;
        this.chatService.appComponent.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
      }
    });
  }

  private getNotLocalUserId(userIds: string[]): string {
    if (this.isNotLocalUser(userIds[0])) {
      return userIds[0];
    }
    return userIds[1];
  }

  private isNotLocalUser(id: string): boolean {
    return this.localUser.id != id;
  }

  constructor(private constants: Constants, private store: DataStore, private chatService: ChatService) { }
}