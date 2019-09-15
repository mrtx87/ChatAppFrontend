import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

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

  constructor(private chatService : ChatService) { }

  ngOnInit() {

  }

  triggerSendChatMessage() {
    this.chatService.sendChatMessage();
  }

}
