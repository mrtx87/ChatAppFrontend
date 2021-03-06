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

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  ngOnInit(): void {
    this.init();
    
  }

  imageListener: any;
  startImageListener() {
    let that = this;
    if(this.imageListener) {
      clearInterval(this.imageListener);
      this.imageListener = null;
    }
    that.imageListener = setInterval(function() {
      if(that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE) && that.currentChatRoom) {
        that.currentChatRoom.iconUrl = that.store.lookUpInTEMPDATA(that.constants.NEW_GROUP_IMAGE);
        that.store.deleteFromTEMPDATA(that.constants.NEW_GROUP_IMAGE);
        clearInterval(that.imageListener)
        that.imageListener = null;
      }
    }, 200); 
  }


  currentChatRoom: ChatRoom;
  roomTitleText: string;
  isInCreateMode: boolean;
  validator: () => {

  }

  constructor(private chatService: ChatService, private values: ValueResolver, private store: DataStore, private constants: Constants,private imageService: ImageService) {
    chatService.registerGroupProfileComponent(this);
  }

  

  resolveCreatingChatRoom(): ChatRoom {
    let creatingRoomContacts: Contact[] = this.store.lookUpInTEMPDATA(this.constants.CREATING_ROOM_CONTACTS_ID);
    if (creatingRoomContacts) {
      let chatRoom: ChatRoom = new ChatRoom();
      chatRoom.userIds = creatingRoomContacts.map(contact => contact.id);
      //TODO ADD ICON URL IF AVAILABLE
      return chatRoom;
    }
    return null;
  }

  updateChatroomTitle() {
    if (this.currentChatRoom) {
      this.currentChatRoom.title = this.roomTitleText;
    }
  }

  resolveDisplayedChatRoom(): ChatRoom {
    return this.store.lookUpInTEMPDATA(this.constants.DISPLAYED_ROOM_ID);
  }

  init() {
    let chatRoom: ChatRoom = this.resolveCreatingChatRoom();
    if (chatRoom) {
      this.isInCreateMode = true;
      this.currentChatRoom = chatRoom;
    } else {
      this.isInCreateMode = false;
      this.currentChatRoom = this.resolveDisplayedChatRoom();
    }
  }

  onFileChanged(event) {
    this.imageService.onFileChanged(event, this.constants.NEW_GROUP_IMAGE);
    this.startImageListener();
  }


  isValid() {
    return this.currentChatRoom && this.roomTitleText && this.currentChatRoom.userIds && this.roomTitleText.length >= 3;
  }

  sendCreateNewGroupRoom() {
    if (this.currentChatRoom) {
      this.currentChatRoom.title = this.roomTitleText;
      this.currentChatRoom.userIds.push(this.localUser.id);
      this.chatService.sendCreateGroupRoom(this.localUser, this.currentChatRoom);
    }
  }

}
