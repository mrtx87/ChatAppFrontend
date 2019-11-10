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
    chatService.registerGroupProfileComponent(this);
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

  sendCreateNewGroupRoom() {
    if (this.currentChatRoom && !this.readOnly) {
      this.currentChatRoom.title = this.roomTitleText;
      this.currentChatRoom.userIds.push(this.localUser.id);
      this.chatService.sendCreateGroupRoom(this.localUser, this.currentChatRoom);
    }
  }

  jumpBack() {
    if (this.readOnly) {
      this.currentDisplayedRightPanel = null;
    } else {
      this.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
    }
  }

}
