import { Component, HostListener } from '@angular/core';
import { ChatService } from './chat.service';
import { Constants } from './constants';
import { User } from './Entities/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener("window:click", ["$event"])
  mouseEvent(event: MouseEvent) {
    //@TODO Menüs schließen bei klick
  }

  public currentDisplayedLeftPanel : string;

  get localUser(): User {
    return this.chatService.localUser;
  }
  set localUser(val: User) {
    this.chatService.localUser = val;
  }

  @HostListener("window:beforeunload", ["$event"])
  beforeunloadHandler($event: any) {
    this.chatService.sendDisconnectMessage(this.localUser);
    this.chatService.closeLocalWebsocketConnection();
  }
  
  constructor(private chatService : ChatService, private constants : Constants) {
    chatService.registerAppComponent(this);
    this.currentDisplayedLeftPanel = constants.DEFAULT_PANEL;
  }
}
