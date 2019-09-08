import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat.panel.component.html',
  styleUrls: ['./chat.panel.component.css']
})
export class ChatPanelComponent implements OnInit {

  get registerUsername() : string {
    return this.chatService.registerUsername;
  }
  set registerUsername(val : string){
    this.chatService.registerUsername = val;
  }
  

  get registerPassword() : string {
    return this.chatService.registerPassword;
  }
  set registerPassword(val : string){
    this.chatService.registerPassword = val;
  }


  constructor(private chatService : ChatService) { }

  ngOnInit() {
  }

  requestRegistration(){
    this.chatService.sendRequestRegistration();
  }

}
