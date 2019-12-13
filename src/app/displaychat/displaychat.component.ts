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

  medianDateInView_: string;

  get medianDateInView(): string {
    return this.medianDateInView_
  }

  set medianDateInView(val: string) {
    this.medianDateInView_ = val;
  }

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

  get allChatMessageInRoom(): ChatMessage[] {
    return this.displayedChatRoom ? this.chatService.chatMessagesByRoom.get(this.displayedChatRoom.id) : [];
  }


  rawMessages__: ChatMessage[] = [];
  withDateMessage__: ChatMessage[] = [];
  get currentDisplayedMessages(): ChatMessage[] {
    return this.allChatMessageInRoom;
  }

  constructor(private chatService: ChatService, private constants: Constants, private store: DataStore) {
    this.chatService.registerDisplayChatComponent(this);
  }

  displayChatMessagesContainer: HTMLElement;
  public lastKnowScrollPosition = 0;
  public lastKnowScrollHeight = 0;

  listenForMedianDateInView: any;
  ngOnInit() {
    let that = this;
    let reloadChatMessagesOnScroll = setInterval(function () {
      that.displayChatMessagesContainer = document.getElementById("app-displaychat");
      if (that.displayChatMessagesContainer) {
        that.displayChatMessagesContainer.addEventListener('scroll', function (e) {
          that.lastKnowScrollPosition = that.displayChatMessagesContainer.scrollTop;
          that.lastKnowScrollHeight = that.displayChatMessagesContainer.scrollHeight;
          if (that.lastKnowScrollPosition == 0) {
            //console.log("SCROLL: " + that.lastKnowScrollPosition);
            // nachladen bitte
            that.chatService.sendRequestChatMessagesBatchForSingleRoom(that.displayedChatRoom);
          }
        });
        clearInterval(reloadChatMessagesOnScroll);
      }
    }, 10);


    this.listenForMedianDateInView = setInterval(function () {
      if (!that.displayedChatRoom) {
        //console.log("cleared")
        clearInterval(that.listenForMedianDateInView);
      }

      if (that.displayedChatRoom) {
        let nextMedianDateInView = that.chatService.getMedianDateInView();
        if (that.medianDateInView !== nextMedianDateInView) {
          that.medianDateInView = nextMedianDateInView;
        }
        //console.log(that.listenForMedianDateInView)
      }
    }, 100)


  }




}


