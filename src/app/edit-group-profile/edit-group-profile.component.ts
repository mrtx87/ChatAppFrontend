import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/user';
import { ChatRoom } from '../Entities/chat.room';
import { ChatService } from '../chat.service';
import { ValueResolver } from '../value.resolver';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-edit-group-profile',
  templateUrl: './edit-group-profile.component.html',
  styleUrls: ['./edit-group-profile.component.css']
})
export class EditGroupProfileComponent implements OnInit {

  readOnly: boolean = true;

  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  get currentDisplayedRightPanel(): string {
    return this.chatService.currentDisplayedRightPanel;
  }

  set currentDisplayedRightPanel(value: string) {
    this.chatService.currentDisplayedRightPanel = value;
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
        that.currentChatRoom.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE);
        that.store.deleteFromTEMPDATA(that.constants.NEW_GROUP_IMAGE);
        clearInterval(that.imageListener)
        that.imageListener = null;
      }
    }, 200);
  }


  currentChatRoom: ChatRoom;
  roomTitleText: string;
  info: string;
  iconUrl:string;
  validator: () => {

  }

  constructor(private chatService: ChatService, private values: ValueResolver, private store: DataStore, private constants: Constants, private imageService: ImageService) {
    chatService.registerEditGroupProfileComponent(this);
  }

  updateChatroomTitle() {
    if (this.currentChatRoom && !this.readOnly) {
      this.currentChatRoom.title = this.roomTitleText;
    }
  }

  init(chatRoom: ChatRoom, readOnly: boolean) {
    this.readOnly = readOnly;
    this.currentChatRoom = chatRoom;

    this.roomTitleText = chatRoom.title;
    this.info = "MOCK";
    this.iconUrl = chatRoom.iconUrl;
  }

  onFileChanged(event) {
    if (!this.readOnly) {
      this.imageService.onFileChanged(event, this.constants.NEW_GROUP_IMAGE);
      this.startImageListener();
    }
  }


  isValid() {
    return !this.readOnly && this.currentChatRoom && this.roomTitleText && this.currentChatRoom.userIds && this.roomTitleText.length >= 3;
  }

  jumpBack() {
    this.currentDisplayedRightPanel = null;
  }


  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.slideOut = true;
    let that = this;

    let interval = setInterval(function () {
      that.intervalTimer += 10;
      if (that.intervalTimer >= 300) {
        that.jumpBack();
        clearInterval(interval);
      }
    }, 10)
  }
}
