import { Component, HostListener } from '@angular/core';
import { ChatService } from './chat.service';
import { Constants } from './constants';
import { User } from './Entities/user';
import { DataStore } from './data.store';
import { ValueResolver } from './value.resolver';

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

  public currentDisplayedLeftPanel: string;

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  @HostListener("window:beforeunload", ["$event"])
  beforeunloadHandler($event: any) {
    this.chatService.sendDisconnectMessage(this.localUser);
    this.chatService.closeLocalWebsocketConnection();
  }

  constructor(private chatService: ChatService, private store: DataStore,
    private constants: Constants, private values: ValueResolver) {

    chatService.registerAppComponent(this);
    this.currentDisplayedLeftPanel = constants.DEFAULT_PANEL;
  }
}
