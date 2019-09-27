import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatRoom } from '../Entities/chat.room';
import { ChatMessage } from '../Entities/chat.message';

@Component({
  selector: 'app-displaychat',
  templateUrl: './displaychat.component.html',
  styleUrls: ['./displaychat.component.css']
})
export class DisplaychatComponent implements OnInit {

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  get currentDisplayMessages(): ChatMessage[] {
    if (this.chatService.chatMessagesByRoom && this.displayedChatRoom) {
      return this.chatService.chatMessagesByRoom.get(this.displayedChatRoom.id);
    }
    return [];
  }

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
