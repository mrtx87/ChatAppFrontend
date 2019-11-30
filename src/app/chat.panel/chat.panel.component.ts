import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../Entities/chat.message';
import { User } from '../Entities/user';
import { ChatRoom } from '../Entities/chat.room';
import { Constants } from '../constants';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';
import { Contact } from '../Entities/contact';
import { isBoolean } from 'util';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat.panel.component.html',
  styleUrls: ['./chat.panel.component.css']
})
export class ChatPanelComponent implements OnInit {


  displayRoomMenu: boolean = false;
  currentDisplayedRightPanel_: string = "null"

  get currentDisplayedRightPanel(): string {
    return this.currentDisplayedRightPanel_;
  }

  set currentDisplayedRightPanel(value: string) {
    this.currentDisplayedRightPanel_ = value;
  }

  get chatInputText(): string {
    return this.chatService.chatInputText;
  }
  set chatInputText(val: string) {
    this.chatService.chatInputText = val;
  }

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  constructor(private chatService: ChatService, private values: ValueResolver, private store: DataStore, private constants: Constants) {
    this.chatService.registerChatPanelComponent(this);
  }

  ngOnInit() {

  }
  toggleRoomMenuDisplay() {
    this.displayedChatRoom ? this.displayRoomMenu = !this.displayRoomMenu : this.displayRoomMenu = false;
  }

  triggerSendChatMessage() {
    if (this.chatInputText && this.chatInputText.length >= 1) {
      // console.log(this.displayedChatRoom);
      const chatMessage: ChatMessage = new ChatMessage();
      chatMessage.body = this.chatInputText;
      chatMessage.fromId = this.localUser.id;
      chatMessage.roomId = this.displayedChatRoom.id;
      this.chatService.sendOutgoingChatMessage(this.displayedChatRoom, chatMessage);
      this.chatInputText = "";
    }
  }

  asyncInitContactProfile(contact: Contact) {
    let that = this;
    let interval = setInterval(function () {
      if (that.chatService.contactProfileComponent) {
        that.chatService.contactProfileComponent.init(contact);
        clearInterval(interval);
      }
    }, 5);
  }

  asyncInitGroupProfile(chatRoom: ChatRoom, readOnly: boolean) {
    let that = this;
    let interval = setInterval(function () {
      if (that.chatService.editGroupProfileComponent) {
        that.chatService.editGroupProfileComponent.init(chatRoom, readOnly);
        clearInterval(interval);
      }
    }, 5);
  }

  icon: string = "&#128523;";

  initDisplayProfile() {
    if (this.displayedChatRoom.groupChat) {
      this.currentDisplayedRightPanel = this.constants.EDIT_GROUP_CHAT_PROFILE;
      this.asyncInitGroupProfile(this.displayedChatRoom, true);
      return;
    }

    this.currentDisplayedRightPanel = this.constants.CONTACT_PROFILE;
    let otherContactId: string = this.displayedChatRoom.userIds.filter(id => id != this.localUser.id)[0];
    let otherContact = this.chatService.getContactById(otherContactId);
    this.asyncInitContactProfile(otherContact);
  }

  menuSelect() {
    console.log(this)
    this.displayRoomMenu = !this.displayRoomMenu
  }


  LineBreakOne : boolean = false;
  LineBreakTwo : boolean = false;

  countChars(){
    let value = this.chatInputText.length;
    if (value <= 5) {
        this.LineBreakOne = false;
    }
    if (value >= 5 && value <=10) {
        this.LineBreakOne = true;
        this.LineBreakTwo = false;
    }
    if (value >= 10 && value <=15) {
      this.LineBreakOne = false;
      this.LineBreakTwo = true;
    }

  }

}
