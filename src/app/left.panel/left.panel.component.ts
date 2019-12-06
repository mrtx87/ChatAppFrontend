import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../Entities/user';
import { Constants } from '../constants';
import { ChatRoom } from '../Entities/chat.room';
import { DataStore } from '../data.store';
import { ValueResolver } from '../value.resolver';
import * as moment from 'moment';
import { ChatMessage } from '../Entities/chat.message';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left.panel.component.html',
  styleUrls: ['./left.panel.component.css']
})
export class LeftPanelComponent implements OnInit {


  searchChatInputText: string = "";
  uploadImage: string;

  displayUserMenu: boolean = false;
  displayProfile: boolean = false;
  displaySettingsMenu: boolean = false;

  isFocused: boolean = false;

  constructor(private chatService: ChatService, private values: ValueResolver, private constants: Constants, private store: DataStore) {
    chatService.registerLeftPanelComponent(this);

  }

  ngOnInit() {
  }

  get localUser(): User {
    return this.store.localUser;
  }
  set localUser(val: User) {
    this.store.localUser = val;
  }

  get currentDisplayedLeftPanel(): string {
    return this.chatService.currentDisplayedLeftPanel;
  }

  set currentDisplayedLeftPanel(value: string) {
    this.chatService.currentDisplayedLeftPanel = value;
  }

  get availableRooms(): ChatRoom[] {
    let rooms = this.store.availableRooms;
    let availableRooms = [];
    rooms.forEach(room => availableRooms.push(room));
    availableRooms.sort((a: ChatRoom, b: ChatRoom) => {
      if (a.unseenChatMessageIds && a.unseenChatMessageIds.length && (!b.unseenChatMessageIds || b.unseenChatMessageIds.length == 0)) {
        return -1;
      } else if (b.unseenChatMessageIds && b.unseenChatMessageIds.length && (!a.unseenChatMessageIds || a.unseenChatMessageIds.length == 0)) {
        return 1;
      } else {
        let dateA = new Date(this.values.resolveLatestChatMessageDate(a)).getTime();
        let dateB = new Date(this.values.resolveLatestChatMessageDate(b)).getTime();
        return dateB - dateA;
      }
    })
    return availableRooms.filter(room => this.values.resolveChatRoomName(room).toLowerCase().includes(this.searchChatInputText.toLowerCase()));
  }

  get displayedChatRoom(): ChatRoom {
    return this.chatService.displayedChatRoom;
  }
  set displayedChatRoom(val: ChatRoom) {
    this.chatService.displayedChatRoom = val;
  }

  /*
  encodeImageFileAsURL() {

    var reader = new FileReader();
    this.uploadImage
    let file : File = new File();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(this.uploadImage);
  }*/

  resetClient() {

  }

  toggleDisplayedRoom(chatRoom: ChatRoom) {
    this.displayedChatRoom = chatRoom;

    if (chatRoom.userIds.length > 2) {
      chatRoom.userIds.forEach(contactId => {
        if (!this.store.lookUpInDATA(contactId)) {
          this.chatService.sendResolveContactId(contactId);
        }
      });
    }

    if (chatRoom.unseenChatMessageIds && chatRoom.unseenChatMessageIds.length > 0) {
      this.chatService.sendUpdateUnseenMessages(chatRoom.unseenChatMessageIds);
      chatRoom.unseenChatMessageIds = null;
    }

    if (chatRoom.oldestUnseenMessage) {
      this.chatService.scrollIntoView(chatRoom.oldestUnseenMessage.id);
      chatRoom.oldestUnseenMessage = null;
    } else {
      let chatMessage: ChatMessage = this.store.getChatMessageByRoomIdAndIndex(chatRoom.id, -1);
      this.chatService.scrollIntoView(chatMessage.id);
    }
  }

  isClicked() {
    this.isFocused = true;
  }

  focusOut() {
    this.isFocused = false;
  }

  asyncInitProfile() {
    let that = this;
    let interval = setInterval(function () {
      if (that.chatService.profileComponent) {
        that.chatService.profileComponent.init(that.localUser.name, that.localUser.info, that.localUser.iconUrl);
        clearInterval(interval);
      }
    }, 5);
  }

  initDisplayProfile() {
    this.currentDisplayedLeftPanel = this.constants.USER_PROFILE;
    this.asyncInitProfile();
  }

  initDisplaySettings() {
    this.currentDisplayedLeftPanel = this.constants.USER_SETTINGS;
  }

  initDisplayNewGroup() {
    this.currentDisplayedLeftPanel = this.constants.ADD_GROUP_CHAT;
  }

  initDisplayContacts() {
    this.currentDisplayedLeftPanel = this.constants.CONTACTS_COMPONENT;
  }

  initDisplayAddContact() {
    this.currentDisplayedLeftPanel = this.constants.ADD_USER_PANEL;
  }

  initLogout() {
    this.chatService.sendDisconnectMessage(this.localUser);
    this.chatService.resetClient();
  }

}
