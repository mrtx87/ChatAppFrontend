import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../Entities/chat.room';
import { ChatMessage } from '../Entities/chat.message';
import { User } from '../Entities/user';
import { TouchSequence } from 'selenium-webdriver';
import { Constants } from '../constants';
import { DataStore } from '../data.store';

@Component({
  selector: 'app-displaychat',
  templateUrl: './displaychat.component.html',
  styleUrls: ['./displaychat.component.css']
})
export class DisplaychatComponent implements OnInit {

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }


  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  get currentDisplayMessages(): ChatMessage[] {
    if (this.chatService.chatMessagesByRoom && this.displayedChatRoom) {
      let rawMessages : ChatMessage[] =  this.chatService.chatMessagesByRoom.get(this.displayedChatRoom.id);
      let withDateMessages = this.chatService.insertDateMessages(rawMessages);
      return withDateMessages;
    }
    return [];
  }

  constructor(private chatService: ChatService, private constants: Constants, private store: DataStore) { 
    this.chatService.registerDisplayChatComponent(this);
  }

  displayChatMessagesContainer: HTMLElement;
  public lastKnowScrollPosition = 0;

  ngOnInit() {
    let that = this;
    let interval = setInterval(function () {
      that.displayChatMessagesContainer = document.getElementById("app-displaychat");
      if (that.displayChatMessagesContainer) {
        that.displayChatMessagesContainer.addEventListener('scroll', function (e) {
          that.lastKnowScrollPosition = that.displayChatMessagesContainer.scrollTop;
          if(that.lastKnowScrollPosition == 0){
            console.log("SCROLL: " + that.lastKnowScrollPosition);
            // nachladen bitte
            that.chatService.sendRequestChatMessagesBatchForSingleRoom(that.displayedChatRoom);
          }
        });
        clearInterval(interval);
      }
    }, 10);
  }




}


