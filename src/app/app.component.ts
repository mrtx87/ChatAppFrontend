import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Constants } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentDisplayedLeftPanel : string;


  
  constructor(private chatService : ChatService, private constants : Constants) {
    chatService.registerAppComponent(this);
    this.currentDisplayedLeftPanel = constants.LEFT_PANEL;
  }
}
