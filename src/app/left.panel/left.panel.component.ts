import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../Entities/user';
import { Constants } from '../constants';
import { ChatRoom } from '../Entities/chat.room';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left.panel.component.html',
  styleUrls: ['./left.panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  uploadImage: string;

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  constructor(private chatService: ChatService, private values: ValueResolver, private constants: Constants, private store: DataStore) { }

  ngOnInit() {

  }

  get availableRooms(): Map<string, ChatRoom> {
    return this.chatService.availableRooms;
  }
  set availableRooms(val: Map<string, ChatRoom>) {
    this.chatService.availableRooms = val;
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
        if(!this.store.lookUpInDATA(contactId)){
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
