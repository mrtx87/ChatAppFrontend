import { Injectable } from '@angular/core';
import { ChatMessage } from './Entities/chat.message';
import { ChatService } from './chat.service';
import { ValueResolver } from './value.resolver';
import { Constants } from './constants';
import { DataStore } from './data.store';
import { ChatRoom } from './Entities/chat.room';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageSearchService {

  private markedMessageJumpIndex_;
  private markedMessages_: ChatMessage[] = [];

  get markedMessages() {
    return this.markedMessages_;
  }
  set markedMessages(val: ChatMessage[]) {
    this.markedMessages_ = val;
  }

  get markedMessageJumpIndex() {
    return this.markedMessageJumpIndex_;
  }
  set markedMessageJumpIndex(val: number) {
    this.markedMessageJumpIndex_ = val;
  }
  
  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  constructor(private chatService: ChatService, private values: ValueResolver, private constants: Constants, private store: DataStore) {
  }

  resetSearch() {
    this.markedMessages.forEach(message => message.searchBody = null);
    this.markedMessages = [];
    this.markedMessageJumpIndex = -1;
  }

  localSearch(searchTerm: string) {
    this.resetSearch();
    let messages: ChatMessage[] = this.store.getChatMessages(this.displayedChatRoom.id);
    for (let message of messages) {
      if (message.fromId !== this.constants.CHAT_MESSAGE_SYSTEM_TYPE && message.fromId !== this.constants.CHAT_MESSAGE_DATE_TYPE) {
        if (this.searchAndMarkMessage(message, searchTerm)) {
          this.markedMessages.push(message);
        }
      }
    }
  }

  getMarkedMessageByIndex(index: number): ChatMessage {
    if (index > -1 && index < this.markedMessages.length) {
      return this.markedMessages[index];
    }
    return null;
  }

  public searchAndMarkMessage(message: ChatMessage, searchTerm: string): boolean {
    let restOfBody: string = message.body;
    let searchBody: string = "";
    let occurenceCount = 0;
    while (restOfBody.length > 0) {
      let startIndex = restOfBody.indexOf(searchTerm);
      if (startIndex > -1) {
        let prefix = restOfBody.substring(0, startIndex);
        let foundText = restOfBody.substring(startIndex, startIndex + searchTerm.length);
        let markedPart = this.constants.MARK_OPEN + foundText + this.constants.MARK_CLOSE;
        restOfBody = restOfBody.substring(startIndex + searchTerm.length);
        searchBody += prefix + markedPart;
        occurenceCount++;
      } else {
        if (occurenceCount > 0) {
          searchBody += restOfBody;
          restOfBody = "";
        } else {
          searchBody = null;
          restOfBody = "";
        }
      }
    }
    message.searchBody = searchBody;
    return searchBody ? true : false;

  }
}
