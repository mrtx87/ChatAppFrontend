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

  name : string = "";
  info : string = "";

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  constructor(private chatService: ChatService, private store: DataStore,
              private constants: Constants, private values: ValueResolver,private imageService: ImageService) { }

  ngOnInit() {
    this.name = this.localUser.name;
    this.info = this.localUser.info;
  }

  valid() : boolean {
      if(this.name != this.localUser.name || this.info != this.localUser.info) {
        return true;
      }
  }

  onFileChanged(event) {
    this.imageService.onFileChanged(event, this.constants.NEW_LOCAL_USER_IMAGE);
    this.startImageListener();
  }

  imageListener: any;
  startImageListener() {
    let that = this;
    if(this.imageListener) {
      clearInterval(this.imageListener);
      this.imageListener = null;
    }
    that.imageListener = setInterval(function() {
      if(that.store.lookUpInTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE) && that.localUser) {
        that.localUser.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE);
        that.store.deleteFromTEMPDATA(that.constants.NEW_LOCAL_USER_IMAGE);
        //UPDATES IMAGE IN BACKEND
        that.chatService.sendUpdateUserProfile();
        clearInterval(that.imageListener)
        that.imageListener = null;
      }
    }, 200); 
  }

  updateUserProfile() {
    
    if(this.localUser.name != this.name || this.localUser.info != this.info) {
      this.localUser.name = this.name;
      this.localUser.info = this.info;
      this.chatService.sendUpdateUserProfile();
    }
  }

}
