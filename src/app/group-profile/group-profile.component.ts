import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ValueResolver } from '../value.resolver';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ChatRoom } from '../Entities/chat.room';
import { Contact } from '../Entities/contact';
import { User } from '../Entities/user';

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


  currentChatRoom: ChatRoom;
  roomTitleText: string;
  isInCreateMode: boolean;
  validator: () => {

  }

  constructor(private chatService: ChatService, private values: ValueResolver, private store: DataStore, private constants: Constants) {
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

  isValid() {
    return this.currentChatRoom && this.roomTitleText && this.currentChatRoom.userIds;
  }

  sendCreateNewGroupRoom() {
    if (this.currentChatRoom) {
      this.currentChatRoom.title = this.roomTitleText;
      this.currentChatRoom.userIds.push(this.localUser.id);
      this.chatService.sendCreateGroupRoom(this.localUser, this.currentChatRoom);
    }
  }

}
