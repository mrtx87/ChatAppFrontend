import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/user';
import { ChatService } from '../chat.service';
import { DataStore } from '../data.store';
import { Constants } from '../constants';
import { ValueResolver } from '../value.resolver';
import { ImageService } from '../image.service';

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

  constructor(private chatService: ChatService, private store: DataStore,
    private constants: Constants, private values: ValueResolver, private imageService: ImageService) {
    this.chatService.registerSettingsComponent(this);
  }
  ngOnInit() {
  }

  jumpBack() {
    this.currentDisplayedLeftPanel = this.constants.DEFAULT_PANEL;
  }


  slideOut: boolean = false;
  intervalTimer = 0;

  initSlideOut() {
    this.slideOut = true;
    let that = this;

    let interval = setInterval(function () {
      that.intervalTimer += 10;
      if (that.intervalTimer >= 300) {
        that.jumpBack();
        clearInterval(interval);
      }
    }, 10)
  }

}
