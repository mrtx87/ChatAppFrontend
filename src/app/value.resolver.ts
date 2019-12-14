import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { ChatRoom } from './Entities/chat.room';
import { AppComponent } from './app.component';
import { Contact } from './Entities/contact';
import { User } from './Entities/user';
import { DataTransferContainer } from './Entities/datatransfer.container';
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


// TODO refactor
  get allChatMessages(): Map<string, ChatMessage[]> {
    return this.store.allChatMessages;
  }
  set allChatMessages(val: Map<string, ChatMessage[]>) {
    this.allChatMessages = val;
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
      if (chatRoom && !chatRoom.groupChat) {
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
    const chatMessages: ChatMessage[] = this.store.allChatMessages.get(chatRoom.id);
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

  resolveOldestUnseenChatMessage(chatRoom: ChatRoom): ChatMessage {
    return chatRoom.oldestUnseenMessage;
  }

  resolveContactId(userId: string): Contact {
    if(this.localUser.id === userId) {
      return <Contact> this.localUser;
    }
    let lookedUpcontact: Contact = this.store.lookUpInDATA(userId);
    if (lookedUpcontact) {
      return lookedUpcontact;
    }
    this.chatService.sendResolveContactId(userId);
    return null;
  }

  /**
   * Determines dialog chat room by local user and given contact. Returns desired chat room
   * @param contact: Contact 
   * @returns chatRoom: ChatRoom
   */
  resolveDialogRoomByContact(contact: Contact): ChatRoom {
    let chatRoom: ChatRoom = null;
    this.availableRooms.forEach(room => {
      if (!room.groupChat && room.userIds.includes(contact.id) && room.userIds.includes(this.localUser.id)) {
        chatRoom = room;
      }
    });
    return chatRoom;
  }

  resolveNotLocalUserIconUrl(chatRoom: ChatRoom) {
    let userId = this.getNotLocalUserId(chatRoom.userIds);
    let icons = this.store.contacts.filter(c => userId === c.id);
    if(icons.length > 0) {
      return icons[0].iconUrl;
    }
    return null;
  }


   resolveNotLocalUser(userIds: string[]): Contact {
    let userId : string = this.getNotLocalUserId(userIds);
    let contact : Contact = this.resolveContactId(userId);
    return contact;
  }

  resolveOnlineStatusOfUser(userId: string) : boolean {
    let contact : Contact = this.resolveContactId(userId);
    return !!contact.online;
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