import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../Entities/user';
import { Constants } from '../constants';
import { ChatRoom } from '../Entities/chat.room';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';
import * as moment from 'moment';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left.panel.component.html',
  styleUrls: ['./left.panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  uploadImage: string;

  displayUserMenu: boolean = false;
  displayProfile: boolean = false;

  constructor(private chatService: ChatService, private values: ValueResolver, private constants: Constants, private store: DataStore) { }

  ngOnInit() {

  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  get availableRooms(): ChatRoom[] {
    let rooms = this.store.availableRooms;
    let availableRooms = [];
    rooms.forEach(room => availableRooms.push(room));
    availableRooms.sort((a: ChatRoom, b: ChatRoom) => {
      if (a.unseenChatMessageIds && a.unseenChatMessageIds.length && (!b.unseenChatMessageIds || b.unseenChatMessageIds.length == 0)) {
        return -1;
      } else {
        let dateA = new Date(this.values.resolveLatestChatMessageDate(a)).getTime();
        let dateB = new Date(this.values.resolveLatestChatMessageDate(b)).getTime();
        return dateB - dateA;
      }
    })
    return availableRooms;
  }

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  /*
  encodeImageFileAsURL() {
    
    var reader = new FileReader();
    this.uploadImage 
    let file : File = new File();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(this.uploadImage);
  }*/

  toggleDisplayedRoom(chatRoom: ChatRoom) {
    this.displayedChatRoom = chatRoom;

    if (chatRoom.userIds.length > 2) {
      chatRoom.userIds.forEach(contactId => {
        if (!this.store.lookUpInDATA(contactId)) {
          this.chatService.sendResolveContactId(contactId);
        }
      });
    }

    if (chatRoom.unseenChatMessageIds && chatRoom.unseenChatMessageIds.length > 0) {
      this.chatService.sendUpdateUnseenMessages(chatRoom.unseenChatMessageIds);
      chatRoom.unseenChatMessageIds = null;
    }
  }


}
