import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../Entities/chat.room';
import { User } from '../Entities/user';
import { Constants } from '../constants';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {


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

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  constructor(private chatService: ChatService, private constants: Constants) { }

  ngOnInit() {
  }

  toggleDisplayedRoom(chatRoom: ChatRoom) {
    this.displayedChatRoom = chatRoom;

    if (chatRoom.unseenChatMessageIds && chatRoom.unseenChatMessageIds.length > 0) {
      this.chatService.sendUpdateUnseenMessages(chatRoom.unseenChatMessageIds);
      chatRoom.unseenChatMessageIds = null;
    }
  }
}
