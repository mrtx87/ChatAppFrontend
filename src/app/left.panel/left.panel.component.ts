import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../Entities/user';
import { Constants } from '../constants';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left.panel.component.html',
  styleUrls: ['./left.panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  constructor(private chatService: ChatService, private constants : Constants) { }

  ngOnInit() {
  }

}
