import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ValueResolver } from '../value.resolver';
import { User } from '../Entities/user';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {





  readOnly: boolean = true;

  name: string = "";
  info: string = "";
  iconUrl: string = "";

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

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

  constructor(private chatService: ChatService, private store: DataStore,
    private constants: Constants, private values: ValueResolver, private imageService: ImageService) {
      this.chatService.registerProfileComponent(this);
      this.chatService.currentComponent(this.constants.USER_PROFILE)
     }


    

  ngOnInit() {

  }

  init(name: string, info: string, iconUrl:string, readOnly: boolean) {
    this.readOnly = readOnly;
    this.name = name;
    this.info = info;
    this.iconUrl = iconUrl;
  }

  valid(): boolean {
    if (!this.readOnly && this.name != this.localUser.name || this.info != this.localUser.info) {
      return true;
    }
  }

  onFileChanged(event) {
    if (!this.readOnly) {
      this.imageService.onFileChanged(event, this.constants.NEW_LOCAL_USER_IMAGE);
      this.startImageListener();
    }
  }

  imageListener: any;
  startImageListener() {
    let that = this;
    if (this.imageListener) {
      clearInterval(this.imageListener);
      this.imageListener = null;
    }
    that.imageListener = setInterval(function () {
      if (that.store.lookUpInTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE) && that.localUser) {
        that.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE);
        that.store.deleteFromTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE);
        //UPDATES IMAGE IN BACKEND
        that.updateUserProfile();
        clearInterval(that.imageListener)
        that.imageListener = null;
      }
    }, 200);
  }

  updateUserProfile() {
    if (!this.readOnly && this.localUser.name != this.name || this.localUser.info != this.info || this.localUser.iconUrl != this.iconUrl) {
      this.localUser.name = this.name;
      this.localUser.info = this.info;
      this.localUser.iconUrl = this.iconUrl;
      this.chatService.sendUpdateUserProfile();
    }
  }

  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.chatService.initSlideOut(this, 200);
  }

}
