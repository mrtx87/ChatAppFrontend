import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../Entities/chat.message';
import { User } from '../Entities/user';
import { ChatRoom } from '../Entities/chat.room';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat.panel.component.html',
  styleUrls: ['./chat.panel.component.css']
})
export class ChatPanelComponent implements OnInit {

  get chatInputText(): string {
    return this.chatService.chatInputText;
  }
  set chatInputText(val: string) {
    this.chatService.chatInputText = val;
  }

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  constructor(private chatService : ChatService) { }

  ngOnInit() {

  }

  triggerSendChatMessage() {
    const chatMessage : ChatMessage = new ChatMessage();
    chatMessage.body = this.chatInputText;
    chatMessage.fromId = this.localUser.id;
    chatMessage.roomId = this.displayedChatRoom.id;
    this.chatService.sendOutgoingChatMessage(this.displayedChatRoom, chatMessage);
    this.chatInputText = "";
  }

}
