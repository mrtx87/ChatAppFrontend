import { Component, HostListener, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Constants } from './constants';
import { User } from './Entities/user';
import { DataStore } from './data.store';
import { ValueResolver } from './value.resolver';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './language.service';
import { BaseComponent } from './base-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition('* => void', animate('300ms ease-out', style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    let USER_COOKIE = this.cookieService.get(this.constants.USER_COOKIE_KEY);
    if (USER_COOKIE) {
      this.chatService.sendRequestLoginByCookie(USER_COOKIE)
      this.chatService.loginRegisterComponent.isLoggingIn = true;
    }
  }

  @HostListener("window:click", ["$event"])
  mouseEvent(event: MouseEvent) {
    let e: any = event;
    if (e.srcElement.className != "menu-img") {
      this.chatService.chatPanelComponent.displayRoomMenu = false;
    }

    if (e.srcElement.className != "user-app-burger-img") {
      this.chatService.lefPanelComponent.displayUserMenu = false;
    }
  }

  private currentDisplayedLeftPanel_: string;

  set currentDisplayedLeftPanel(value: string) {
    this.currentDisplayedLeftPanel_ = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.currentDisplayedLeftPanel_;
  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  get languageKeys(): string[] {
    return this.langService.LANG_KEYS;
  }

  switchSelectedLanguage(langKey: string) {
    this.langService.switchSelectedLanguage(langKey);
    console.log(langKey)
  }

  @HostListener("window:beforeunload", ["$event"])
  beforeunloadHandler($event: any) {
    this.chatService.sendDisconnectMessage(this.localUser);
    this.chatService.closeLocalWebsocketConnection();
  }

  constructor(private chatService: ChatService, private store: DataStore,
    private constants: Constants, private values: ValueResolver, private cookieService: CookieService, private langService: LanguageService) {
    
    chatService.registerAppComponent(this);
    this.currentDisplayedLeftPanel_ = constants.DEFAULT_PANEL;
  }
}
