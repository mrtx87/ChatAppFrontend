import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/user';
import { ChatService } from '../chat.service';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ValueResolver } from '../value.resolver';
import { ImageService } from '../image.service';
import { LanguageService } from '../language.service';
import { Language } from '../language';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  get languages(): Language[] {
    return this.langService.LANGUAGES;
  }


  constructor(private chatService: ChatService, private store: DataStore,
    private constants: Constants, private values: ValueResolver, private imageService: ImageService, private langService: LanguageService) {
    this.chatService.registerSettingsComponent(this);
    this.chatService.currentComponent(this.constants.USER_SETTINGS);
  }
  ngOnInit() {
  }

  switchSelectedLanguage(langKey: string) {
    this.langService.switchSelectedLanguage(langKey);
    console.log(langKey)
  }





  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.chatService.initSlideOut(this, 200);
  }

}
