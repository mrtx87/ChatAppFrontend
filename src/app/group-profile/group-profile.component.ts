import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ValueResolver } from '../value.resolver';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ChatRoom } from '../Entities/chat.room';
import { Contact } from '../Entities/contact';
import { User } from '../Entities/user';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit {



  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  ngOnInit(): void {
  }

  imageListener: any;
  startImageListener() {
    let that = this;
    if (this.imageListener) {
      clearInterval(this.imageListener);
      this.imageListener = null;
    }
    that.imageListener = setInterval(function () {
      if (that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE) && that.currentChatRoom) {
        that.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE);
        that.store.deleteFromTEMPDATA(that.constants.NEW_GROUP_IMAGE);
        clearInterval(that.imageListener)
        that.imageListener = null;
      }
    }, 200);
  }

  triggeredUpdate: boolean = false;

  currentChatRoom: ChatRoom;
  roomTitleText: string;
  info: string;
  iconUrl:string;
  description: string;

  constructor(private chatService: ChatService, private values: ValueResolver, private store: DataStore, private constants: Constants, private imageService: ImageService) {
    chatService.registerGroupProfileComponent(this);
    chatService.currentComponent(this.constants.GROUP_CHAT_PROFILE)
  }

  setChatroomTitle() {
      this.currentChatRoom.title = this.roomTitleText;
  }

  init(chatRoom: ChatRoom, readOnly: boolean) {
    this.triggeredUpdate = false;

    this.currentChatRoom = chatRoom;
    this.currentChatRoom.userIds.push(this.localUser.id);

    this.roomTitleText = chatRoom.title;
    this.description = chatRoom.description;
    this.iconUrl = chatRoom.iconUrl;
  }

  onFileChanged(event) {
      this.imageService.onFileChanged(event, this.constants.NEW_GROUP_IMAGE);
      this.startImageListener();
    
  }

  isValid() {
    return !this.triggeredUpdate && this.currentChatRoom && this.roomTitleText && this.currentChatRoom.userIds && this.roomTitleText.length >= 3;
  }

  sendCreateNewGroupRoom() {
    if (this.isValid() && !this.triggeredUpdate) {
      this.triggeredUpdate = true;

      this.currentChatRoom.title = this.roomTitleText;
      this.currentChatRoom.description = this.description;
      this.currentChatRoom.iconUrl = this.iconUrl;
      this.chatService.sendCreateGroupRoom(this.localUser, this.currentChatRoom);
      this.chatService.clearLeftPanelComponentStack();
      this.initSlideOut();
      
    }
  }

  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.chatService.initSlideOut(this, 200);
  }

}
